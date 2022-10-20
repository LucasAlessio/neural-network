import { LayerTypeEnum } from "../../enums/LayerTypeEnum";
import { ConfigForm, useFormConfig } from "../../hooks/useFormConfig"
import { useNeuralNetwork } from "../../hooks/useNeuralNetwork";
import { ConfigNeuralNetwork } from "../../types";
import { STextField } from "../Form/STextField";
import { SSlider } from "../Form/SSlider";
import { SButton } from "../Form/SButton";
import { Path } from "react-hook-form";
import { NumberContainer, PerceptronsSelectorContainer } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPause, faPlay, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { SSelect } from "../Form/SSelect";

const ConfigInputLayer = { type: LayerTypeEnum.INPUT, perceptrons: 18 };
const ConfigOutputLayer = { type: LayerTypeEnum.OUTPUT, perceptrons: 7 };

export function Config() {
	const { register, watch, getValues, setValue } = useFormConfig();
	const { config, setConfig, isTraining, start, pause } = useNeuralNetwork();

	
	const nLayers = Number(watch("nMiddleLayers", 1));

	const handleChangeLayers = () => {
		const nLayers = Number(getValues("nMiddleLayers"));

		const layers: ConfigNeuralNetwork["layers"] = [...Array(nLayers)].map((layer, index) => {
			return {
				type: LayerTypeEnum.HIDDEN,
				perceptrons: getValues(`middleLayers.${index}.perceptrons`) ?? 1,
			}
		});

		layers.unshift(ConfigInputLayer);
		layers.push(ConfigOutputLayer);

		setConfig({
			...config,
			layers,
		});
	}

	const handleChangePerceptrons = () => {
		const middleLayers = getValues("middleLayers");
		const nLayers = Number(getValues("nMiddleLayers"));

		const layers: ConfigNeuralNetwork["layers"] = (middleLayers?.map((layer, index) => {
			return {
				type: LayerTypeEnum.HIDDEN,
				...layer,
			}
		}) ?? []).slice(0, nLayers);

		layers.unshift(ConfigInputLayer);
		layers.push(ConfigOutputLayer);
		
		setConfig({
			...config,
			layers,
		});
	}

	const increaseValue = (ref: Path<ConfigForm>) => {
		const value = Number(getValues(ref));
		
		if (value === 20) return;

		setValue(ref, value + 1, {
			shouldDirty: true,
			shouldTouch: true,
		});
		handleChangePerceptrons();
	}

	const decreaseValue = (ref: Path<ConfigForm>) => {
		const value = Number(getValues(ref));
		
		if (value === 1) return;

		setValue(ref, value - 1);
		handleChangePerceptrons();
	}

	return (
		<>
			<div className="row mb-5 row flex-row justify-content-between">
				<div className="col-6 col-sm-auto mb-4 mb-sm-0">
					<SButton variant={ isTraining ? "outlined" : "contained" } onClick={ () => isTraining ? pause() : start() }>
						{ isTraining ? (
							<>
								<FontAwesomeIcon icon={faPause} />&nbsp;Pause
							</>
						) : (
							<>
								<FontAwesomeIcon icon={faPlay} />&nbsp;Train
							</>
						) }
					</SButton>
				</div>
				
				<div className="col-6 col-sm-auto mb-4 mb-sm-0">
					<SSelect label="Learning rate" options={{
							"0.01": "0,01",
							"0.02": "0,02",
							"0.03": "0,03",
							"0.1": "0,1",
							"0.2": "0,2",
							"0.3": "0,3",
						}}
						{...register("learning_rate", { onChange() {
							setConfig({
								...config,
								learning_rate: Number(watch("learning_rate")),
							})
						} })}
						value={ getValues("learning_rate") }
						disabled={isTraining} />
				</div>
				
				<div className="col-12 col-sm-auto">
					<SSlider
						defaultValue={1}
						min={1}
						max={3}
						step={1}
						label="Hidden layers"
						disabled={isTraining}
						onChange={(event, newValue) => {
							setValue("nMiddleLayers", newValue as number);
							handleChangeLayers();
						}} />
				</div>
			</div>

			<PerceptronsSelectorContainer>
				{ [...Array(nLayers)].map((layer, index) => {
					return (
						<NumberContainer key={index}>
							<SButton
								variant="outlined"
								onClick={() => decreaseValue(`middleLayers.${index}.perceptrons`)}
								disabled={isTraining} >
								<FontAwesomeIcon icon={faMinusCircle} />
							</SButton>
							<STextField
								label={`L${index + 1}`}
								readonly
								{...register(`middleLayers.${index}.perceptrons`, {
									value: 1,
								}) } />
							<SButton
								variant="contained"
								onClick={() => increaseValue(`middleLayers.${index}.perceptrons`)} 
								disabled={isTraining} >
								<FontAwesomeIcon icon={faPlusCircle} />
							</SButton>
						</NumberContainer>
					);
				}) }
			</PerceptronsSelectorContainer>
		</>
	);
}
