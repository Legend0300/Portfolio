import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from './footer';
import "./styles.css"

const Nav = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="bg-gray-900 text-white p-4 transition-colors duration-300">
            <nav className="flex justify-between items-center">
                <div className="hidden lg:flex space-x-4">
                    {/* Styled Logo */}
                    <div className="flex items-center" id='nav-buttons'>
                        <NavLink
                            to="/"
                            end
                            className=" nav-link text-teal-400 hover:bg-teal-300 hover:text-gray-900 transition duration-300 ease-in-out rounded-full p-3"
                            exact
                        >
                            Home
                        </NavLink>
                    </div>
                    <NavLink
                        to="skills"
                        className=" nav-link text-teal-400 hover:bg-teal-300 hover:text-gray-900 transition duration-300 ease-in-out rounded-full p-3"
                    >
                        Skills
                    </NavLink>
                    <NavLink
                        to="projects"
                        className=" nav-link text-teal-400 hover:bg-teal-300 hover:text-gray-900 transition duration-300 ease-in-out rounded-full p-3"
                    >
                        Projects
                    </NavLink>
                    <NavLink
                        to="certifications"
                        className=" nav-link text-teal-400 hover:bg-teal-300 hover:text-gray-900 transition duration-300 ease-in-out rounded-full p-3"
                    >
                        Certifications
                    </NavLink>
                    <NavLink
                        to="contact"
                        className=" nav-link text-teal-400 hover:bg-teal-300 hover:text-gray-900 transition duration-300 ease-in-out rounded-full p-3"
                    >
                        Contact
                    </NavLink>
                    {/* Download CV Button */}
                    <NavLink
                        to="https://c5y18s9mdhikovk1.public.blob.vercel-storage.com/CV%20(1).PDF-MNdPfMJQ2gDQuubEKeDGqTBF2r13Gx.pdf"
                        download="ML_CV.pdf"
                        className=" nav-link text-teal-400 hover:bg-teal-300 hover:text-gray-900 transition duration-300 ease-in-out rounded-full p-3"
                        target="_blank"  // Open link in a new tab/window
                        rel="noopener noreferrer"  // Recommended for security when using target="_blank"
                    >
                        Download CV
                    </NavLink>

                </div>
                {/* Mobile Menu Toggle Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden flex items-center text-white focus:outline-none transition duration-300 ease-in-out"
                >
                    <div className="w-6 h-6">
                        <div className="bg-white h-1 w-full mb-1 rounded-full"></div>
                        <div className="bg-white h-1 w-full mb-1 rounded-full"></div>
                        <div className="bg-white h-1 w-full rounded-full"></div>
                    </div>
                </button>
            </nav>

            {isMobileMenuOpen && (
                <div className="lg:hidden mt-2 transition-opacity duration-300 animate-fadeIn">
                    {/* Styled Logo */}
                    <div className="flex items-center justify-center mb-4">
                        {/* Your logo or text here */}
                    </div>
                    <NavLink
                        to="/"
                        onClick={toggleMobileMenu}
                        className="text-teal-400 block px-4 py-2  hover:bg-teal-300 hover:text-gray-900 transition duration-300 ease-in-out"
                        exact
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="skills"
                        onClick={toggleMobileMenu}
                        className="text-teal-400 block px-4 py-2  hover:bg-teal-300 hover:text-gray-900 transition duration-300 ease-in-out"
                    >
                        Skills
                    </NavLink>
                    <NavLink
                        to="projects"
                        onClick={toggleMobileMenu}
                        className="text-teal-400 block px-4 py-2  hover:bg-teal-300 hover:text-gray-900 transition duration-300 ease-in-out"
                    >
                        Projects
                    </NavLink>
                    <NavLink
                        to="certifications"
                        onClick={toggleMobileMenu}
                        className="text-teal-400 block px-4 py-2  hover:bg-teal-300 hover:text-gray-900 transition duration-300 ease-in-out"
                    >
                        Certifications
                    </NavLink>
                    <NavLink
                        to="contact"
                        onClick={toggleMobileMenu}
                        className="text-teal-400 block px-4 py-2  hover:bg-teal-300 hover:text-gray-900 transition duration-300 ease-in-out"
                    >
                        Contact
                    </NavLink>
                    {/* Download CV Button for Mobile */}
                    
                    <NavLink
                        to="https://c5y18s9mdhikovk1.public.blob.vercel-storage.com/CV%20(1).PDF"
                        download="cv.pdf"
                        className="text-teal-400 block px-4 py-2  hover:bg-teal-300 hover:text-gray-900 transition duration-300 ease-in-out"
                        target="_blank"  // Open link in a new tab/window
                        rel="noopener noreferrer"  // Recommended for security when using target="_blank"
                    >
                        Download CV
                    </NavLink>                </div>
            )}

            <Outlet />
            <Footer />
        </div>
    );
};

export default Nav;
