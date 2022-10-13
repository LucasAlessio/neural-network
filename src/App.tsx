import { Page } from "./components/Page";
import { GlobalStyle } from "./styles/global";

export function App() {
	return (
		<>
			<GlobalStyle />
			<div className="App">
				<Page />
			</div>
		</>
	);
}
