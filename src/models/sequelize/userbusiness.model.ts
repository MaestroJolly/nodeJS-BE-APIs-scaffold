//userbusiness.model.ts
import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  Model,
  Index,
  Unique,
  Default,
  Length,
  IsEmail,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AllowNull,
  NotEmpty,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";
import { UserBusinessesDTO } from "../../interfaces/userbusinesses.dto";

@Table
export class UserBusiness extends Model<UserBusinessesDTO> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  business_name!: string;

  @Column(DataType.STRING(40))
  business_email!: string;

  @AllowNull(false)
  @Length({
    msg: "mobile number should not be lesser than 11 or greater than 20",
    max: 20,
    min: 11,
  })
  @NotEmpty
  @Column(DataType.STRING(20))
  business_mobile!: string;

  @Unique
  @Column
  website!: string;

  @Index
  @AllowNull(false)
  @NotEmpty
  @Column
  industry!: string;

  @Index
  @AllowNull(false)
  @Length({
    msg: "country should not be lesser or higher than 2",
    max: 2,
    min: 2,
  })
  @NotEmpty
  @Column(DataType.STRING(2))
  country!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Index
  @Column
  business_logo!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING(36))
  auth_key!: string;

  @ForeignKey(() => User)
  @Column
  user_id!: number;

  @BelongsTo(() => User, "user_id")
  user!: User;

  @CreatedAt
  @Column
  creation_date!: Date;

  @UpdatedAt
  @Column
  updated_on!: Date;

  @DeletedAt
  @Column
  deletion_date!: Date;
}
