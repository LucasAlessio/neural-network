import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useNeuralNetwork } from "../../hooks/useNeuralNetwork";

export function Graph() {
	const { epochs, chartData } = useNeuralNetwork();

	const maxError = chartData.reduce((acc, value, index) => {
		if (value.error === null) return 0;

		return value.error > acc ? value.error : acc;
	}, 0) + 10;

	const newChartData = [
		...chartData.slice(-100),
		...Array.from({ length: 100 - chartData.length }, (_, index) => ({
			error: null,
			epoch: chartData.length + index + 1,
		})),
	];

	const ticks = newChartData.filter(({ epoch }) => epoch % 10 === 0).map(({ epoch }) => epoch);

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
					<XAxis dataKey="epoch" ticks={ticks} tick={<CustomizedAxisTick />} interval={0} tickCount={5} />
					<YAxis domain={[0, Math.floor(maxError)]} allowDataOverflow={true} />
					<Tooltip labelFormatter={(v) => `Epoch: ${v}`} />
					<Legend />
					<Line
						name="Total error"
						strokeWidth={2}
						type="monotone"
						dataKey="error"
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

function CustomizedAxisTick(props: any) {
	const { x, y, payload: { value } } = props;

	return (
		<g transform={`translate(${x},${y})`}>
			<text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35), scale(.75)">
				{ value }
			</text>
		</g>
	);
}
