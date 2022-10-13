import { LayerTypeEnum } from "../enums/LayerTypeEnum";

export type LayerType = typeof LayerTypeEnum[keyof typeof LayerTypeEnum];

export type ConfigNeuralNetwork = {
	layers: {
		type: LayerType,
		perceptrons: number,
	}[],
	learning_rate: number,
}
