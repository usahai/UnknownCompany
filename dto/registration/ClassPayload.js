export default function getClassPayload(data) {
	let payload = {};
	if (Array.isArray(data)) {
		payload = data.map(item => ({
			classCode: item.classCode,
			name: item.name
		}));
	} else {
		payload = {
			classCode: data.classCode,
			name: data.name
		};
	}

	return payload;
}
