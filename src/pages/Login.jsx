import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/elements/Button';
import axios from 'axios';
import { app } from '../firebase-config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { USER_LOGIN } from '../constants/constants';

const Login = () => {
	let navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const [loading, setLoading] = useState(false);

	const onSubmit = (data) => {
		// setLoading(true);
		// const authentication = getAuth();
		// let uid = '';
		// signInWithEmailAndPassword(authentication, data.email, data.password)
		//     .then((response) => {
		//         uid = response.user.uid;
		//         sessionStorage.setItem('User Id', uid);
		//         sessionStorage.setItem('Auth token', response._tokenResponse.refreshToken)
		//         window.dispatchEvent(new Event("storage"))
		//         setLoading(false);
		//         toast.success('Successful Login!🎉', {
		//             position: "top-right",
		//             autoClose: 5000,
		//             hideProgressBar: false,
		//             closeOnClick: true,
		//             pauseOnHover: true,
		//             draggable: true,
		//             progress: undefined,
		//             theme: 'dark'
		//             });
		//         navigate('/');
		//     })
		//     .catch((error) => {
		//         if (error.code === 'auth/wrong-password') {
		//             toast.error('Wrong Password')
		//         }
		//         if (error.code === 'auth/user-not-found') {
		//             toast.error('Email not found, please registe')
		//         }
		//         setLoading(false);
		//     })
	};

	const handleClick = async () => {
		const user = {
			email: document.getElementById('email').value,
			password: document.getElementById('password').value,
		};

		const res = await fetch(USER_LOGIN, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const data = await res.json();
		console.log(data);

		if (data.token) {
			localStorage.setItem('token', data.token);
			alert('Login successful');
			// navigate('/');
			// window.location.href = '/'
		} else {
			alert('Please check your username and password');
		}
	};
	return (
		<div className='h-screen bg-black flex  items-center justify-center'>
			<div className='rounded-lg max-w-md w-full flex flex-col items-center justify-center relative'>
				<div className='absolute inset-0 transition duration-300 animate-pink blur  gradient bg-gradient-to-tr from-rose-500 to-yellow-500'></div>
				<div className='p-10 rounded-xl z-10 w-full h-full bg-black'>
					<h5 className='text-3xl'>Login</h5>
					<form className='w-full space-y-6' onSubmit={handleSubmit(onSubmit)}>
						<div>
							<label
								htmlFor='email'
								className='block text-lg font-medium text-gray-200'
							>
								Email
							</label>
							<input
								{...register('email')}
								id='email'
								type='email'
								className='block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200'
							/>
						</div>
						<div>
							<label
								htmlFor='password'
								className='block text-lg font-medium text-gray-200'
							>
								Password
							</label>
							<input
								{...register('password')}
								id='password'
								type='password'
								className='block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200'
							/>
						</div>
						<Button size='large' onClick={() => handleClick()}>
							{loading ? 'loading' : 'Register'}
						</Button>
					</form>
					<ToastContainer />
				</div>
			</div>
		</div>
	);
};

export default Login;
