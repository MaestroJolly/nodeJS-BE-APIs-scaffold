import {
  UsersSignUpDTO,
  UserAuthDTO,
  AllUsersDTO,
} from "../interfaces/users.dto";
import { app_config } from "../config";
import {
  userRepository,
  userAuthsRepository,
  userBusinessRepository,
  loginHashesRepository,
} from "../models/repository";
import { encrypt, compare } from "../utils/hasher";
import { auth_key_generator } from "../utils/auth_key_generator";
import { object_mapper, slug_normalizer } from "../utils/general_helpers";
import { normalize_details } from "./users.normalize";
import * as Joi from "joi";

export class UsersService {
  constructor() {}

  // test service
  test(data: any) {
    return data;
  }

  // function to register a user.
  async register(data: UsersSignUpDTO): Promise<any> {
    const schema = Joi.object({
      fullname: Joi.string().required(),
      email: Joi.string().required().email({ minDomainSegments: 2 }).trim(),
      password: Joi.string().required().trim(),
      business_name: Joi.string().required().trim(),
      business_mobile: Joi.string()
        .required()
        .trim()
        .min(10)
        .max(14)
        .pattern(/^[0-9+]+$/),
      website: Joi.string().trim(),
      industry: Joi.string().trim(),
      business_email: Joi.string().email({ minDomainSegments: 2 }).trim(),
      country: Joi.string().required().trim().uppercase().length(2),
      description: Joi.string().trim(),
      req_ip: Joi.string().trim().ip(),
    });

    const validated_value = await schema.validateAsync(data);

    // destructure user data
    const {
      fullname,
      email,
      password,
      business_name,
      business_mobile,
      website,
      industry,
      business_email,
      country,
      description,
      req_ip,
    } = validated_value;

    /*
     * if website is entered, check if it already exists,
     * website should be unique.
     */
    if (website) {
      const check_if_website_exists = await userBusinessRepository.findOne({
        raw: true,
        where: {
          website: website,
        },
        attributes: ["website"],
      });

      if (check_if_website_exists) {
        throw new Error("Website has already been registered.");
      }
    }

    let create_user, create_user_auth, create_user_business, encrypt_password;

    // this bit creates the user record
    try {
      create_user = await userRepository.create({
        fullname: fullname,
        email: email,
      });
    } catch (error) {
      if (error.message === "Validation error") {
        throw new Error("Email already exists.");
      } else {
        throw new Error(error.message);
      }
    }

    // encrypt user password
    encrypt_password = await encrypt(password);

    // this bit creates the user auth after the user record has been created
    try {
      create_user_auth = await userAuthsRepository.create({
        auth_data: encrypt_password,
        user_id: create_user.id,
      });
    } catch (error) {
      // delete this record if the userAuth entry creation fails
      if (create_user) {
        create_user.email = `DELETED-${Date.now()}-${create_user.email}`;
        await create_user.save();
        await create_user.destroy();
      }
      if (error.message === "Validation error") {
        throw new Error("user auth was not successfully created");
      } else {
        throw new Error(error.message);
      }
    }

    // this bit creates the user business record
    try {
      create_user_business = await userBusinessRepository.create({
        business_name: business_name,
        business_email: business_email,
        business_mobile: business_mobile,
        website: website,
        industry: industry,
        country: country,
        auth_key: auth_key_generator(),
        description: description,
        user_id: create_user.id,
      });
    } catch (error) {
      /*
       * delete all these records if the user business
       * record entry fails
       */
      if (create_user && create_user_auth) {
        create_user.email = `DELETED-${Date.now()}-${create_user.email}`;
        await create_user.save();
        await create_user.destroy();
        create_user_auth.destroy();
      }
      if (error.message === "Validation error") {
        throw new Error("user business was not successfully created");
      } else {
        throw new Error(error.message);
      }
    }

    // this bit creates the user login hash and review page
    try {
      await this.login_hash(req_ip, create_user.id);
    } catch (error) {
      /*
       * delete all these records if the login hash and
       * create review page entry record fails
       */
      if (create_user && create_user_auth && create_user_business) {
        create_user.email = `DELETED-${Date.now()}-${create_user.email}`;
        await create_user.save();
        await create_user.destroy();
        await create_user_auth.destroy();
        await create_user_business.destroy();
      }
      throw new Error(error.message);
    }

    return {
      id: create_user.id,
      email: create_user.email,
      business_name: create_user_business.business_name,
    };
  }

  // create login hash
  async login_hash(ip: string, user_id: number): Promise<any> {
    let login_hash = null;

    login_hash = await loginHashesRepository.create({
      ip: ip,
      hash: `vh_${user_id}_${Date.now()}`,
      user_id: user_id,
      mismatch_message: "NEW",
    });

    if (!login_hash) {
      throw new Error("Login hash was not successfully created");
    }

    return login_hash;
  }

  // get user details function
  async get_user_details(data: UserAuthDTO): Promise<any> {
    const user_data: any = {
      user: null,
      user_business: null,
    };

    user_data.user = await userRepository.findByPk(data.user_id, {
      raw: true,
      attributes: [
        "id",
        "fullname",
        "email",
        "status",
        "last_login",
        "creation_date",
        "updated_on",
      ],
    });

    if (!user_data.user) throw new Error("No record of this user found");

    // fetch user business details
    user_data.user_business = await userBusinessRepository.findOne({
      raw: true,
      where: {
        user_id: user_data.user.id,
      },
      attributes: [
        "business_name",
        "business_email",
        "business_mobile",
        "business_logo",
        "website",
        "industry",
        "country",
        "auth_key",
      ],
    });

    if (!user_data.user_business)
      throw new Error("No record of this user business details found");

    // spread data for normalization
    const user_unnormalized_data = {
      ...user_data.user,
      ...user_data.user_business,
    };

    // normalized user data
    const normalized_data = object_mapper(
      user_unnormalized_data,
      normalize_details("user_details")
    );

    return normalized_data;
  }

  // get all users
  async get_users(data: AllUsersDTO): Promise<any> {
    // delete this prop to prevent it from being queried
    if (data.is_admin) {
      delete data.is_admin;
    }

    let query_data: any = {};

    if (data.status) {
      query_data.status = data.status;
    }

    let page = data.page && data.page !== 0 ? data.page : 1;
    delete data.page;
    let offset = (page - 1) * 10;

    const get_all_users = await userRepository.findAndCountAll({
      where: query_data,
      limit: 10,
      offset: offset,
      attributes: [
        "id",
        "fullname",
        "email",
        "is_admin",
        "mode",
        "status",
        "last_login",
        "creation_date",
      ],
    });

    return { total_count: get_all_users.count, users: get_all_users.rows };
  }
}
