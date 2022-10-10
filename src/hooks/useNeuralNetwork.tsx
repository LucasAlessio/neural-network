import { createContext, useContext, useEffect, useRef, useState } from "react"
import { Perceptron } from "../classes/Perceptron";

import trainData from "../dataset/test.json";
import { ClassEnum } from "../enums/ClassEnum";
import { LayerTypeEnum } from "../enums/LayerTypeEnum";
import { useFormConfig } from "./useFormConfig";

type NeuralNetworkData = {
	network: Perceptron[][],
	epochs: number,
	isTraining: boolean,
	mount: () => void,
	start: () => void,
	pause: () => void,
	chartData: ChartData,
};

type ChartData = {
	epoch: number,
	summation: number,
}[];

const config = {
	layers: [
		{ type: LayerTypeEnum.INPUT, perceptrons: 18 },
		{ type: LayerTypeEnum.HIDDEN, perceptrons: 14 },
		{ type: LayerTypeEnum.OUTPUT, perceptrons: 7 },
	],
	learning_rate: 0.02,
};

const NeuralNetworkContext = createContext<NeuralNetworkData>({} as NeuralNetworkData);

export function NeuralNetworkProvider({ children }: { children: React.ReactNode }) {
	const [network, setNetwork] = useState<Perceptron[][]>([])
	const [epochs, setEpochs] = useState<number>(0);
	const [isTraining, setIsTraining] = useState<boolean>(false);
	const [executions, setExecutions] = useState<number>(0);
	const [chartData, setChartData] = useState<ChartData>([]);

	const currentIndex = useRef<number>(0);
	const errorSummation = useRef<number>(0);
	const bigOut = useRef<number>(-1);
	const pOut = useRef<number>(-1);

	function mount() {
		const newNetwork: Perceptron[][] = [];
		config.layers.forEach((value, index) => {
			const layer: Perceptron[] = [];
			for (let i = 0; i < value.perceptrons; i++) {
				const perceptron = new Perceptron({ type: value.type });
				if (index < config.layers.length - 1) {
					// Instancia os pesos das conexões para a primeira camada com a segunda
					perceptron.weights = Array.from({ length: config.layers[index + 1].perceptrons }, Math.random);

					// const setweights = {
					// 	0: {
					// 		0: [ 0.7790272683620145, 0.5686457524311452, -0.11943265569542473 ],
					// 		1: [ 0.11559291684137124, 0.29861702842723953, -0.01446494530253223 ],
					// 		2: [ -0.5389121129120413, 0.026101424515807436, 0.4800338297828788 ],
					// 		3: [ -0.6528852302230999, 0.8549169637728995, -0.5442026199974116 ],	
					// 	},
					// 	1: {
					// 		0: [ -0.05705984770489757, 0.2219880302358657 ],
					// 		1: [ 0.8439213540485625, 0.812573536975018 ],
					// 		2: [ 0.16827910639555294, -0.7532829771444817 ],
					// 	},
					// };

					//@ts-ignore
					//perceptron.weights = setweights[index][i] ?? [];
				}
				layer.push(perceptron);
			}
			newNetwork.push(layer);
		});
		setNetwork(newNetwork);
	}

	function train() {
		const newNetwork = [...network];

		Object.entries(trainData[currentIndex.current]).forEach(([attribute, value], index) => {
			if (attribute === "CLASS") {
				const outputLayer = config.layers.length - 1;

				newNetwork[outputLayer][0].expectedOutput = (value === ClassEnum.BRICKFACE ? 1 : 0);
				newNetwork[outputLayer][1].expectedOutput = (value === ClassEnum.SKY ? 1 : 0);
				newNetwork[outputLayer][2].expectedOutput = (value === ClassEnum.FOLIAGE ? 1 : 0);
				newNetwork[outputLayer][3].expectedOutput = (value === ClassEnum.CEMENT ? 1 : 0);
				newNetwork[outputLayer][4].expectedOutput = (value === ClassEnum.WINDOW ? 1 : 0);
				newNetwork[outputLayer][5].expectedOutput = (value === ClassEnum.PATH ? 1 : 0);
				newNetwork[outputLayer][6].expectedOutput = (value === ClassEnum.GRASS ? 1 : 0);

				return;
			}
			
			// if (index >= 5) {
			// 	return;
			// }
			newNetwork[0][index - 1].input = value;
		});

		// console.log("entrada", newNetwork);

		newNetwork.forEach((layer, indexlayer) => {
			if (indexlayer === 0) return;

			layer.forEach((perceptron, indexPerceptron) => {
				newNetwork[indexlayer - 1].forEach((prevPerceptron) => {
					const weights = prevPerceptron.weights;
					perceptron.input = prevPerceptron.output * (weights ? weights[indexPerceptron] : 0);
				});
			});
		});

		// console.log("passagem dos dados", newNetwork);

		newNetwork.reverse().forEach((layer, indexLayer) => {
			layer.forEach((perceptron, indexPerceptron) => {
				let errorFactor = 0;

				if (indexLayer === 0) {
					errorFactor = (perceptron.expectedOutput ?? 0) - perceptron.output;
					perceptron.error = perceptron.output * (1 - perceptron.output) * errorFactor;

					return;
				} else {
					const weights = perceptron.weights;
					weights.forEach((weight, indexWeight) => {
					 	errorFactor += weight * newNetwork[indexLayer - 1][indexWeight].error;
					});
				}

				perceptron.error = perceptron.output * (1 - perceptron.output) * errorFactor;
			});
		});
		newNetwork.reverse();

		// console.log("erros", newNetwork);

		newNetwork.forEach((layer, indexLayer) => {
			if (indexLayer === config.layers.length - 1) return;

			layer.forEach((perceptron, indexPerceptron) => {
				let weights = perceptron.weights;
				weights = weights?.map((weight, indexWeight) => {
					return weight + config.learning_rate * perceptron.output * newNetwork[indexLayer + 1][indexWeight].error;
				});
				perceptron.weights = weights;
			});
		});

		// console.log("atualizacao pesos", newNetwork);

		pOut.current = -1;
		bigOut.current = 0;

		newNetwork[config.layers.length - 1].forEach((perceptron, indexPerceptron) => {
			if (pOut.current < 0 || perceptron.output > bigOut.current) {
				pOut.current = indexPerceptron;
				bigOut.current = perceptron.output;
			}
		});

		if (newNetwork[config.layers.length - 1][pOut.current].expectedOutput === 0) {
			errorSummation.current += 1;
		}

		newNetwork.forEach((layer, indexLayer) => {
			layer.forEach((perceptron, indexPerceptron) => {
				perceptron.clearInput();
			});
		});


		setNetwork(newNetwork);

		currentIndex.current++;
		currentIndex.current %= trainData.length;

		if (currentIndex.current === 0) {
			setChartData([
				...chartData,
				{
					epoch: epochs,
					summation: errorSummation.current,
				}
			]);

			errorSummation.current = 0;
			setEpochs(old => ++old);
		}
	}

	function start() {
		setIsTraining(true);
	}

	function pause() {
		setIsTraining(false);
	}

	useEffect(() => {
		if (!isTraining || !network) {
			return;
		};

		// if (executions > 0) return;
		
		setTimeout(function() {
			train();
			setExecutions(old => ++old);
		}, 0);

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isTraining, network, executions]);

	return <NeuralNetworkContext.Provider value={
		{
			network,
			epochs,
			isTraining,
			mount,
			start,
			pause,
			chartData,
		}
	}>
		{ children }
	</NeuralNetworkContext.Provider>
}

export function useNeuralNetwork() {
	const context = useContext<NeuralNetworkData>(NeuralNetworkContext);
	return context;
}
