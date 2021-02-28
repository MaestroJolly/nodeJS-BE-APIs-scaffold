import { model, Schema, Document } from "mongoose";

export default interface Sample extends Document {
  sample: string;
  ip?: string;
  country_code?: string;
  country?: string;
  user_id: number;
}

export const model_name = "Sample";
export const collection_name = "sample";

const schema_object = {
  sample: {
    type: Schema.Types.String,
  },
  ip: {
    type: Schema.Types.String,
    trim: true,
    default: "127.0.0.1",
  },
  country: {
    type: Schema.Types.String,
    trim: true,
    index: true,
    default: null,
  },
  user_id: {
    type: Schema.Types.Number,
    required: [true, "user_id is required"],
    trim: true,
    index: true,
  },
};

const schema = new Schema(schema_object, {
  timestamps: true,
  autoIndex: false,
});

export const SampleModel = model<Sample>(model_name, schema, collection_name);
