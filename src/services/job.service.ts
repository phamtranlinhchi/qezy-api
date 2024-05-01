import { IJob, Job } from "../models/job.model";
import logger from "../helpers/logger";
import { pick } from "../helpers/pick";
import { FilterQuery, PaginateOptions } from "mongoose";

const getAllJobs = async () => {
	try {
		const jobs = await Job.find({});
		return jobs;
	} catch (error) {
		logger.error(`Error getting all jobs: ${error}`);
		return error;
	}
};

const getJob = async (filter: { [key: string]: string }) => {
	const job = await Job.findOne(filter);
	return job;
};
type IJobQuery = FilterQuery<IJob> & PaginateOptions;
const queryJobs = async (jobQuery: IJobQuery) => {
	const filters = { ...jobQuery };
	delete filters.page;
	delete filters.limit;
	for (const key in filters) {
		if (Object.prototype.hasOwnProperty.call(filters, key)) {
			const value = filters[key];
			filters[key] = decodeURIComponent(value);
		}
	}
	const options = pick(jobQuery, ["page", "limit"]);
	if ("remote" in filters) {
		filters.remote = { $eq: Boolean(filters.remote) };
	}
	const searchKeywords = filters.search ? filters.search.split(",") : [];
	const searchConditions = searchKeywords.map((keyword: string) => ({
		$or: [
			{ companyName: { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
			{ sourceUri: { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
			{ minExperienceInYears: { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
			{ remote: filters.remote != null ? filters.remote : null },
			{ remoteRatioInPercent: { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
			{ "jobLocations.city": { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
			{ "jobLocations.state": { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
			{ "jobLocations.country": { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
			{ jobId: { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
			{ jobTitle: { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
			{ jobEmployment: { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
			{ jobDescription: { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
			{ jobRequirements: { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
			{ jobDepartment: { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
			{ jobBenefits: { $regex: keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } }
		]
	}));
	const combinedSearchConditions = searchConditions.length ? { $or: searchConditions } : {};
	const query = {
		$and: [
			{
				$and: [
					filters.companyName ? {
						companyName: {
							$regex: (filters.companyName as string).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
							$options: "i"
						}
					} : {},
					filters.sourceUri ? { companyName: { $regex: (filters.sourceUri as string).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } } : {},
					filters.remote ? { remote: filters.remote } : {},
					filters.jobLocations ? {
						$or: [
							{ "jobLocations.city": { $regex: filters.jobLocations.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
							{ "jobLocations.state": { $regex: filters.jobLocations.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } },
							{ "jobLocations.country": { $regex: filters.jobLocations.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } }
						]
					} : {},
					filters.jobId ? { jobId: { $regex: filters.jobId.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } } : {},
					filters.jobTitle ? { jobTitle: { $regex: (filters.jobTitle as string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } } : {},
					filters.jobEmployment ? { jobEmployment: { $regex: filters.jobEmployment.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } } : {},
					filters.jobDescription ? { jobDescription: { $regex: filters.jobDescription.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } } : {},
					filters.jobRequirements ? { jobRequirements: { $regex: filters.jobRequirements.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } } : {},
					filters.jobDepartment ? { jobDepartment: { $regex: filters.jobDepartment.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } } : {},
					filters.jobBenefits ? { jobBenefits: { $regex: filters.jobBenefits.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" } } : {}
				]
			},
			combinedSearchConditions
		]
	};

	const result = await Job.paginate(query, options);
	return result;
};
const getJobById = async (id: string) => {
	try {
		const job = await Job.findById(id);
		if (!job) {
			throw new Error("Can't not find job");
		}
		return job;
	} catch (error) {
		logger.error(`Error getting a job: ${JSON.stringify(error)}`);
		return error;
	}
};

const getLatestJobMiningDateByCompany = async (companyName: string) => {
	try {
		const job = await Job.findOne({ companyName });
		return job ? job.miningDate : null;
	} catch (error) {
		logger.error(`Error getting a job: ${JSON.stringify(error)}`);
		return error;
	}
};

const createJob = async (job: IJob | IJob[]) => {
	try {
		const newJob = await Job.create(job);
		return newJob;
	} catch (err) {
		logger.error(err);
	}
};

const createJobs = async (jobs: IJob[]) => {
	const newJobs = await Job.insertMany(jobs, { ordered: false });
	return newJobs;
};

const updateJobById = async (id: string, updatedJobField: IJob) => {
	try {
		const job = await Job.findByIdAndUpdate(id, updatedJobField);
		return job;
	} catch (err) {
		console.log(err);
	}
};

const deleteJobsByCompany = async (companyName: string) => {
	try {
		const job = await Job.deleteMany({ companyName });
		if (!job) {
			throw new Error("Can't not find delete job ");
		}
		return job;
	} catch (error) {
		logger.error(`Error delete job: ${error}`);

		return error;
	}
};

export default {
	queryJobs,
	getAllJobs,
	getJob,
	getLatestJobMiningDateByCompany,
	createJob,
	createJobs,
	updateJobById,
	deleteJobsByCompany,
	getJobById,
};
