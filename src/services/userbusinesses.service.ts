import {
  AllUserBusinessesDTO,
} from "../interfaces/userbusinesses.dto";
import { app_config } from "../config";
import {
  userRepository,
  userBusinessRepository
} from "../models/repository";
import { normalize_details } from "./userbusinesses.normalize";

export class UserBusinessesService {
  constructor() {}

  // get all user businesses
  async get_userbusinesses(data: AllUserBusinessesDTO): Promise<any> {
    // delete this prop to prevent it from being queried
    if (data.is_admin) {
      delete data.is_admin;
    }

    let query_data: any = {};

    if (data.country) {
      query_data.country = data.country;
    }

    if (data.industry) {
      query_data.industry = data.industry;
    }

    let page = data.page && data.page !== 0 ? data.page : 1;
    delete data.page;
    let offset = (page - 1) * 10;

    const get_all_user_businesses = await userBusinessRepository.findAndCountAll({
      where: query_data,
      limit: 10,
      offset: offset,
      attributes: [
        "id",
        "business_name",
        "business_email",
        "business_mobile",
        "website",
        "industry",
        "country",
        "description",
        "creation_date"
      ],
    });

    return { total_count: get_all_user_businesses.count, businesses: get_all_user_businesses.rows };
  }
}
