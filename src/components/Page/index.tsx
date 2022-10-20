import { ClassificationReport } from "../ClassificationReport";
import { Config } from "../Config";
import { ConfusionMatrix } from "../ConfusionMatrix";
import { Graph } from "../Graph";
import { Network } from "../Network";
import { Container } from "./styles";

export function Page() {
	return (
		<Container>
			<div className="container container-fluid">
				<div className="row justify-content-md-center">
					<div className="col-12 col-lg-10">
						<div className="row">
							<div className="col-md-7">
								<div className="mb-3">
									<Config />
								</div>
								<div className="mb-3">
									<Network />
								</div>
							</div>
							<div className="col-12 col-md-4">
								<div className="mb-5">
									<Graph />
								</div>
								<div className="mb-5">
									<ConfusionMatrix />
									<ClassificationReport />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
