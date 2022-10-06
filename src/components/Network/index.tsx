import { Fragment, useEffect, useState, PureComponent } from "react";
import { useNeuralNetwork } from "../../hooks/useNeuralNetwork";
import { LayerContainer, NetworkContainer, PerceptronContainer, WeightsContainer } from "./styles";

import { faAtom, faRightLong, faWeightHanging } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

//eslint-disable-next-line
//import trainData from "../../dataset/train.json";

//eslint-disable-next-line
//import testData from "../../dataset/train.json";

type WeightsListProps = {
	layer: number,
	perceptron: number
} | {
	layer: null,
	perceptron: null
};

export function Network() {
	const { network, mount, isTraining, start, pause, epochs } = useNeuralNetwork();
	const [activePerceptron, setActive] = useState<[null, null] | [number, number]>([null, null]);
	const [showNetwork, setShowNetwork] = useState(false);

	useEffect(() => {
		mount();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleViewWeights(isActivePerceptron: boolean, indexLayer: number, indexPerceptron: number) {
		isActivePerceptron ? setActive([null, null]) : setActive([indexLayer, indexPerceptron]);
	}

	return (
		<>
			<NetworkContainer>
				{ network.map((layer, indexLayer) => {
					return (
						<Fragment key={indexLayer}>
							<LayerContainer>
								{ layer.map((perceptron, indexPerceptron) => {
									const isActive = JSON.stringify([indexLayer, indexPerceptron]) === JSON.stringify(activePerceptron);

									return (
										<PerceptronContainer
											key={indexPerceptron}
											className={ isActive ? 'active' : '' } >
											<FontAwesomeIcon
												icon={faAtom}
												size="2x"
												onClick={ () => indexLayer < network.length - 1 && handleViewWeights(isActive, indexLayer, indexPerceptron) } />
										</PerceptronContainer>
									);
								}) }
							</LayerContainer>
							<WeightsContainer>
								{/*@ts-ignore*/}
								{ activePerceptron[0] === indexLayer && <WeightsList layer={activePerceptron[0]} perceptron={activePerceptron[1]} />}
							</WeightsContainer>
						</Fragment>
					);
				}) }
			</NetworkContainer>

			<div>
				<button onClick={ () => isTraining ? pause() : start() }>{ isTraining ? 'Pausar' : 'Treinar' }</button>
			</div>

			<div>
				<button onClick={() => { setShowNetwork(old => !old); if (showNetwork) console.log(network); } }> { showNetwork ? 'mostrar' : 'ocultar' } </button>
			</div>

			<span>Épocas: { epochs }</span>


			{/* <ResponsiveContainer width="500" height="300"> */}
				<LineChart
					width={500}
					height={300}
					data={[{
						name: 'Page A',
						uv: 4000,
						pv: 2400,
						amt: 2400,
					},
					{
						name: 'Page B',
						uv: 3000,
						pv: 1398,
						amt: 2210,
					}]}
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
					<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
					<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
				</LineChart>
			{/* </ResponsiveContainer> */}
		</>
	);
}

function WeightsList({ layer, perceptron }: WeightsListProps) {
	const { network } = useNeuralNetwork();

	if (layer === null || perceptron === null) {
		return <></>;
	}

	return <ul>
		{ network[layer][perceptron].weights.map((weight, index) => {
			return (
				<li key={ index }><FontAwesomeIcon icon={faWeightHanging} /> { weight } <FontAwesomeIcon icon={faRightLong} /></li>
			);
		}) }
		
	</ul>;
}
