import { FormProvider, useForm, useFormContext } from "react-hook-form";

export type ConfigForm = {
	nMiddleLayers: number,
	middleLayers: {
		perceptrons: number,
	}[],
	learning_rate: number,
}

const defaultValuesForm: ConfigForm = {
	nMiddleLayers: 1,
	middleLayers: [
		{ perceptrons: 14 },
	],
	learning_rate: 0.3,
}

export function FormConfigProvider({ children }: { children: React.ReactNode }) {
	const form = useForm<ConfigForm>({ 
		defaultValues: defaultValuesForm,
	});

	return (
		<FormProvider {...form}>
			{ children }
		</FormProvider>
	);
}

export function useFormConfig() {
	return useFormContext<ConfigForm>();
}
