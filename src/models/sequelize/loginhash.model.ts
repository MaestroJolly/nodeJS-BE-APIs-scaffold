//loginhash.model.ts
import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { User } from "./user.model";
import { LoginHashDTO } from "../../interfaces/loginhash.dto";

@Table
export class LoginHash extends Model<LoginHashDTO> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column(DataType.STRING(45))
  ip!: string;

  @Column
  hash!: string;

  @Column
  mismatch_message!: string;

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
