import {ConfigProvider, theme} from "antd";
import React from "react";
import {Provider} from "react-redux";
import {store} from "@app/store";
import {BrowserRouter} from "react-router-dom";

export function Providers({children}: { children: React.ReactNode }) {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<ConfigProvider theme={{
					algorithm: theme.darkAlgorithm,
					token: {
						colorPrimary: '#00ff93',
					}
				}}>
					<BrowserRouter>
						{children}
					</BrowserRouter>
				</ConfigProvider>
			</Provider>
		</React.StrictMode>
	)
}