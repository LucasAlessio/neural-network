import { Fragment, useState } from "react";
import { useNeuralNetwork } from "../../hooks/useNeuralNetwork";
import { LayerContainer, NetworkContainer, PerceptronContainer, WeightsContainer } from "./styles";

import { faAtom, faRightLong, faWeightHanging } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type WeightsListProps = {
	layer: number,
	perceptron: number
} | {
	layer: null,
	perceptron: null
};

export function Network() {
	const { network, isTraining, start, pause, setViewNetwork } = useNeuralNetwork();
	const [activePerceptron, setActive] = useState<[null, null] | [number, number]>([null, null]);
	const [showNetwork, setShowNetwork] = useState(false);

	function handleViewWeights(isActivePerceptron: boolean, indexLayer: number, indexPerceptron: number) {
		if (isActivePerceptron) {
			setActive([null, null]);
			setViewNetwork(false);
		} else {
			setActive([indexLayer, indexPerceptron]);
			setViewNetwork(true);
		}
	}

	return (
		<>
			<NetworkContainer>
				{ network.map((layer, indexLayer) => {
					return (
						<Fragment key={indexLayer}>
							<LayerContainer>
								{ layer.map((perceptron, indexPerceptron) => {
									const isActive = JSON.stringify([indexLayer, indexPerceptron]) === JSON.stringify(activePerceptron);

									return (
										<PerceptronContainer
											key={indexPerceptron}
											className={ isActive ? 'active' : '' } >
											<FontAwesomeIcon
												icon={faAtom}
												size="2x"
												onClick={ () => indexLayer < network.length - 1 && handleViewWeights(isActive, indexLayer, indexPerceptron) } />
										</PerceptronContainer>
									);
								}) }
							</LayerContainer>
							{ indexLayer < network.length - 1 && <WeightsContainer>
								{ activePerceptron[0] === indexLayer && <WeightsList layer={activePerceptron[0]} perceptron={activePerceptron[1]} />}
							</WeightsContainer> }
						</Fragment>
					);
				}) }
			</NetworkContainer>

			<div>
				<button onClick={ () => isTraining ? pause() : start() }>{ isTraining ? 'Pausar' : 'Treinar' }</button>
			</div>

			<div>
				<button onClick={() => { setShowNetwork(old => !old); if (showNetwork) console.log(network); } }> { showNetwork ? 'mostrar' : 'ocultar' } </button>
			</div>
		</>
	);
}

function WeightsList({ layer, perceptron }: WeightsListProps) {
	const { network } = useNeuralNetwork();

	if (layer === null || perceptron === null) {
		return <></>;
	}

	return <ul>
		{ network[layer][perceptron].weights.map((weight, index) => {
			return (
				<li key={ index }>
					<span><FontAwesomeIcon icon={faWeightHanging} /> { weight }</span>
					<span><FontAwesomeIcon icon={faRightLong} /></span>
				</li>
			);
		}) }
		
	</ul>;
}
