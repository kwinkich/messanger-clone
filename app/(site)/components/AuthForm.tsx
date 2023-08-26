'use client';
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { signIn, useSession } from "next-auth/react";

import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
	const session = useSession();
	const router = useRouter();
	const [variatn, setVariant] = useState<Variant>('LOGIN');
	const [isLoaing, setIsLoading] = useState(false);

	useEffect(() => {
		if (session?.status === 'authenticated') {
			router.push('/users')
		}
	}, [session?.status, router]);

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
			axios.post('/api/register', data)
			.then(() => signIn('credentials', data))
			.catch(() => toast.error('Something went wrong!'))
			.finally(() => setIsLoading(false))
		} 

		if (variatn === 'LOGIN'){
			signIn('credentials', {
				...data,
				redirect: false
			})
			.then((callback) => {
				if (callback?.error) {
					toast.error('Ivalid credentials');
				}

				if (callback?.ok && !callback?.error) {
					toast.success('Logged in success!');
					router.push('/users')
				}
			})
			.finally(() => setIsLoading(false));
		}
	}

	const socialAction = (action: string) => {
		setIsLoading(true);

		signIn(action, { redirect: false })
		.then((callback) => {
			if (callback?.error) {
				toast.error('Invalid Credentials');
			}

			if (callback?.ok && !callback?.error) {
				toast.success('Loggeg in!');
			}
		})
		.finally(() => setIsLoading(false));
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
					{variatn === 'REGISTER' && (
						<Input 
							id='name' 
							label='Name' 
							register={register} 
							errors={errors} 
							disabled={isLoaing}
						/>
					)}
					<Input 
						id='email' 
						label='Email address' 
						type='email' 
						register={register} 
						errors={errors}
						disabled={isLoaing}
					/>
					<Input 
						id='password' 
						label='Password' 
						type='password' 
						register={register} 
						errors={errors}
						disabled={isLoaing}
					/>
					<div>
						<Button disabled={isLoaing} fullWidth type="submit">{variatn === 'LOGIN' ? 'Sign in' : 'Register'}</Button>
					</div>
				</form>

				<div className="mt-6">
					<div className="relative">
						<div className="
							absolute
							inset-0
							flex
							items-center
						">
							<div className="
								w-full 
								border-t 
							border-gray-300
							"/>
						</div>
						<div className="
								relative 
								flex 
								justify-center 
								text-sm
							">
							<span className="
								bg-white px-2 
								text-gray-500
								">
									Or continue with
								</span>
						</div>
					</div>

					<div className="mt-6 flex gap-2">
						<AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')}/>
						<AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')}/>
					</div>
				</div>

				<div className="
					flex
					gap-2
					justify-center
					text-sm
					mt-6
					px-2
					text-gray-500
				">
					<div>
						{variatn === 'LOGIN' ? 'New to Messenger?' : 'Already have an account'}
					</div>
					<div onClick={toggleVariant} className="underline cursor-pointer">
						{variatn === 'LOGIN' ? 'Create an account' : 'Login'}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuthForm;
