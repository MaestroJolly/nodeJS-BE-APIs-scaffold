// all user businesses interface
export interface AllUserBusinessesDTO {
  user_id?: number;
  is_admin?: boolean;
  page?: number;
  status?: string;
  industry?: string;
  country?: string;
}


// user businesses model interface
export interface UserBusinessesDTO {
  user_id: number;
  status?: string;
  industry?: string;
  country?: string;
  business_name: string;
  business_email?: string;
  business_mobile: string;
  website?: string;
  auth_key: string;
  description?: string;
}
