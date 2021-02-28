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