import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

export enum ZMIRoles {
	GlobalAdmin = "ZMI.GlobalAdmin",
	SaleAgents = "ZMI.SaleAgents",
	Guest = "ZMI.Guest"
}
export interface IUser extends Document {
	id: string
	email: string,
	name: string,
	role: string,
	avatar : string
}

const userSchema: Schema = new mongoose.Schema({
	id: String,
	email: String,
	name: String,
	role: {
		type: String,
		enum: ZMIRoles,
		default: ZMIRoles.Guest
	},
	avatar: String,
});

userSchema.plugin(paginate);
export const User = mongoose.model<IUser, mongoose.PaginateModel<IUser>>("User", userSchema);
