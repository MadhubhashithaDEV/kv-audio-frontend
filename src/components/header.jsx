import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";


export default function Header() {
	const [navPanelOpen, setNavPanelOpen] = useState(false);
  const token = localStorage.getItem("token")
	return (
		<header className="w-full  h-[70px] shadow-xl flex justify-center items-center relative bg-accent text-black">
			<img
				src="/logo.png"
				alt="logo"
				className="w-[60px] h-[60px] object-cover border-[3px] absolute left-1 rounded-full"
			/>
			<div className="hidden w-[450px]  md:flex justify-evenly items-center">
				<Link to="/" className="hidden md:block text-[22px]  m-1">
					Home
				</Link>
				<Link to="/contact" className="hidden md:block text-[22px]  m-1">
					contact
				</Link>
				<Link to="/gallery" className="hidden md:block text-[22px]  m-1">
					gallery
				</Link>
				{/* items */}
				<Link to="/items" className="hidden md:block text-[22px]  m-1">
					Items
				</Link>
				<Link
					to="/booking"
					className="hidden md:block text-[22px] font-bold m-1 absolute right-24"
				>
					<FaCartShopping />
				</Link>
			</div>

		</header>
	);
}