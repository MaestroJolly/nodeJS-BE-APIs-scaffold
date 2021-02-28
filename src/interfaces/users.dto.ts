// user signup interface
export interface UsersSignUpDTO {
  fullname: string;
  email: string;
  business_name: string;
  business_mobile: string;
  business_email: string;
  website: string;
  industry: string;
  country: string;
  description: string;
  business_logo?: string;
  password: string;
  req_ip: string;
}

// user auth interface
export interface UserAuthDTO {
  user_id: number;
  email: string;
}

// get all users admin interface
export interface AllUsersDTO {
  user_id?: number;
  is_admin?: boolean;
  page?: number;
  status?: string;
}
