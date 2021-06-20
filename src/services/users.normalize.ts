// user details normalizer
export const user_normalize_details = (type: any): any => {
  switch (type) {
    case "user_details":
      return {
        id: "id",
        fullname: "fullname",
        email: "email",
        status: "status",
        business_email: "business_email",
        business_logo: "business_logo",
        website: "website",
        industry: "industry",
        country: "country",
        page_name: "page_name",
        page_category: "page_category",
        page_slug: "page_slug",
        page_type: "page_type",
        auth_key: "auth_key",
        last_login: "last_login",
        creation_date: "creation_date",
        updated_on: "updated_on",
      };
      break;
    default:
      break;
  }
};
