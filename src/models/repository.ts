// sequelize models
import { sequelize } from ".";
import { User } from "./sequelize/user.model";
import { UserAuth } from "./sequelize/userauth.model";
import { UserBusiness } from "./sequelize/userbusiness.model";
import { LoginHash } from "./sequelize/loginhash.model";
import { UserAuthRecovery } from "./sequelize/userauthrecovery.model";

// import mongo model here
import Sample, { SampleModel } from "./mongo/sample";

// using sequelize repository
export const userRepository = sequelize.getRepository(User);
export const userAuthsRepository = sequelize.getRepository(UserAuth);
export const loginHashesRepository = sequelize.getRepository(LoginHash);
export const userBusinessRepository = sequelize.getRepository(UserBusiness);
export const userAuthRecoveryRepository = sequelize.getRepository(
  UserAuthRecovery
);

// mongo repository here
// export const createSampleRepository = async (
//     sample: CreateSampleDTO
//   ): Promise<Sample> => {
//     const create_sample = await SampleModel.create(review);
//     return create_sample && create_sample.toJSON();
// };