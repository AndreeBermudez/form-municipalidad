import App from "./App";
import { AppRouter } from "./routes/AppRouter";

export const AppContainer = () => {
	return (
		<App>
			<AppRouter />
		</App>
	);
};
