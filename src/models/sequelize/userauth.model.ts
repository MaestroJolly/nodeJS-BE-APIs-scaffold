//userauth.model.ts
import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AllowNull,
  NotEmpty,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";
import { UserAuthDTO } from "../../interfaces/auth.dto";

@Table
export class UserAuth extends Model<UserAuthDTO> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  auth_data!: string;

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
