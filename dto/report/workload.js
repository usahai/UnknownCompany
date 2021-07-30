export default function processWorkload(data) {
	console.log("[dto-workload] data: ", data);

	var groupBy = function (xs, key) {
		return xs.reduce(function (rv, x) {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});
	};

	return data;
}
