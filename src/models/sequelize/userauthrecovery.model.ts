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

@Table
export class UserAuthRecovery extends Model<UserAuthRecovery> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column(DataType.STRING(45))
  forgot_password_ip!: string;

  @Column(DataType.STRING(45))
  change_password_ip!: string;

  @Index
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING(40))
  email!: string;

  @Unique
  @Index
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING(32))
  token!: string;

  @Index
  @Default(false)
  @AllowNull(false)
  @NotEmpty
  @Column
  is_used!: boolean;

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
