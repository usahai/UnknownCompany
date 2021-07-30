export default function getStudentPayload(data) {
	let payload = {};
	if (Array.isArray(data)) {
		payload = data.map(item => ({
			name: item.name,
			email: item.email
		}));
	} else {
		payload = {
			name: data.name,
			email: data.email
		};
	}

	return payload;
}
