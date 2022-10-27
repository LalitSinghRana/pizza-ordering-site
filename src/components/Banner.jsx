import Button from "./elements/Button";

export const Banner = () => {
    return (
			<div className='banner px-12 lg:px-64 relative flex justify-between'>
				<div className='banner-deescription p-3'>
					<h2 className='mb-6 text-4xl font-bold text-white'>
						When in doubt, Pizza
					</h2>
					<p className='font-semibold text-lg text-red-600 py-2'>
						Get Started Today!
					</p>
					<div className='btn-container'>
						<a href='/custom'>
							<Button>Order Now</Button>
						</a>
						<a
							href='#pizza-carousle'
							className='text-yellow-400 hover:text-yellow-500 font-bold text-decoration-line px-3'
						>
							See Menu
						</a>
					</div>
				</div>
				<div className='banner-image p-3'>
					<img
						src={require('../assets/images/pizza_banner.png')}
						alt='banner'
						className='max-h-full'
					/>
				</div>
			</div>
		);
}