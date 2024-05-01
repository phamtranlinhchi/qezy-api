import mongoose, { Schema, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";
export interface ILocation {
	city?: string;
	state?: string;
	country?: string;
}

export interface IJob extends Document {
	_id?:string;
	companyName: string;
	sourceUri: string;
	miningDate?: Date;
	minExperienceInYears?: number | null;
	remote?: boolean | null;
	remoteRatioInPercent?: number | null;
	jobLocations: string[] | ILocation[];
	jobId?: string | null;
	jobTitle: string;
	jobEmployment?: string;
	jobDescription?: string | null;
	jobRequirements?: string | null;
	jobDepartment?: string | null;
	jobBenefits?: string | null;
}

const jobSchema: Schema = new mongoose.Schema(
	{
		companyName: {
			type: String,
			required: true,
		},
		sourceUri: { type: String, required: true, unique: true },
		miningDate: { type: Date, required: true },
		minExperienceInYears: { type: Schema.Types.Mixed },
		remote: { type: Schema.Types.Mixed, default: false },
		remoteRatioInPercent: { type: Schema.Types.Mixed },
		jobLocations: {
			type: Array<{
				city: { type: string };
				state: { type: string };
				country: { type: string };
			}>,
			default: [],
		},
		jobId: { type: String },
		jobTitle: { type: String, required: true },
		jobEmployment: { type: String, default: "fulltime" },
		jobDescription: { type: String },
		jobRequirements: { type: String },
		jobDepartment: {
			type: String,
			enum: ["sale", "development", "design", "operations", "others"],
			default: "others",
		},
		jobBenefits: { type: String },
	},
	{
		timestamps: true,
	}
);

jobSchema.plugin(paginate);

export const Job = mongoose.model<IJob, mongoose.PaginateModel<IJob>>("Job", jobSchema);
