import React from 'react';

const Projects = () => {
  const projectList = [
    {
      title: 'AI Chatbot',
      description: 'An intelligent chatbot utilizing the Open AI API and built with the MERN Stack, featuring Node.js for the backend and React for the frontend.',
      repoLink: 'https://github.com/Legend0300/AI-ChatBot',
    },
    {
      title: 'MBTI Classifier',
      description: 'AI-powered personality classifier using Hugging Face BERT model on a custom dataset, powered with Flask on backend for Myers-Briggs Type Indicator (MBTI) classification.',
      repoLink: 'https://github.com/Legend0300/HuggingFace',
    },
    {
      title: 'Transformer Implementation',
      description: 'Developed from scratch using PyTorch, this project implements the Transformer model, a pinnacle in NLP for tasks like translation and text generation.',
      repoLink: 'https://github.com/Legend0300/Transformer-Implementation',
    },
    {
      title: 'Dynamic API CRUD Handler React',
      description: 'A dynamic CRUD handler built with React enabling Create, Read, Update, and Delete operations with a user-friendly interface.',
      repoLink: 'https://github.com/Legend0300/API-Dynamic-CRUD-Handler',
    },
    {
      title: 'Email Spam Detector',
      description: 'Web application using Flask and MultinomialNB Classifier to detect email spam, showcasing practical use of machine learning.',
      repoLink: 'https://github.com/Legend0300/Email-Spam-Detector',
    },
    {
      title: 'Discord Bot in Python',
      description: 'A Python-based Discord bot using the Discord API designed to enhance server interaction by responding to specific messages.',
      repoLink: 'https://github.com/Legend0300/discordBot',
    },
    {
      title: 'Social Media App REST API',
      description: 'Developed a RESTful API for a social media app with features like user authentication and post interactions.',
      repoLink: 'https://github.com/Legend0300/Social-Media-App',
    },
    {
      title: 'PyTorch Repo',
      description: 'Repository for exploring various machine learning concepts using PyTorch to enhance skills in practical applications.',
      repoLink: 'https://github.com/Legend0300/PyTorch',
    },
    {
      title: 'Machine Learning Repo',
      description: 'Dedicated repository for deepening expertise in machine learning concepts and algorithms.',
      repoLink: 'https://github.com/Legend0300/Machine-Learning-Prac',
    },
  ];

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-900 text-white rounded shadow-lg font-montserrat">
      <h2 className="text-4xl font-bold mb-6 text-center text-teal-400">Projects</h2>
      <div className="flex flex-wrap justify-center">
        {projectList.map((project, index) => (
          <div key={index} className="project bg-gray-800 p-6 rounded m-4 max-w-md transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-3 text-teal-300">{project.title}</h3>
            <p className="text-md mb-4 text-gray-400">{project.description}</p>
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out inline-block"
            >
              GitHub Repository
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
