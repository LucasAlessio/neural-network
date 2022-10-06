import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html {
		@media (max-width: 1080px) {
			font-size: 93.75%; // 15px
		}
		@media (max-width: 720) {
			font-size: 87.5%; // 14px
		}
	}

	body {
		-webkit-font-smoothing: antialiased;
	}

	body, input, textarea, button {
		font-family: 'Poppins', sans-serif;
		font-weight: 400;
	}
`;
