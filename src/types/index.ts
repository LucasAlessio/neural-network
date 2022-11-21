import { ClassEnum } from "../enums/ClassEnum";
import { LayerTypeEnum } from "../enums/LayerTypeEnum";

export type LayerType = typeof LayerTypeEnum[keyof typeof LayerTypeEnum];

export type ConfigNeuralNetwork = {
	layers: {
		type: LayerType,
		perceptrons: number,
	}[],
	learning_rate: number,
}

export type ChartData = {
	epoch: number,
	error: number | null,
}[];

export type ClassEnumValue = typeof ClassEnum[keyof typeof ClassEnum];

export type RecordClassEnum = Record<ClassEnumValue, number>;
