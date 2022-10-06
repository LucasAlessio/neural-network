import styled from "styled-components";

export const NetworkContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

export const LayerContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	/* border: 1px solid red; */

	padding: 5px;
	/* border-radius: 40px; */

	& + & {
		margin-left: 150px;
	}
`;

export const WeightsContainer = styled.div`
	align-self: stretch;
	width: 300px;
	padding: 0;

	ul {
		display: flex;
		width: 100%;
		height: 100%;
		margin: 0;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;

		list-style: none;
		text-align: right;

		li {
			line-height: 2rem;
			margin: 5px 0;
		}
	}
`;

export const PerceptronContainer = styled.div`
	color: #ffc778;
	display: flex;
	margin: 5px;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	&.active {
		position: relative;
		color: #bfd1e4;

		/* &::before {
			content: " ";
			background-color: #fffa78;
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			box-shadow:  0 0 10px 5px #fffa78;
			border-radius: 100%;
			z-index: -1;
		} */
	}
`;
