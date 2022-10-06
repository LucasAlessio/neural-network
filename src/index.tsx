import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { NeuralNetworkProvider } from './hooks/useNeuralNetwork';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<NeuralNetworkProvider>
			<App />
		</NeuralNetworkProvider>
	</React.StrictMode>
);
