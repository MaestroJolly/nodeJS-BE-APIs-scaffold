// login interface
export interface AuthLoginDTO {
    req_ip: string;
    email: string;
    password: string;
}

// auth logout interface
export interface AuthLogoutDTO {
    user_id: number;
    email: string;
}

// forgot password interface
export interface ForgotPasswordDTO {
    email:  string;
    req_ip: string;
}

// change password interface
export interface ChangePasswordDTO {
    req_ip: string;
    new_password:  string;
    token: string;
}

// user auth model interface
export interface UserAuthDTO {
    user_id: number;
    auth_data: string;
}

// user auth recovery model interface
export interface UserAuthRecoveryDTO {
    email: string;
    forgot_password_ip: string;
    token: string;
    user_id: number;
    is_used?: boolean;
}