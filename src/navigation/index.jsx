import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../components/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Menu from '../pages/Menu';
import Cart from '../pages/Cart';
import PaymentSuccess from '../pages/PaymentSuccess';
import { useSelector } from 'react-redux';
import { cartProducts } from '../stores/cart/cartSlice';
import { Footer } from '../components/Footer';
import Admin from '../pages/Admin';
import Inventory from '../pages/Inventory';

const Navigation = () => {
	const productsInCart = useSelector(cartProducts);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<BrowserRouter>
			<Header cartCount={productsInCart ? productsInCart.length : 0} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
				<Route path='/register' element={<Register setIsLoggedIn={setIsLoggedIn}/>} />
				<Route path='/menu' element={<Menu />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/payment-success' element={<PaymentSuccess />} />
				<Route path='/admin' element={<Admin />} />
				<Route path='/inventory' element={<Inventory />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default Navigation;
