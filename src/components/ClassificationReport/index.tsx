import { ClassEnum, getClassEnumDefinitions } from "../../enums/ClassEnum";
import { useNeuralNetwork } from "../../hooks/useNeuralNetwork"

export function ClassificationReport() {
	const { confusionMatrix } = useNeuralNetwork();

	const recall: Record<typeof ClassEnum[keyof typeof ClassEnum], number> = {
		[ClassEnum.BRICKFACE]: 0,
		[ClassEnum.SKY]: 0,
		[ClassEnum.FOLIAGE]: 0,
		[ClassEnum.CEMENT]: 0,
		[ClassEnum.WINDOW]: 0,
		[ClassEnum.PATH]: 0,
		[ClassEnum.GRASS]: 0,
	}

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

	if (confusionMatrix[0]) {
		for (let i = 0; i < confusionMatrix.length; i++) {
			for (let j = 0; j < confusionMatrix.length; j++) {
				recall[(j + 1) as (typeof ClassEnum[keyof typeof ClassEnum])] += confusionMatrix[i][j];
			}
		}
	}

	return (
		<>
			{ confusionMatrix.length > 0 && (
				<>
					<table className="table table-bordered table-striped table-sm">
						<tbody>
							<tr>
								<th className="text-muted">Accuracy</th>
								<td className="text-end">{ (classified / (total || 1) * 100).toFixed(2) }%</td>
							</tr>
						</tbody>
					</table>
				
					<table className="table table-bordered table-striped table-sm">
						<thead>
							<tr>
								<th className="text-muted">Class</th>
								<th className="text-end text-muted">Recall</th>
							</tr>
						</thead>
						<tbody>
							{ Object.entries(recall).map(([key, value]) => {
								return (
									<tr>
										<td>{ getClassEnumDefinitions()[Number(key) as (typeof ClassEnum[keyof typeof ClassEnum])] }</td>
										<td className="text-end">{ (confusionMatrix[Number(key) - 1][Number(key) - 1] / (value || 1) * 100).toFixed(2) }%</td>
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
