import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import { ADMIN_API } from '../constants/constants';

const Admin = () => {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	const getCartData = async () => {
		const res = await fetch(ADMIN_API, {
			headers: {
				'x-access-token': token,
			},
		});

		const data = await res.json();
		console.log(data);
	};

	useEffect(() => {
		const myDecodedToken = decodeToken(token);

		if (!myDecodedToken || !myDecodedToken.isAdmin) {
			navigate('/login');
		} else {
			getCartData();
		}
	}, []);
  
	return (
		<div className='bg-white'>
			<div className='p-24 grid grid-cols-2'>
				<h2>Admin only</h2>
			</div>
		</div>
	);
};

export default Admin;
