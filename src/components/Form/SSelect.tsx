import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useId from "@mui/material/utils/useId";
import { forwardRef } from "react";
import styled from "styled-components";

interface SSelectProps {
	label: string,
	value?: string | number,
	options: Record<string | number, string>,
	error?: boolean,
	disabled?: boolean,
}

const StyledSelect = styled(FormControl) (({ theme }) => ({
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

	'.MuiFormControl-root': {
		margin: "0",
		borderRadius: 0,
	},
	
	'.MuiOutlinedInput-notchedOutline': {
		borderColor: "#83827d",
		borderRadius: 0
	},

	'&.Mui-focused fieldset': {
		borderColor: '#558aab',
	},

	'.MuiOutlinedInput-root': {
		fontSize: '1rem',
		fontFamily: 'inherit',
		
		'.MuiOutlinedInput-input': {
			height: '40px',
			lineHeight: '40px',
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

export const SSelect = forwardRef<HTMLInputElement, SSelectProps>(({ label, value, error, options, disabled, ...props }: SSelectProps, ref) => {
	const id = useId();

	return (
		<StyledSelect sx={{ m: 0, minWidth: 120 }} size="small" error={ error }>
			<InputLabel id={ `select${id}` }>{ label }</InputLabel>
			<Select
				ref={ ref }
				{ ...props }
				value={ value }
				labelId={ `select${id}` }
				label={ label } 
				disabled={ disabled } >
				{ Object.entries(options).map(([value, label], index) => (
					<MenuItem key={`key${id}${index}`} value={value }>{ label }</MenuItem>
				)) }
			</Select>
		</StyledSelect>
	)
});
