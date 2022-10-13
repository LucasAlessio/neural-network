import styled from "styled-components";

export const NetworkContainer = styled.div`
	display: table;
	width: 100%;
	table-layout: fixed;
`;

export const LayerContainer = styled.div`
	width: 50px;
	display: table-cell;
	vertical-align: middle;
	padding: 5px;
	
	& + & {
		margin-left: 150px;
	}

`;

export const WeightsContainer = styled.div`
	display: table-cell;
	vertical-align: middle;

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
			display: table;
			width: 100%;
			table-layout: fixed;
			margin: 6px 0;

			span {
				display: table-cell;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				&:last-child {
					width: 18px;
				}
			}
		}
	}
`;

export const PerceptronContainer = styled.div`
	color: #558aab;
	display: flex;
	margin: 12px 0;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	&.active {
		position: relative;
		color: #4b7b99;

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
