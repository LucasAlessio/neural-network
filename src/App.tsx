import { Page } from "./components/Page";
import { GlobalStyle } from "./styles/global";

import "bootstrap/dist/css/bootstrap.min.css";

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
