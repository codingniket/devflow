import { Schema, model, models } from "mongoose";

interface IAccount {
  userid: Schema.Types.ObjectId;
  name: string;
  image?: string;
  password?: string;
  provider: string;
  providerAccountId?: string;
}

const AccountSchema = new Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
  },
  { timestamps: true }
);

const Account = models?.account || model<IAccount>("Account", AccountSchema);
export default Account;
