export const testQuery = "SELECT * FROM class";

export const workloadQuery = `SELECT t.name, sb.subjectCode, sb.name, tsc.classCode
FROM teacher t
INNER JOIN teacher_subject_class tsc ON t.email = tsc.teacherEmail
INNER JOIN subject sb ON tsc.subjectCode = sb.subjectCode
INNER JOIN class c ON tsc.classCode = c.classCode
;`;
