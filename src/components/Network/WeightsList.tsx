import { useNeuralNetwork } from "../../hooks/useNeuralNetwork";
import { faRightLong, faWeightHanging } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WeightsListProps } from "./index";

export function WeightsList({ layer, perceptron }: WeightsListProps) {
	const { weights } = useNeuralNetwork();

	if (layer === null || perceptron === null) {
		return <></>;
	}

	return <ul>
		{weights.map((weight, index) => {
			return (
				<li key={index}>
					<span><FontAwesomeIcon icon={faWeightHanging} /> {weight}</span>
					<span><FontAwesomeIcon icon={faRightLong} /></span>
				</li>
			);
		})}

	</ul>;
}
