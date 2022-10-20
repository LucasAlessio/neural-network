import { Fragment, useState } from "react";
import { useNeuralNetwork } from "../../hooks/useNeuralNetwork";
import { LayerContainer, NetworkContainer, PerceptronContainer, WeightsContainer } from "./styles";

import { faCircle as faCircleSolid } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WeightsList } from "./WeightsList";

export type WeightsListProps = {
	layer: number,
	perceptron: number
} | {
	layer: null,
	perceptron: null
};

export function Network() {
	const { config, viewWeights } = useNeuralNetwork();
	const [activePerceptron, setActive] = useState<[null, null] | [number, number]>([null, null]);

	function handleViewWeights(isActivePerceptron: boolean, indexLayer: number, indexPerceptron: number) {
		if (isActivePerceptron) {
			setActive([null, null]);
			viewWeights([null, null]);
		} else {
			setActive([indexLayer, indexPerceptron]);
			viewWeights([indexLayer, indexPerceptron]);
		}
	}

	return (
		<>
			<NetworkContainer>
				{ config.layers.map((layer, indexLayer) => {
					return (
						<Fragment key={indexLayer}>
							<LayerContainer>
								{ [...new Array(layer.perceptrons)].map((perceptron, indexPerceptron) => {
									const isActive = JSON.stringify([indexLayer, indexPerceptron]) === JSON.stringify(activePerceptron);

									return (
										<PerceptronContainer
											key={indexPerceptron}
											className={ isActive ? 'active' : '' } >
											
											<FontAwesomeIcon
												icon={isActive ? faCircleSolid : faCircle}
												size="2x"
												onClick={ () => indexLayer < config.layers.length - 1 && handleViewWeights(isActive, indexLayer, indexPerceptron) } />
											
										</PerceptronContainer>
									);
								}) }
							</LayerContainer>
							{ indexLayer < config.layers.length - 1 && <WeightsContainer>
								{ activePerceptron[0] === indexLayer && <WeightsList layer={activePerceptron[0]} perceptron={activePerceptron[1]} />}
							</WeightsContainer> }
						</Fragment>
					);
				}) }
			</NetworkContainer>
		</>
	);
}
