import { useMemo } from "react";
import { ClassEnum, getClassEnumDefinitions } from "../../enums/ClassEnum";
import { useNeuralNetwork } from "../../hooks/useNeuralNetwork"
import { ClassEnumValue, RecordClassEnum } from "../../types";

export function ClassificationReport() {
	const { confusionMatrix } = useNeuralNetwork();

	const accuracy = useMemo(() => calculateAccuracy(confusionMatrix), [confusionMatrix]);
	const recall = useMemo(() => getRecall(confusionMatrix), [confusionMatrix]);
	const precision = useMemo(() => getPrecision(confusionMatrix), [confusionMatrix]);
	const fScore = useMemo(() => getFScore(recall, precision), [recall, precision]);

	return (
		<>
			{ confusionMatrix.length > 0 && (
				<>
					<table className="table table-bordered table-striped table-sm">
						<tbody>
							<tr>
								<th className="text-muted">Accuracy</th>
								<td className="text-end">{ accuracy.toFixed(2) }%</td>
							</tr>
						</tbody>
					</table>
				
					<table className="table table-bordered table-striped table-sm">
						<thead>
							<tr>
								<th className="text-muted">Class</th>
								<th className="text-end text-muted" style={{ width: 0 }}>Recall</th>
								<th className="text-end text-muted" style={{ width: 0 }}>Precision</th>
								<th className="text-end text-muted" style={{ width: 0, whiteSpace: "nowrap" }}>F<sub>1</sub>-Score</th>
							</tr>
						</thead>
						<tbody>
							{ confusionMatrix.map((_, index) => {
								return (
									<tr key={index}>
										<td>{ getClassEnumDefinitions()[Number(index + 1) as ClassEnumValue] }</td>
										<td className="text-end">{ recall[Number(index + 1) as ClassEnumValue].toFixed(2) }%</td>
										<td className="text-end">{ precision[Number(index + 1) as ClassEnumValue].toFixed(2) }%</td>
										<td className="text-end">{ fScore[Number(index + 1) as ClassEnumValue].toFixed(2) }%</td>
									</tr>
								);
							}) }
						</tbody>
					</table>
				</>
			) }
		</>
	);
}

function calculateAccuracy(confusionMatrix: number[][]) {
	let classified = 0;
	let total = 0;

	for (let i = 0; i < confusionMatrix.length; i++) {
		for (let j = 0; j < confusionMatrix[i].length; j++) {
			if (i === j) {
				classified += confusionMatrix[i][j];
			}

			total += confusionMatrix[i][j];
		}
	}

	return classified / (total || 1) * 100;
}

function getRecall(confusionMatrix: number[][]) {
	const recall: RecordClassEnum = {
		[ClassEnum.BRICKFACE]: 0,
		[ClassEnum.SKY]: 0,
		[ClassEnum.FOLIAGE]: 0,
		[ClassEnum.CEMENT]: 0,
		[ClassEnum.WINDOW]: 0,
		[ClassEnum.PATH]: 0,
		[ClassEnum.GRASS]: 0,
	}

	if (confusionMatrix.length && confusionMatrix[0].length) {
		for (let i = 0; i < confusionMatrix.length; i++) {
			for (let j = 0; j < confusionMatrix.length; j++) {
				recall[(j + 1) as ClassEnumValue] += confusionMatrix[i][j];
			}
		}

		Object.entries(recall).forEach(([key, value], index) => {
			recall[Number(key) as ClassEnumValue] = confusionMatrix[index][index] / (recall[Number(key) as ClassEnumValue] || 1) * 100;
		});
	}

	return recall;
}

function getPrecision(confusionMatrix: number[][]) {
	const precision: RecordClassEnum = {
		[ClassEnum.BRICKFACE]: 0,
		[ClassEnum.SKY]: 0,
		[ClassEnum.FOLIAGE]: 0,
		[ClassEnum.CEMENT]: 0,
		[ClassEnum.WINDOW]: 0,
		[ClassEnum.PATH]: 0,
		[ClassEnum.GRASS]: 0,
	}

	for (let i = 0; i < confusionMatrix.length; i++) {
		const summation = confusionMatrix[i].reduce((acc, value) => acc + value, 0);

		precision[(i + 1) as ClassEnumValue] = confusionMatrix[i][i] / summation * 100;
	}

	return precision;
}

function getFScore(recall: RecordClassEnum, precision: RecordClassEnum) {
	const fScore: RecordClassEnum = {
		[ClassEnum.BRICKFACE]: 0,
		[ClassEnum.SKY]: 0,
		[ClassEnum.FOLIAGE]: 0,
		[ClassEnum.CEMENT]: 0,
		[ClassEnum.WINDOW]: 0,
		[ClassEnum.PATH]: 0,
		[ClassEnum.GRASS]: 0,
	}

	Object.values(ClassEnum).forEach((key) => {
		const recalValue = recall[Number(key) as ClassEnumValue];
		const precisionValue = precision[Number(key) as ClassEnumValue];

		fScore[Number(key) as ClassEnumValue] = 2 * recalValue * precisionValue / (recalValue + precisionValue || 1);
	});

	return fScore;
}
