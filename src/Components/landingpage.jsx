// LandingPage.jsx

import React from 'react';
import { Fade } from 'react-reveal';
import About from './about'; // Import your About component
import { Link } from 'react-router-dom';

const LandingPage = () => {
 
  

  return (
    <div className="landing-container min-h-screen flex flex-col overflow-hidden bg-gray-900">
      <div className="intro-container text-white flex-1 flex flex-col items-center justify-center p-4">
        <Fade>
          <h1 className="text-4xl font-bold mb-4">
            Hello, I'm Muhammad Ahmad 🚀
          </h1>
        </Fade>
        <Fade>
          <p className="text-lg text-center mb-8">
            A passionate Machine Learning Engineer with expertise in building innovative ML applications. 🌐
          </p>
        </Fade>
        <Fade>
          <Link to="/about" className="bg-teal-800 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out" >
            Learn more about me
          </Link>
        </Fade>
        <div style={{"padding" : "10px"}}></div>
        {/* Add the About component here */}
        <About />
      </div>

    </div>
  );
};




export default LandingPage;
