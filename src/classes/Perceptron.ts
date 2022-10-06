import { LayerTypeEnum } from "../enums/LayerTypeEnum";

type PerceptronConstructAttrs = {
	type: typeof LayerTypeEnum[keyof typeof LayerTypeEnum],
	input?: number;
	expectedOutput?: 0 | 1,
}

export class Perceptron {
	private _type: typeof LayerTypeEnum[keyof typeof LayerTypeEnum];
	private _input: number;
	private _expectedOutput?: 0 | 1;
	private _error: number;
	private _output?: number;

	// Array de pesos das conexoes com a camada anterior
	private _weights: number[];

	constructor({ type, input = 0, expectedOutput }: PerceptronConstructAttrs) {
		this._type = type;
		this._input = input;
		this._expectedOutput = expectedOutput;
		this._error = 0;
		this._weights = [];
	}

	set input(input: number) {
		if (this._type === LayerTypeEnum.INPUT) {
			this._input = input;
		} else {
			this._input += input;
		}
	}

	set weights(weights: number[]) {
		this._weights = weights;
	}

	get weights() {
		return this._weights;
	}

	set expectedOutput(expectedOutput: 0 | 1) {
		this._expectedOutput = expectedOutput;
	}

	get expectedOutput() {
		return this._expectedOutput as (0 | 1);
	}

	get output() {
		if (this._type === LayerTypeEnum.INPUT) {
			this._output = this._input;
			return this._input;
		}

		this._output = 1 / (1 + Math.exp(this._input * -1));
		return 1 / (1 + Math.exp(this._input * -1));
	}

	set error(error: number) {
		this._error = error;
	}

	get error() {
		return this._error;
	}

	clearInput() {
		this._input = 0;
	}
}
