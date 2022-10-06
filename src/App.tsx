import { Network } from "./components/Network";
import { GlobalStyle } from "./styles/global";

export function App() {
	return (
		<>
			<GlobalStyle />
			<div className="App">
				<Network />
			</div>
		</>
	);
}
