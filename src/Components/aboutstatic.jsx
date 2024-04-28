import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faRobot, faBrain } from '@fortawesome/free-solid-svg-icons';
import { faReact, faJs, faPython, faNodeJs } from '@fortawesome/free-brands-svg-icons';

const AboutStatic = () => {
  const cards = [
    {
      title: 'Machine Learning Mastery',
      icon: faBrain,
      content: (
        <>
          <p className="mb-3">
            My passion for Machine Learning and Artificial Intelligence is at the core of my professional expertise. I have developed proficiency in
            <FontAwesomeIcon icon={faPython} className="ml-1 mr-1 text-blue-500" />Python, utilizing libraries like Tensorflow, PyTorch, and Scikit-Learn for creating sophisticated ML models.
          </p>
          <p>
            I've implemented solutions ranging from Natural Language Processing to deep learning applications, leveraging these technologies to drive innovation and efficiency in various projects.
          </p>
        </>
      ),
    },
    {
      title: 'Full Stack Development',
      icon: faLaptopCode,
      content: (
        <>
          <p className="mb-3">
            As a Full Stack Developer, I specialize in the design and development of comprehensive web applications. I work with
            <FontAwesomeIcon icon={faJs} className="ml-2 mr-1 text-yellow-400" />JavaScript,
            <FontAwesomeIcon icon={faReact} className="ml-1 mr-1 text-teal-400" />React, and server-side technologies like
            <FontAwesomeIcon icon={faNodeJs} className="ml-1 mr-1 text-green-500" />Node.js to build scalable and dynamic solutions.
          </p>
          <p>
            My skill set also includes designing UI/UX with Material UI and Tailwind CSS, ensuring applications are not only functional but also visually appealing.
          </p>
        </>
      ),
    },
    {
      title: 'Emerging Technologies and Generative AI',
      icon: faRobot,
      content: (
        <>
          <p className="mb-3">
            I am deeply engaged with the latest advancements in Generative AI and other emerging technologies. My commitment to staying ahead in the tech landscape drives my continuous learning and application of state-of-the-art innovations.
          </p>
          <p>
            This exploration includes practical applications and theoretical understanding, positioning me to contribute to and lead on cutting-edge projects.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="about-container bg-gray-900 py-12 text-white h-full flex justify-center items-center">
      <div className="flex flex-col items-center max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-teal-400">About Me</h1>
        {cards.map((card, index) => (
          <div key={index} className="transition-transform transform hover:scale-105 card text-lg p-6 rounded bg-gray-800 mb-4">
            <h3 className="text-2xl font-bold mb-3 text-teal-400 flex items-center">
              <FontAwesomeIcon icon={card.icon} className="mr-2" />
              {card.title}
            </h3>
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutStatic;
