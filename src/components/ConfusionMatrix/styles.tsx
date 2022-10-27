import styled from "styled-components";

export const ConfusionMatrixTable = styled.table`
	th {
		font-size: 0.65rem;
	}
	vertical-align: middle;
`;

export const VerticalTh = styled.th`
	vertical-align: bottom;
	min-width: 2.06725rem;

	.container3 {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 0;
		padding-bottom: 100%;
	}
`;

export const VerticalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: unset;
`;

export const CharSpacer = styled.span`
	display: flex;
	width: auto;
	margin-bottom: 1px;	
`;

export const CharContainer = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 0;
	padding-bottom: 100%;
`;

export const VerticalChar = styled.span`
	transform: rotate(-90deg) translateX(-50%);
	transform-origin: center center;
`;
