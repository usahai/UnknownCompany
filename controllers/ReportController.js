import express from "express";
import { OK, BAD_REQUEST } from "http-status-codes";
import sequelize from "../config/database";
import Logger from "../config/logger";
import { workloadQuery } from "../dao/registrationDao";
import processWorkload from "../dto/report/workload";
const ReportController = express.Router();

const LOG = new Logger("ReportController.js");

const WorkloadHandler = async (req, res) => {
	try {
		let [response] = await sequelize.query(workloadQuery);
		res.status(OK).send(processWorkload(response));
	} catch (error) {
		// TODO
		LOG.error(error);
		res.status(BAD_REQUEST).send(error);
	}
};

ReportController.get("/workload", WorkloadHandler);

export default ReportController;
