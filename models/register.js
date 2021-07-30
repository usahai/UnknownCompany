import { Sequelize } from "sequelize";
import sequelize from "../config/database";

const AddTeacher = sequelize.define(
	"AddTeacher",
	{
		name: Sequelize.STRING,
		email: Sequelize.STRING
	},
	{
		tableName: "teacher",
		timestamps: false
	}
);

const AddStudent = sequelize.define(
	"AddStudent",
	{
		name: Sequelize.STRING,
		email: Sequelize.STRING
	},
	{
		tableName: "student",
		timestamps: false
	}
);

const AddSubject = sequelize.define(
	"AddSubject",
	{
		subjectCode: Sequelize.STRING,
		name: Sequelize.STRING
	},
	{
		tableName: "subject",
		timestamps: false
	}
);

const AddClass = sequelize.define(
	"AddClass",
	{
		classCode: Sequelize.STRING,
		name: Sequelize.STRING
	},
	{
		tableName: "class",
		timestamps: false
	}
);

module.exports = {
	AddTeacher,
	AddStudent,
	AddSubject,
	AddClass
};
