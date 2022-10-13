import styled from 'styled-components';

export const Container = styled.div`
	max-width: 1080px;
	width: 95%;
	margin: 0 auto;
`;

export const Cols =  styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: baseline;
	margin: 0 -40px;
`;

export const BigCol = styled.div`
	width: 60%;
	padding: 0 40px;
`;

export const SmallCol = styled.div`
	width: 40%;
	padding: 0 40px;
`;
