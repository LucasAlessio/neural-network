import { ClassEnum } from "../../enums/ClassEnum";
import { useNeuralNetwork } from "../../hooks/useNeuralNetwork"

export function ClassificationReport() {
	const { confusionMatrix } = useNeuralNetwork();

	// const recall: Record<typeof ClassEnum[keyof typeof ClassEnum], number> = {
	// 	[ClassEnum.BRICKFACE]: 0,
	// 	[ClassEnum.SKY]: 0,
	// 	[ClassEnum.FOLIAGE]: 0,
	// 	[ClassEnum.CEMENT]: 0,
	// 	[ClassEnum.WINDOW]: 0,
	// 	[ClassEnum.PATH]: 0,
	// 	[ClassEnum.GRASS]: 0,
	// }

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

	// for (let i = 0; i < confusionMatrix.length; i++) {
	// 	for (let j = 0; j < confusionMatrix[i].length; j++) {
	// 		if (i === j) {
	// 			classified += confusionMatrix[j][i];
	// 		}

	// 		total += confusionMatrix[i][j];
	// 	}		
	// }

	return (
		<>
			<p className="text-muted text-end">Acurácia: { (classified / total * 100).toFixed(2) }%</p>
		</>
	);
}
