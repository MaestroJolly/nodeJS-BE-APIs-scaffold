// specvalidator interface

export interface SpecDTO {
  validate: (data: object, optionalConfig: object) => any;
  validateAsync: (data: object, optionalConfig: object) => any;
}
