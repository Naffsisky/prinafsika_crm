import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePage, useForm, router } from "@inertiajs/react";

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = usePage().props.auth.user;

    const { post } = useForm();

    const logout = () => {
        post(route("logout"));
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (targetId) => {
        const currentPath = window.location.pathname;

        if (currentPath !== "/") {
            router.visit(`/#${targetId}`, {
                onSuccess: () => {},
            });
        } else {
            const el = document.getElementById(targetId);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "lg:bg-white/50 lg:backdrop-blur-md lg:shadow-md bg-white"
                    : "bg-white"
            }`}
        >
            <div className="max-w-full mx-auto px-6 md:px-24 py-4 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-purple-600">
                    Smart ISP
                </a>

                {/* Menu untuk Desktop */}
                <ul className="hidden lg:flex space-x-6 text-gray-700 font-medium">
                    <li className="hover:text-purple-600 hover:font-bold cursor-pointer">
                        <a href="/">Home</a>
                    </li>
                    <li className="hover:text-purple-600 hover:font-bold cursor-pointer">
                        <button onClick={() => scrollToSection("about")}>
                            About Us
                        </button>
                    </li>
                    <li className="hover:text-purple-600 hover:font-bold cursor-pointer">
                        <button onClick={() => scrollToSection("products")}>
                            Products
                        </button>
                    </li>
                </ul>

                {/* Desktop Mode */}
                <div className="hidden lg:flex space-x-4">
                    {user ? (
                        <>
                            <a
                                href={
                                    user.role === "admin"
                                        ? "/dashboard"
                                        : "/user/dashboard"
                                }
                            >
                                <button className="px-4 py-2 border border-purple-600 bg-purple-600 text-white rounded-3xl hover:bg-purple-700">
                                    Dashboard
                                </button>
                            </a>
                            <button
                                onClick={logout}
                                className="px-4 py-2 border border-purple-600 bg-purple-600 text-white rounded-3xl hover:bg-purple-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/register">
                                <button className="px-4 py-2 border border-purple-600 bg-purple-600 text-white rounded-3xl hover:bg-purple-700">
                                    Register
                                </button>
                            </a>
                            <a href="/login">
                                <button className="px-4 py-2 border border-purple-600 bg-purple-600 text-white rounded-3xl hover:bg-purple-700">
                                    Login
                                </button>
                            </a>
                        </>
                    )}
                </div>

                {/* Hamburger Menu Button (Mobile) */}
                <button
                    className="lg:hidden text-purple-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden flex flex-col items-center absolute w-full bg-white shadow-md transition-all duration-300 ${
                    isMenuOpen
                        ? "top-[60px] opacity-100"
                        : "top-[-300px] opacity-0 pointer-events-none"
                }`}
            >
                <ul className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
                    <li className="hover:text-purple-600 hover:font-bold cursor-pointer">
                        <a href="/">Home</a>
                    </li>
                    <li className="hover:text-purple-600 hover:font-bold cursor-pointer">
                        <a href="/#about"></a>About Us
                    </li>
                    <li className="hover:text-purple-600 hover:font-bold cursor-pointer">
                        <a href="/#products">Products</a>
                    </li>
                </ul>

                {/* Button (Mobile) */}
                <div className="flex flex-col items-center space-y-4 pb-6">
                    {user ? (
                        <a
                            href={
                                user.role === "admin"
                                    ? "/dashboard"
                                    : "/user/dashboard"
                            }
                        >
                            <button className="px-6 py-2 border border-purple-600 bg-purple-600 text-white rounded-2xl hover:bg-purple-700">
                                Dashboard
                            </button>
                        </a>
                    ) : (
                        <>
                            <a href="/login">
                                <button className="px-6 py-2 border border-purple-600 bg-purple-600 text-white rounded-2xl hover:bg-purple-700">
                                    Login
                                </button>
                            </a>
                            <a href="/register">
                                <button className="px-6 py-2 border border-purple-600 bg-purple-600 text-white rounded-2xl hover:bg-purple-700">
                                    Register
                                </button>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
