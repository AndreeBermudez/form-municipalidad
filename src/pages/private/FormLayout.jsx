import { Header } from './components/Header';
import { Steps } from './components/Steps/Steps';

export const FormLayout = ({ children }) => {
	return (
		<section className='flex flex-col w-full h-full rounded-lg shadow-md bg-white '>
			<Header />
			<div className='px-8 py-6 flex flex-col gap-y-3'>
				<Steps>{children}</Steps>
			</div>
		</section>
	);
};
