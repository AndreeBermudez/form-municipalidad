import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "./components/RoutesWithNotFound";

export const PrivateRouter = () => {
	return (
		<RoutesWithNotFound>
			<Route path='/' element={<div>Formulario principal</div>} />
			<Route path='/view' element={<div>Vista General</div>} />
		</RoutesWithNotFound>
	);
};
