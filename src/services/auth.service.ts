import * as jwt from "jsonwebtoken";
import {
  AuthLoginDTO,
  AuthLogoutDTO,
  ForgotPasswordDTO,
  ChangePasswordDTO,
} from "../interfaces/auth.dto";
import { app_config } from "../config";
import {
  userRepository,
  userAuthsRepository,
  loginHashesRepository,
  userAuthRecoveryRepository,
} from "../models/repository";
import { encrypt, compare } from "../utils/hasher";
import { v4 as uuidv4 } from "uuid";
import * as Joi from "joi";

export class AuthService {
  constructor() {}

  // Login auth service function
  async login(data: AuthLoginDTO): Promise<any> {

    const schema = Joi.object({
      email: Joi.string().required().email({ minDomainSegments: 2 }).trim(),
      req_ip: Joi.string().trim().ip(),
      password: Joi.string().required().trim()
    });

    const validated_value = await schema.validateAsync(data);

    const user = await this.get_user(validated_value.email, validated_value.password);
    const login_hash = await loginHashesRepository.findOne({
      where: {
        user_id: user.id,
      },
      attributes: ["id", "ip", "hash"],
    });

    if (!login_hash) throw new Error("login hash was not found.");

    login_hash.ip = validated_value.req_ip;
    login_hash.hash = `vh_${user.id}_${Date.now()}`;

    await login_hash.save();

    const payload = { email: user.email, id: user.id, vh: login_hash.hash };
    return {
      id: user.id,
      access_token: jwt.sign(payload, app_config.jwt_secret_key, {
        expiresIn: app_config.jwt_expiry_time * 1,
      }),
    };
  }

  // get_user auth service function
  async get_user(email: string, password: string): Promise<any> {
    // find record with user email.
    const user = await userRepository.findOne({
      where: {
        email: email,
      },
      attributes: ["id", "email", "last_login"],
    });

    // if no user record is found, return error.
    if (!user) {
      throw new Error("User does not exist, Signup to create an account");
    }

    // find user auth record
    const user_auth = await userAuthsRepository.findOne({
      where: {
        user_id: user.id,
      },
      attributes: ["id", "auth_data"],
    });

    // default variable to compare passwords
    let confirm_password = false;

    /* check if there are auth records
     *  found on the db before  doing password
     *  comparison.
     * */
    if (user_auth && user_auth.auth_data) {
      confirm_password = await compare(password, user_auth.auth_data);
    }

    /*
     * check if there are no auth records or
     * password entered doesn't match the record
     * from the db, return an error.
     * */
    if (!user_auth || !confirm_password) {
      throw new Error("Incorrect password");
    }

    // update last login time
    user.last_login = new Date();
    await user.save();

    return user;
  }

  // logout service
  async logout(data: AuthLogoutDTO): Promise<any> {
    const login_hash: any = await loginHashesRepository.findOne({
      where: {
        user_id: data.user_id,
      },
      attributes: ["id", "hash", "mismatch_message"],
    });

    if (!login_hash) throw new Error("login hash was not found.");

    login_hash.hash = null;
    login_hash.mismatch_message =
      "Your account has been logged out. Please login again.";
    await login_hash.save();

    return {
      mismatch_message: login_hash.mismatch_message,
    };
  }

  // forgot password function
  async forgot_password(data: ForgotPasswordDTO): Promise<any> {
    const get_user_email = await userRepository.findOne({
      raw: true,
      where: {
        email: data.email,
      },
      attributes: ["id"],
    });

    if (!get_user_email) throw new Error("No record of this user was found.");

    const password_recovery_data =  {
      email: data.email,
      forgot_password_ip: data.req_ip,
      token: uuidv4().replace(/-/g, ""),
      user_id: get_user_email.id,
    };

    try {
      const create_user_recovery_password = await userAuthRecoveryRepository.create(
        password_recovery_data
      );
    } catch (error) {
      throw new Error(error.message);
    }

    /*
    then call the email service to send the change
     * password email to user here.
     */

    return true;
  }

  async change_password(data: ChangePasswordDTO): Promise<any> {
    const user_password_token: any = await userAuthRecoveryRepository.findOne({
      where: {
        token: data.token,
        is_used: false,
      },
      attributes: ["id", "token", "change_password_ip", "is_used", "user_id"],
    });
    if (!user_password_token)
      throw new Error("Token is either invalid or has expired");

    const change_password = await userAuthsRepository.findOne({
      where: {
        user_id: user_password_token.user_id,
      },
      attributes: ["id", "auth_data"],
    });

    if (!change_password) throw new Error("No password found");

    // encrypt user password
    const encrypt_password = await encrypt(data.new_password);

    // update new password on the user auth table
    change_password.auth_data = encrypt_password;
    await change_password.save();

    // update the is_used token record
    user_password_token.is_used = true;

    // update the user's change_password_ip record
    user_password_token.change_password_ip = data.req_ip;
    await user_password_token.save();

    const login_hash: any = await loginHashesRepository.findOne({
      where: {
        user_id: user_password_token.user_id,
      },
      attributes: ["id", "hash", "mismatch_message", "ip"],
    });

    if (!login_hash) throw new Error("login hash was not found.");

    login_hash.hash = null;
    login_hash.mismatch_message = "Password changed. Please log in again.";
    login_hash.ip = data.req_ip;
    await login_hash.save();

    return true;
  }
}
