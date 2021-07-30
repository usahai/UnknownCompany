import express from "express";
import { OK, BAD_REQUEST } from "http-status-codes";
import Logger from "../config/logger";
import { AddTeacher, AddStudent, AddSubject, AddClass } from "../models/register";
import { API_RESPONSE, DB_TABLE } from "../util/constants";
import getTeacherPayload from "../dto/registration/TeacherPayload";
import getStudentPayload from "../dto/registration/StudentPayload";
import getSubjectPayload from "../dto/registration/SubjectPayload";
import getClassPayload from "../dto/registration/ClassPayload";

const RegistrationController = express.Router();

const LOG = new Logger("RegistrationController.js");

const registerHandler = async (req, res) => {
	try {
		let reqData = req.body;
		let keys = Object.keys(reqData);

		keys.forEach(async key => {
			let obj = reqData[`${key}`];
			let payload = {};

			switch (key) {
				case DB_TABLE.TEACHER:
					payload = getTeacherPayload(obj);
					if (Array.isArray(obj)) {
						await AddTeacher.bulkCreate(payload, { fields: ["name", "email"] });
					} else {
						await AddTeacher.create(payload, { fields: ["name", "email"] });
					}
					break;
				case DB_TABLE.STUDENTS:
					payload = getStudentPayload(obj);
					if (Array.isArray(obj)) {
						await AddStudent.bulkCreate(payload, { fields: ["name", "email"] });
					} else {
						await AddStudent.create(payload, { fields: ["name", "email"] });
					}
					break;
				case DB_TABLE.SUBJECT:
					payload = getSubjectPayload(obj);
					if (Array.isArray(obj)) {
						await AddSubject.bulkCreate(payload, { fields: ["subjectCode", "name"] });
					} else {
						await AddSubject.create(payload, { fields: ["subjectCode", "name"] });
					}
					break;
				case DB_TABLE.CLASS:
					payload = getClassPayload(obj);
					if (Array.isArray(obj)) {
						await AddClass.bulkCreate(payload, { fields: ["classCode", "name"] });
					} else {
						await AddClass.create(payload, { fields: ["classCode", "name"] });
					}
					break;
				default:
					return;
			}
		});

		res.status(OK).send(API_RESPONSE.SUCCESS);
	} catch (error) {
		LOG.error(error);
		res.status(BAD_REQUEST).send(error);
	}
};

RegistrationController.post("/register", registerHandler);

export default RegistrationController;
