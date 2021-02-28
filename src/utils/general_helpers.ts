import { v4 as uuidv4 } from "uuid";

// object mapper
export const object_mapper = (
  initial_object: any,
  expected_object: any
): any => {
  const final_object = {};

  if (initial_object && expected_object) {
    if (
      typeof initial_object !== "object" ||
      typeof expected_object !== "object"
    ) {
      throw new Error("Initial and expected objects should be valid objects");
    } else {
      Object.keys(initial_object).forEach((object_key) => {
        const expected_object_key = expected_object[object_key];
        if (expected_object_key && expected_object_key !== null) {
          expected_object[expected_object_key] = initial_object[object_key];
          return;
        }
      });
    }
  }
  return expected_object;
};

// normalized slug
export const slug_normalizer = (): string => {
  return `${uuidv4().replace(/-/g, "")}`;
};

// normalizer to make a slug unique
export const slug_normalizer_alt = (slug: string): string => {
  const unique_id_list = uuidv4().split('-');
  const unique_id_list_length = unique_id_list.length;
  // returns a random integer from 0 to 4
  const random_index = Math.floor(Math.random() * unique_id_list_length); 
  return `${slug}-${unique_id_list[random_index]}`;
};

// rating score decider
export const score_decider = (rating: number): any => {
  switch (rating) {
    case 1:
      return 'Poor'
      break;
    case 2:
      return 'Fair'
      break;
    case 3:
      return 'Average'
      break;
    case 4:
      return 'Good'
      break;
    case 5:
      return 'Excellent'
      break;
    default:
      return null
      break;
  }
}

// normalize query data
export const query_data = (data: any): any => {
  if(data.req_ip){
    delete data.req_ip;
  }
  if(data.email){
    delete data.email;
  }
  return data;
}
