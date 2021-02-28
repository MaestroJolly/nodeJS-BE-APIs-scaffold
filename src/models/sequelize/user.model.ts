//user.model.ts
import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  Model,
  Index,
  Unique,
  Default,
  AllowNull,
  NotEmpty,
  DataType,
  IsEmail,
  HasOne,
  Length,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from "sequelize-typescript";
import { UserBusiness } from "./userbusiness.model";
import { LoginHash } from "./loginhash.model";
import { UserAuth } from "./userauth.model";
import { UserAuthRecovery } from "./userauthrecovery.model";
@Table
export class User extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  fullname!: string;

  @Index
  @Unique
  @AllowNull(false)
  @IsEmail
  @NotEmpty
  @Column(DataType.STRING(60))
  email!: string;

  @Index
  @Default(false)
  @AllowNull(false)
  @NotEmpty
  @Column
  is_admin!: boolean;

  @Index
  @Default("live")
  @AllowNull(false)
  @Length({ max: 4, min: 4 })
  @NotEmpty
  @Column(DataType.ENUM("live", "test"))
  mode!: string;

  @Index
  @Default("active")
  @AllowNull(false)
  @Length({ max: 16, min: 6 })
  @NotEmpty
  @Column(DataType.ENUM("active", "inactive", "partially-active"))
  status!: string;

  @Column
  last_login!: Date;

  @CreatedAt
  @Column
  creation_date!: Date;

  @UpdatedAt
  @Column
  updated_on!: Date;

  @DeletedAt
  @Column
  deletion_date!: Date;

  @HasOne(() => UserBusiness)
  userbusiness!: UserBusiness[];

  @HasOne(() => LoginHash)
  loginhash!: LoginHash[];

  @HasOne(() => UserAuth)
  userauth!: UserAuth[];

  @HasOne(() => UserAuthRecovery)
  userauthrecovery!: UserAuthRecovery[];
}
