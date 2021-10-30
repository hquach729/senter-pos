import { FormSpy } from 'react-final-form';
import { Message } from 'semantic-ui-react';

export function Spy(): JSX.Element {
	return (
		<FormSpy
			subscription={{
				initialValues: true,
				values: true,
				submitting: true,
				pristine: true,
				valid: true,
				validating: true,
				error: true,
				errors: true,
			}}
			render={({
				initialValues,
				values,
				submitting,
				pristine,
				valid,
				validating,
				error,
				errors,
			}) => (
				<Message>
					<pre>
						{JSON.stringify(
							{
								initialValues,
								values,
								submitting,
								pristine,
								valid,
								validating,
								error,
								errors,
							},
							null,
							2
						)}
					</pre>
				</Message>
			)}
		/>
	);
}

export default Spy;
