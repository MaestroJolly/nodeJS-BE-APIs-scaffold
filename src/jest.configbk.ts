import { pathsToModuleNameMapper } from "ts-jest/utils";
import { compilerOptions } from "../tsconfig.json";

export default = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: ".",
      }),
};
