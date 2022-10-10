import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { LayerTypeEnum } from "../enums/LayerTypeEnum";

type ConfigForm = {
	layers: {
		type: typeof LayerTypeEnum[keyof typeof LayerTypeEnum],
		perceptrons: number,
	}[],
	learning_rate: number,
}

export function FormConfigProvider({ children }: { children: React.ReactNode }) {
	const form = useForm<ConfigForm>({ 
		defaultValues: {
			layers: [
				{ type: LayerTypeEnum.INPUT, perceptrons: 18 },
				{ type: LayerTypeEnum.HIDDEN, perceptrons: 14 },
				{ type: LayerTypeEnum.OUTPUT, perceptrons: 7 },
			],
			learning_rate: 0.02,
		},
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
