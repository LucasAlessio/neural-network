import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNeuralNetwork } from "../../hooks/useNeuralNetwork"
import { SButton } from "../Form/SButton";

export function ConfusionMatrix() {
	const { test, isTraining, confusionMatrix } = useNeuralNetwork();
	
	return (
		<div>
			<div className="mb-4">
				<SButton
					variant="contained"
					onClick={test}
					style={{ width: "100%" }}
					disabled={isTraining}>
						<FontAwesomeIcon icon={faMagnifyingGlassChart} /> Test
				</SButton>
			</div>

			{ !!confusionMatrix && <table className="table table-bordered table-striped table-sm">
				<tbody>
					{ confusionMatrix.map((linha, indexLinha) => {
						return (
							<tr key={`l${indexLinha}`}>
								{ linha.map((coluna, indexColuna) => {
									return (
										<td key={`l${indexColuna}`} className="text-center">{ coluna }</td>
									);
								}) }
							</tr>
						)
					}) }
				</tbody>
			</table> }
		</div>
	);
}
