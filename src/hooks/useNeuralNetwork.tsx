import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { Perceptron } from "../classes/Perceptron";
import { ClassEnum } from "../enums/ClassEnum";
import { LayerTypeEnum } from "../enums/LayerTypeEnum";

import trainData from "../dataset/test.json";
import testData from "../dataset/train.json";
import { ChartData, ConfigNeuralNetwork } from "../types";

type NeuralNetworkData = {
	config: ConfigNeuralNetwork,
	setConfig: (arg: any) => void,
	epochs: number,
	weights: number[],
	viewWeights: (arg: [null, null] | [number, number]) => void,
	isTraining: boolean,
	isTesting: boolean,
	mount: () => void,
	start: () => void,
	pause: () => void,
	test: () => void,
	confusionMatrix: number[][],
	chartData: ChartData,
};

export const N_CHART_EPOCHS = 100;

const NeuralNetworkContext = createContext<NeuralNetworkData>({} as NeuralNetworkData);

export function NeuralNetworkProvider({ children }: { children: React.ReactNode }) {
	const [config, setConfig] = useState<ConfigNeuralNetwork>({
		layers: [
			{ type: LayerTypeEnum.INPUT, perceptrons: 18 },
			{ type: LayerTypeEnum.HIDDEN, perceptrons: 14 },
			{ type: LayerTypeEnum.OUTPUT, perceptrons: 7 },
		],
		learning_rate: 0.3,
	});

	const [confusionMatrix, setConfusionMatrix] = useState<number[][]>([]);

	const [isTraining, setIsTraining] = useState<boolean>(false);
	const [isTesting, setIsTesting] = useState<boolean>(false);
	
	const viewingWeights = useRef<[number, number] | [null, null]>([null, null]);
	const [weights, setWeights] = useState<number[]>([]);

	const internalNetwork = useRef<Perceptron[][]>([]);

	const [epochs, setEpochs] = useState<number>(0);
	const [chartData, setChartData] = useState<ChartData>([]);

	const currentIndexTrain = useRef<number>(0);

	const errorsAmount = useRef<number>(0);
	const biggestOutput = useRef<number>(-1);
	const perceptronOutput = useRef<number>(-1);

	const errors = useRef<number>(0);

	const mount = useCallback(() => {
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

		currentIndexTrain.current = 0;
		internalNetwork.current = newNetwork;

		setChartData([]);
		setEpochs(0);

		if (viewingWeights.current[0] !== null && viewingWeights.current[1] !== null) {
			setWeights(internalNetwork.current[viewingWeights.current[0]][viewingWeights.current[1]].weights);
		}
	}, [config.layers]);

	const train = useCallback(() => {
		if (isTesting) return;

		for (let index = 0; index < trainData.length; index++) {
			// const newNetwork = [...internalNetwork.current];

			Object.entries(trainData[index]).forEach(([attribute, value], index) => {
				if (attribute === "CLASS") {
					const outputLayer = config.layers.length - 1;

					internalNetwork.current[outputLayer][0].expectedOutput = (value === ClassEnum.BRICKFACE ? 1 : 0);
					internalNetwork.current[outputLayer][1].expectedOutput = (value === ClassEnum.SKY ? 1 : 0);
					internalNetwork.current[outputLayer][2].expectedOutput = (value === ClassEnum.FOLIAGE ? 1 : 0);
					internalNetwork.current[outputLayer][3].expectedOutput = (value === ClassEnum.CEMENT ? 1 : 0);
					internalNetwork.current[outputLayer][4].expectedOutput = (value === ClassEnum.WINDOW ? 1 : 0);
					internalNetwork.current[outputLayer][5].expectedOutput = (value === ClassEnum.PATH ? 1 : 0);
					internalNetwork.current[outputLayer][6].expectedOutput = (value === ClassEnum.GRASS ? 1 : 0);

					return;
				}
				
				// if (index >= 5) {
				// 	return;
				// }
				internalNetwork.current[0][index - 1].input = value;
			});

			// console.log("entrada", newNetwork);

			internalNetwork.current.forEach((layer, indexlayer) => {
				if (indexlayer === 0) return;

				layer.forEach((perceptron, indexPerceptron) => {
					internalNetwork.current[indexlayer - 1].forEach((prevPerceptron) => {
						const weights = prevPerceptron.weights;
						perceptron.input = prevPerceptron.output * (weights ? weights[indexPerceptron] : 0);
					});
				});
			});

			// for (let indexlayer = 1; indexlayer < newNetwork.length; indexlayer++) {
			// 	for (let indexPerceptron = 0; indexPerceptron < newNetwork[indexlayer].length; indexPerceptron++) {
			// 		for (let indexPrevPerceptron = 0; indexPrevPerceptron < newNetwork[indexlayer - 1].length; indexPrevPerceptron++) {
			// 			const weights = newNetwork[indexlayer - 1][indexPrevPerceptron].weights;
			// 			newNetwork[indexlayer][indexPerceptron].input = newNetwork[indexlayer - 1][indexPrevPerceptron].output * weights[indexPerceptron];
			// 		}
			// 	}
			// }

			// console.log("passagem dos dados", newNetwork);

			internalNetwork.current.reverse().forEach((layer, indexLayer) => {
				layer.forEach((perceptron, indexPerceptron) => {
					let errorFactor = 0;

					if (indexLayer === 0) {
						errorFactor = (perceptron.expectedOutput ?? 0) - perceptron.output;
					} else {
						perceptron.weights.forEach((weight, indexWeight) => {
							errorFactor += weight * internalNetwork.current[indexLayer - 1][indexWeight].error;
						});
					}

					perceptron.error = perceptron.output * (1 - perceptron.output) * errorFactor;
				});
			});
			internalNetwork.current.reverse();

			// for (let indexLayer = newNetwork.length - 1; indexLayer >= 0; indexLayer--) {
			// 	for (let indexPerceptron = 0; indexPerceptron < newNetwork[indexLayer].length; indexPerceptron++) {
			// 		let errorFactor = 0;

			// 		if (indexLayer === newNetwork.length - 1) {
			// 			errorFactor = (newNetwork[indexLayer][indexPerceptron].expectedOutput ?? 0) - newNetwork[indexLayer][indexPerceptron].output;
			// 		} else {
						
			// 			for (let indexWeight = 0; indexWeight < newNetwork[indexLayer][indexPerceptron].weights.length; indexWeight++) {
			// 				errorFactor += newNetwork[indexLayer][indexPerceptron].weights[indexWeight] * newNetwork[indexLayer + 1][indexWeight].error;
			// 			}
			// 		}

			// 		newNetwork[indexLayer][indexPerceptron].error = newNetwork[indexLayer][indexPerceptron].output * (1 - newNetwork[indexLayer][indexPerceptron].output) * errorFactor;
			// 	}
			// }

			// console.log("erros", newNetwork);

			internalNetwork.current.forEach((layer, indexLayer) => {
				if (indexLayer === config.layers.length - 1) return;

				layer.forEach((perceptron, indexPerceptron) => {
					let weights = perceptron.weights;
					weights = weights?.map((weight, indexWeight) => {
						return weight + config.learning_rate * perceptron.output * internalNetwork.current[indexLayer + 1][indexWeight].error;
					});
					perceptron.weights = weights;
				});
			});

			// for (let indexLayer = 0; indexLayer < newNetwork.length - 1; indexLayer++) {
			// 	for (let indexPerceptron = 0; indexPerceptron < newNetwork[indexLayer].length; indexPerceptron++) {
			// 		let weights = newNetwork[indexLayer][indexPerceptron].weights;
			// 		weights = weights?.map((weight, indexWeight) => {
			// 			return weight + config.learning_rate * newNetwork[indexLayer][indexPerceptron].output * newNetwork[indexLayer + 1][indexWeight].error;
			// 		});
			// 		newNetwork[indexLayer][indexPerceptron].weights = weights;
			// 	}
			// }

			// console.log("atualizacao pesos", newNetwork);

			perceptronOutput.current = -1;
			biggestOutput.current = 0;

			internalNetwork.current[config.layers.length - 1].forEach((perceptron, indexPerceptron) => {
				if (perceptronOutput.current < 0 || perceptron.output > biggestOutput.current) {
					perceptronOutput.current = indexPerceptron;
					biggestOutput.current = perceptron.output;
				}

				errors.current += Math.abs(perceptron.error);
			});

			if (internalNetwork.current[config.layers.length - 1][perceptronOutput.current].expectedOutput === 0) {
				errorsAmount.current += 1;
			}

			internalNetwork.current.forEach((layer, indexLayer) => {
				layer.forEach((perceptron, indexPerceptron) => {
					perceptron.clearInput();
				});
			});

			if (index === trainData.length - 1) {
				const [,...newChartData] = chartData;

				setChartData([
					...(chartData.length >= N_CHART_EPOCHS ? newChartData : chartData),
					{
						epoch: epochs + 1,
						error: Number(errors.current.toFixed(2)),
					}
				]);

				if (viewingWeights.current[0] !== null && viewingWeights.current[1] !== null) {
					setWeights(internalNetwork.current[viewingWeights.current[0]][viewingWeights.current[1]].weights);
				}

				errorsAmount.current = 0;
				errors.current = 0;
			}
		}
	}, [chartData, config.layers.length, config.learning_rate, epochs, isTesting]);

	const test = useCallback(() => {
		if (isTraining) return;
		setIsTesting(true);

		internalNetwork.current.forEach((layer, indexLayer) => {
			layer.forEach((perceptron, indexPerceptron) => {
				perceptron.clearInput();
			});
		});

		const newConfusionMatrix: number[][] = Array.from({ length: 7 }, () => Array.from({ length: 7 }, () => 0));

		for (let i = 0; i < testData.length; i++) {
			let expectedClass: number = -1;

			Object.entries(testData[i]).forEach(([attribute, value], index) => {
				if (attribute === "CLASS") {
					const outputLayer = config.layers.length - 1;

					internalNetwork.current[outputLayer][0].expectedOutput = (value === ClassEnum.BRICKFACE ? 1 : 0);
					internalNetwork.current[outputLayer][1].expectedOutput = (value === ClassEnum.SKY ? 1 : 0);
					internalNetwork.current[outputLayer][2].expectedOutput = (value === ClassEnum.FOLIAGE ? 1 : 0);
					internalNetwork.current[outputLayer][3].expectedOutput = (value === ClassEnum.CEMENT ? 1 : 0);
					internalNetwork.current[outputLayer][4].expectedOutput = (value === ClassEnum.WINDOW ? 1 : 0);
					internalNetwork.current[outputLayer][5].expectedOutput = (value === ClassEnum.PATH ? 1 : 0);
					internalNetwork.current[outputLayer][6].expectedOutput = (value === ClassEnum.GRASS ? 1 : 0);

					expectedClass = value;
					return;
				}
				
				internalNetwork.current[0][index - 1].input = value;
			});

			internalNetwork.current.forEach((layer, indexlayer) => {
				if (indexlayer === 0) return;

				layer.forEach((perceptron, indexPerceptron) => {
					internalNetwork.current[indexlayer - 1].forEach((prevPerceptron) => {
						const weights = prevPerceptron.weights;
						perceptron.input = prevPerceptron.output * (weights ? weights[indexPerceptron] : 0);
					});
				});
			});

			let perceptronOutputTest = -1;
			let biggestOutputTest = 0;

			internalNetwork.current[config.layers.length - 1].forEach((perceptron, indexPerceptron) => {
				if (perceptronOutputTest < 0 || perceptron.output > biggestOutputTest) {
					perceptronOutputTest = indexPerceptron;
					biggestOutputTest = perceptron.output;
				}
			});

			newConfusionMatrix[expectedClass - 1][perceptronOutputTest]++;

			internalNetwork.current.forEach((layer, indexLayer) => {
				layer.forEach((perceptron, indexPerceptron) => {
					perceptron.clearInput();
				});
			});
		}

		setConfusionMatrix(newConfusionMatrix);
		setIsTesting(false);
	}, [config.layers.length, isTraining]);

	const start = useCallback(() => {
		setIsTraining(true);
	}, []);

	const pause = useCallback(() => {
		setIsTraining(false);
	}, []);

	const viewWeights = (coord: [null, null] | [number, number]) => {
		viewingWeights.current = coord;

		if (coord[0] !== null && coord[1] !== null) {
			console.log(internalNetwork.current[coord[0]][coord[1]].weights);
			setWeights(internalNetwork.current[coord[0]][coord[1]].weights);
		}
	}

	useEffect(() => {
		mount();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [config.layers]);

	useEffect(() => {
		if (!isTraining || !internalNetwork.current || isTesting) {
			return;
		};

		// if (executions > 0) return;
		
		setTimeout(function() {
			train();
			// setExecutions(old => ++old);
			setEpochs(old => ++old);
		}, 0);

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isTraining, internalNetwork, epochs, isTesting]);

	return <NeuralNetworkContext.Provider value={
		{
			config,
			setConfig: function(config) {
				setConfig(config);
			},
			weights,
			viewWeights,
			epochs,
			isTraining,
			mount,
			start,
			pause,
			test,
			isTesting,
			confusionMatrix,
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
