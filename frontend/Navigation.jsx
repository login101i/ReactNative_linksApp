import React from "react";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/auth";
import { LinkProvider } from "./context/link";
import { theme } from "./infrastructure/theme";
import { ScreensNav } from "./components/nav";

export function Navigation() {

	return (
		<ThemeProvider theme={theme}>
			<NavigationContainer independent={true}>
				<AuthProvider>
					<LinkProvider>
						<ScreensNav />
					</LinkProvider>
				</AuthProvider>
			</NavigationContainer>
		</ThemeProvider>
	);
}
