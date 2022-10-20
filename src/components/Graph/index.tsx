import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useNeuralNetwork } from "../../hooks/useNeuralNetwork";

export function Graph() {
	const { epochs, chartData } = useNeuralNetwork();

	return (
		<>
			<ResponsiveContainer aspect={ 1.77 }>
				<LineChart
					width={ 500 }
					height={ 300 }
					data={ chartData }
					margin={{
						top: 0,
						right: 0,
						left: 0,
						bottom: 0,
					}} >
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="errors"
						stroke="#8884d8"
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
