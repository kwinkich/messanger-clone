'use client';
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
	const [variatn, setVariant] = useState<Variant>('LOGIN');
	const [isLoaing, setIsLoading] = useState(false);

	const toggleVariant = useCallback(() => {
		if (variatn === 'LOGIN'){
			setVariant('REGISTER');
		} else {
			setVariant('LOGIN');
		}
	}, [variatn]);

	const {
		register,
		handleSubmit,
		formState: {
			errors
		}
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		if (variatn === 'REGISTER'){
			// Axios Register
		} 

		if (variatn === 'LOGIN'){
			// NextAuth Sigin
		}
	}

	const socialAction = (action: string) => {
		setIsLoading(true);

		// NextAuth Social Sigin In
	}

	return(
		<div className="
			mt-8
			sm:mx-auto
			sm:w-full
			sm:max-w-md
		">
			<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
				<form
					className="space-y-6"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Input id='email' label='Email' register={register} errors={errors}/>
				</form>
			</div>
		</div>
	);
}

export default AuthForm;
