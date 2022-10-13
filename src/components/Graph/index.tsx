import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useNeuralNetwork } from "../../hooks/useNeuralNetwork";

export function Graph() {
	const { epochs, chartData } = useNeuralNetwork();

	return (
		<>
			<span>Épocas: { epochs }</span>

			<div style={{ width: "100%", height: "300px", border: "1px dotted #000"}}>
				<ResponsiveContainer width="100%">
					<LineChart
						width={ 500 }
						height={ 300 }
						data={ chartData }
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="errors" textRendering="teste" stroke="#8884d8" activeDot={{ r: 8 }} isAnimationActive={ false } />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</>
	)
}
