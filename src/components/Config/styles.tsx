import styled from "styled-components";

export const NumberContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	gap: 3px;
	max-width: 135px;
	
	input {
		text-align: center
	};
`;

export const PerceptronsSelectorContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	&::before, &::after {
		content: "";
		display: block;
		width: 90px;
	}
`;
