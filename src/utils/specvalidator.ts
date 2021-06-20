import { SpecDTO } from "@interfaces/index";

export const validateSpec = (
  spec: SpecDTO,
  data: object,
  optionalConfig = {}
) => {
  const { error, value } = spec.validate(data, {
    allowUnknown: true,
    stripUnknown: true,
    errors: {
      wrap: {
        label: "",
      },
    },
    ...optionalConfig,
  });
  if (error) {
    throw new Error(error.message);
  }
  return value;
};

export const validateAsyncSpec = async (
  spec: SpecDTO,
  data: {},
  optionalConfig = {}
) => {
  try {
    const value = await spec.validateAsync(data, {
      allowUnknown: true,
      stripUnknown: true,
      errors: {
        wrap: {
          label: "",
        },
      },
      ...optionalConfig,
    });
    return value;
  } catch (error) {
    throw new Error(error.message);
  }
};
