import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClassEnum, getClassEnumDefinitions } from "../../enums/ClassEnum";
import { useNeuralNetwork } from "../../hooks/useNeuralNetwork"
import { SButton } from "../Form/SButton";
import { CharContainer, CharSpacer, ConfusionMatrixTable, VerticalChar, VerticalContainer, VerticalTh } from "./styles";

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

			{ !!confusionMatrix && (
				<div className="table-responsive">
					<ConfusionMatrixTable className="table table-bordered table-striped table-sm">
						<tbody>
							{ confusionMatrix.map((row, indexRow) => {
								return (
									<>
										{ indexRow === 0 && (
											<tr>
												<td>&nbsp;</td>
												{ [...new Array(confusionMatrix[0].length)].map((_, indexCol) => {
													return (
														<VerticalTh key={`c${indexCol}`} className="text-muted">
															<VerticalContainer>
															{ getClassEnumDefinitions()[(indexCol + 1) as typeof ClassEnum[keyof typeof ClassEnum]].split("").reverse().map((letter) => {
																return 	(
																	<CharSpacer>
																		<CharContainer>
																			<VerticalChar>
																				{ letter }
																			</VerticalChar>
																		</CharContainer>
																	</CharSpacer>
																);
															}) }
															</VerticalContainer>
														</VerticalTh>
													)
												}) }
											</tr>
											)
										}

										<tr key={`l${indexRow}`}>
											<th className="text-end text-muted">{ getClassEnumDefinitions()[(indexRow + 1) as typeof ClassEnum[keyof typeof ClassEnum]] }</th>

											{ row.map((col, indexCol) => {
												return (
													<td key={`l${indexCol}`} className="text-center">{ col }</td>
												);
											}) }
										</tr>
									</>
								)
							}) }
						</tbody>
					</ConfusionMatrixTable>
				</div>
			) }
		</div>
	);
}
