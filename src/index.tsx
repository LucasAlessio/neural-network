import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { FormConfigProvider } from './hooks/useFormConfig';
import { NeuralNetworkProvider } from './hooks/useNeuralNetwork';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<NeuralNetworkProvider>
			<FormConfigProvider>
				<App />
			</FormConfigProvider>
		</NeuralNetworkProvider>
	</React.StrictMode>
);
