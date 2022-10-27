import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useNeuralNetwork } from "../../hooks/useNeuralNetwork";

export function Graph() {
	const { epochs, chartData } = useNeuralNetwork();

	const maxError = chartData.reduce((acc, value, index) => {
		return value.errors > acc ? value.errors : acc;
	}, 0);

	const newChartData = [
		...chartData.slice(-100),
		...Array.from({ length: 100 - chartData.length }, () => ({
			error: 0,
			epoch: 0,
		})),
		
	]

	return (
		<>
			<ResponsiveContainer aspect={ 1.77 }>
				<LineChart
					width={ 500 }
					height={ 300 }
					data={ newChartData }
					margin={{
						top: 0,
						right: 0,
						left: 0,
						bottom: 0,
					}} >
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis domain={[0, maxError + 10]} allowDataOverflow={true} />
					<Tooltip />
					<Legend />
					<Line
						strokeWidth={2}
						type="monotone"
						dataKey="errors"
						stroke="#558aab"
						activeDot={{ r: 8 }}
						dot={ false }
						isAnimationActive={ false } />
				</LineChart>
			</ResponsiveContainer>

			<table className="table table-bordered table-striped table-sm mt-3">
				<tbody>
					<tr>
						<th className="text-muted">Epochs</th>
						<td className="text-end">{ epochs }</td>
					</tr>
				</tbody>
			</table>
		</>
	)
}
