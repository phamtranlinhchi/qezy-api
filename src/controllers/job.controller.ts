
import { Request, Response } from "express";
import { HttpStatusCode } from "axios";
import catchAsync from "../helpers/catchAsync";
import jobService from "../services/job.service";
import { IJob, ILocation } from "../models/job.model";

// [GET] /jobs/all
const getAllJobs = catchAsync(async (req: Request, res: Response) => {
	let result: IJob[] | unknown = await jobService.getAllJobs();
	if (!result || typeof result !== 'object') {
		return res.status(HttpStatusCode.BadRequest).json({ error: "Error retrieving jobs" });
	}
	if (Array.isArray(result)) {
		const keywordFilter = req.query.description as string;
		if (keywordFilter) {
			const keywords = keywordFilter.split(",").map((keyword) => keyword.toLowerCase());
			result = result.filter((job: IJob) => {
				return keywords.some((keyword) => {
					return (
						job.jobDescription?.toLowerCase()?.includes(keyword) ||
						job.jobBenefits?.toLowerCase()?.includes(keyword) ||
						job.jobRequirements?.toLowerCase()?.includes(keyword) ||
						job.jobDepartment?.toLowerCase()?.includes(keyword) ||
						job.jobEmployment?.toLowerCase()?.includes(keyword) ||
						job.jobLocations.some((location: ILocation) => {
							return location.city?.toLowerCase()?.includes(keyword);
						})
					);
				});
			});
		}
		return res.status(HttpStatusCode.Ok).json(result as IJob[]);
	} else {
		return res.status(HttpStatusCode.BadRequest).json({ error: "Error retrieving jobs" });
	}
});

// [GET] /jobs
const getJobs = catchAsync(async (req: Request, res: Response) => {
	const result = await jobService.queryJobs(req.query);
	return res.status(HttpStatusCode.Ok).json(result);
});

// [POST] /jobs
const createJobs = catchAsync(async (req: Request, res: Response) => {
	let result;
	if (Array.isArray(req.body)) {
		result = await jobService.createJobs(req.body);
	} else {
		result = await jobService.createJobs(req.body);
	}
	return res.status(HttpStatusCode.Created).json(result);
});
export default {
	getAllJobs,
	getJobs,
	createJobs
};
