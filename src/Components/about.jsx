import React, { useState, useEffect } from 'react';
import { Fade, Slide } from 'react-reveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faRobot, faBrain, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faReact, faJsSquare, faPython, faNodeJs, faJs } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useSwipeable } from 'react-swipeable';

library.add(faLaptopCode, faRobot, faBrain, faChevronLeft, faChevronRight, faReact, faJsSquare, faPython, faNodeJs, faJs);

const About = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentCard((prevCard) => (prevCard + 1) % 4);
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentCard]);

  const shiftLeft = () => setCurrentCard((prevCard) => (prevCard + 3) % 4);
  const shiftRight = () => setCurrentCard((prevCard) => (prevCard + 1) % 4);

  const dotStyle = (index) => ({
    width: '8px',
    height: '8px',
    backgroundColor: index === currentCard ? '#00BFA6' : '#718096',
    borderRadius: '50%',
    margin: '0 4px',
    transition: 'background-color 0.3s ease-in-out',
  });

  // Set up swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => shiftRight(),
    onSwipedRight: () => shiftLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Optional: Allows swiping with mouse for testing
  });

  const cards = [
    {
      title: 'Professional Expertise',
      icon: faLaptopCode,
      content: (
        <>
          <p className="mb-3">
            As a Full Stack Developer, I specialize in the end-to-end development of web applications, from designing
            intuitive user interfaces to implementing scalable backend solutions.
          </p>
          <p>
            My proficiency extends to using
            <FontAwesomeIcon icon={faJs} className="ml-2 mr-1 text-yellow-400" />JavaScript,
            <FontAwesomeIcon icon={faPython} className="ml-1 mr-1 text-blue-500" />Python, and
            <FontAwesomeIcon icon={faReact} className="ml-1 mr-1 text-teal-400" />React, along with frameworks such as
            Express JS and Flask.
          </p>
          <p>
            I am adept at creating dynamic and responsive applications, incorporating technologies like Material UI and
            Tailwind CSS for visually appealing designs.
          </p>
        </>
      ),
    },
    {
      title: 'Passion for Machine Learning',
      icon: faBrain,
      content: (
        <>
          <p className="mb-3">
            Beyond web development, I have a strong passion for exploring the realms of Machine Learning and AI. I have
            hands-on experience in Deep Learning, Scikit-Learn, Tensorflow, and have integrated the Open AI API into
            projects.
          </p>
          <p>
            This intersection of software development and artificial intelligence allows me to contribute to
            cutting-edge solutions in a rapidly evolving technological landscape.
          </p>
        </>
      ),
    },
    {
      title: 'MERN Stack and Node.js',
      icon: faNodeJs,
      content: (
        <>
          <p className="mb-3">
            Proficient in the MERN (MongoDB, Express.js, React, Node.js) stack for building full-stack web applications.
          </p>
          <p>
            Additionally, experienced in server-side JavaScript programming with Node.js, enabling the development of scalable and efficient server applications.
          </p>
        </>
      ),
    },
    {
      title: 'Generative AI and Trending Technologies',
      icon: faRobot,
      content: (
        <>
          <p className="mb-3">
            I am enthusiastic about Generative AI and constantly explore emerging technologies. I stay updated with the
            latest trends and advancements in the tech industry, ensuring that I can contribute to cutting-edge
            solutions.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="about-container bg-gray-900 py-8 md:py-12 text-white h-full flex flex-col items-center">
      <Slide left>
        <Fade duration={1000}>
          {/* Wrap the card container with swipe handlers */}
          <div {...swipeHandlers} className="card text-lg p-4 md:p-6 rounded bg-gray-800 max-w-2xl w-full md:flex items-center">
            {windowWidth >= 768 && (
              <button
                style={{ padding: '5px', marginRight: '5px' }}
                onClick={shiftLeft}
                className="text-white p-2 rounded-full focus:outline-none hover:transform hover:scale-105 transition-transform"
              >
                <FontAwesomeIcon icon="chevron-left" className="text-lg" />
              </button>
            )}
            <div style={{ paddingRight: '10px' }} className="px-4 md:px-6 flex-grow">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-teal-400 md:mb-0 flex items-center">
                <FontAwesomeIcon icon={cards[currentCard].icon} className="mr-2" />
                {cards[currentCard].title}
              </h3>
              <div style={{ paddingTop: '10px' }}>{cards[currentCard].content}</div>
            </div>
            {windowWidth >= 768 && (
              <button
                style={{ padding: '5px', marginLeft: '5px', marginBottom: '1%' }}
                onClick={shiftRight}
                className="text-white p-2 rounded-full focus:outline-none hover:transform hover:scale-105 transition-transform"
              >
                <FontAwesomeIcon icon="chevron-right" className="text-lg" />
              </button>
            )}
          </div>
        </Fade>
      </Slide>
      <div className="flex items-center mt-2 md:mt-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} style={dotStyle(index)} />
        ))}
      </div>
    </div>
  );
};

export default About;
