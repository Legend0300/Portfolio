import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission if needed
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white transition-transform transform hover:scale-105">
  <div className="container mx-auto my-8 p-8 bg-gray-800 text-white rounded shadow-lg font-montserrat lg:max-w-xl xl:max-w-2xl">
    <h2 className="text-4xl font-bold mb-6 text-center text-teal-400">Let's Connect</h2>

      <p className="mb-4 text-lg text-center">
        I'm always open to new opportunities and collaborations. Feel free to reach out to me through any of the following channels:
      </p>

        <ul className="mb-8 text-center">
          <li className="mb-2">
            <a
              style={{ textDecoration: 'none' }}
              href="mailto:ahmed.mansur.bhatti@gmail.com"
              className="max-w-md mx-auto text-teal-300 flex items-center justify-center underline rounded-full p-3 bg-gray-700 hover:bg-gray-600"
            >
              <FontAwesomeIcon icon={faEnvelope} className="font-medium text-lg mr-2" />
              Email
            </a>
          </li>
          <li className="mb-2">
            <a
              style={{ textDecoration: 'none' }}
              href="https://www.linkedin.com/in/muhammad-ahmad-b55539250/"
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-md mx-auto text-teal-300 flex items-center justify-center underline rounded-full p-3 bg-gray-700 hover:bg-gray-600"
            >
              <FontAwesomeIcon icon={faLinkedin} className="font-medium text-lg mr-2" />
              LinkedIn
            </a>
          </li>
          <li className="mb-2">
            <a
              style={{ textDecoration: 'none' }}
              href="tel:+923124066677"
              className="max-w-md mx-auto text-teal-300 flex items-center justify-center underline rounded-full p-3 bg-gray-700 hover:bg-gray-600"
            >
              <FontAwesomeIcon icon={faPhone} className="text-lg mr-2" />
              Phone
            </a>
          </li>
          <li className="mb-2">
            <a
              style={{ textDecoration: 'none' }}
              href="https://github.com/Legend0300"
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-md mx-auto text-teal-300 flex items-center justify-center underline rounded-full p-3 bg-gray-700 hover:bg-gray-600 "
            >
              <FontAwesomeIcon icon={faGithub} className="text-lg mr-2" />
              GitHub
            </a>
          </li>
        </ul>

        <p className="mb-6 text-lg text-center">
          Looking forward to connecting with you!
        </p>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <label htmlFor="email" className="text-teal-400 text-lg mb-2 block">
            Subscribe to Updates
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            className="w-full p-2 mb-4 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring focus:border-teal-500 "
            required
          />

          <button
            type="submit"
            className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out w-full"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
