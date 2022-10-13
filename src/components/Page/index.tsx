import { padding } from "@mui/system";
import { Config } from "../Config";
import { Graph } from "../Graph";
import { Network } from "../Network";
import { BigCol, Cols, Container, SmallCol } from "./styles";

export function Page() {
	return (
		<Container>
			<Cols>
				<BigCol>
					<Config />
					<Network />
				</BigCol>
				<SmallCol>
					<Graph />

					<div style={{ marginTop: "50px" }}>
						<p>Matriz de confusão (em breve:)</p>
						<div style={{ border: "1px dotted #000", padding: "80% 0 0 0" }}></div>
					</div>
				</SmallCol>
			</Cols>
		</Container>
	);
}
