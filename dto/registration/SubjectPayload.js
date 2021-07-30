export default function getSubjectPayload(data) {
	let payload = {};
	if (Array.isArray(data)) {
		payload = data.map(item => ({
			subjectCode: item.subjectCode,
			name: item.name
		}));
	} else {
		payload = {
			subjectCode: data.subjectCode,
			name: data.name
		};
	}

	return payload;
}
