import { MouseEvent, ReactNode } from "react";
import { Button, ButtonTypeMap } from "@mui/material";
import { styled } from "@mui/system";

interface SButtonProps {
	variant: ButtonTypeMap['props']["variant"],
	onClick?: (event: MouseEvent<HTMLElement>) => void,
	disabled?: boolean,
	children: ReactNode,
	style?: Record<string, string>,
}

const StyledButton = styled(Button) (({ variant }) => ({
	fontFamily: 'inherit',
	fontSize: '1rem',
	fontWeight: '400',
	lineHeight: variant === 'contained' ? '40px' : '38px',
	color: variant === 'contained' ? '#fff' : '#558aab',
	borderRadius: 0,
	padding: '0 14px',
	height: '40px',
	minWidth: '40px',
	borderColor: '#558aab',
	backgroundColor: variant === 'contained' ? '#558aab' : 'initial',
	'&:hover': {
		color: variant === 'contained' ? '#fff' : '#4b7b99',
		backgroundColor: variant === 'contained' ? '#4b7b99' : 'initial',
		borderColor: '#4b7b99',
		boxShadow: 'none',
	},
}));

export function SButton({variant, onClick, disabled, children, ...props}: SButtonProps) {
	return (
		<StyledButton variant={variant} onClick={onClick} disabled={disabled} {...props}>
			{children}
		</StyledButton>
	);
}
