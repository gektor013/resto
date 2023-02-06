export default function formatNumber(num) {
	return parseFloat(Number(num).toFixed(2))
		.toString()
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
