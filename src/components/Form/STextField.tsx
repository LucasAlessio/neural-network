import { InputAdornment, TextField } from "@mui/material"
import { forwardRef } from "react"
import styled from "styled-components";

interface STextFieldProps {
	label: string,
	fullWidth?: boolean,
	icon?: React.ReactNode,
	error?: boolean
	readonly?: boolean,
}

const StyledTextField = styled(TextField) (({ theme }) => ({
	'label': {
		fontFamily: 'inherit',
		fontSize: '1rem',
		color: '#83827d',
		transform: 'translate(14px, 10px) scale(1)',
	},
	'label.MuiInputLabel-shrink': {
		transform: 'translate(14px,-9px) scale(0.75)',
	},
	'label.Mui-focused': {
		color: '#558aab',

		'&.Mui-error': {
			color: '#d32f2f',
		}
	},
	'.MuiOutlinedInput-root': {
		fontSize: '1rem',
		fontFamily: 'inherit',

		'.MuiOutlinedInput-input': {
			height: '40px',
			padding: '0 14px',
		},
		'fieldset': {
			borderRadius: 0,
			borderColor: '#83827d',
			transition: 'none',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#558aab',

		},
		'&.Mui-error.Mui-focused fieldset': {
			'borderColor': "#d32f2f",
		}
	},
	'.MuiInputAdornment-root': {
		marginRight: '0px',
	},
	'.Mui-focused .MuiInputAdornment-root': {
		color: '#558aab',
	},
	'.Mui-error .MuiInputAdornment-root': {
		color: '#d32f2f',
	}
}));

export const STextField = forwardRef<HTMLInputElement, STextFieldProps>(({ label, fullWidth, icon, error, readonly, ...props }: STextFieldProps, ref) => {
	return (
		<StyledTextField
			ref={ref}
			{...props}
			label={label}
			fullWidth={fullWidth}
			error={error}
			InputProps={{
				readOnly: !!readonly,
				startAdornment: icon && (
					<InputAdornment position="start">
						{icon}
					</InputAdornment>
				),
			}} />
	);
});
