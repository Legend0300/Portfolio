import React from 'react';

const Skills = () => {
  return (
    <div className="container mx-auto my-8 p-8 bg-gray-900 text-white rounded shadow-lg font-montserrat">
    <h2 className="text-4xl font-bold mb-6 text-center text-teal-400">Skills</h2>

    <div className="transition-transform transform hover:scale-105 skill-category mb-8 bg-gray-800 p-6 rounded">
        <h3 className="text-2xl font-semibold mb-4 text-teal-300">Core Programming & Data Analysis</h3>
        <p className="text-gray-400 text-lg">
            I have a strong foundation in <strong className="text-teal-400">Python</strong>, complemented by extensive use of data manipulation and visualization libraries including:
            <strong className="text-teal-400"> Numpy, Matplotlib, Pandas,</strong> and <strong className="text-teal-400">Seaborn.</strong>
            These tools enable me to effectively analyze data and create compelling data-driven insights.
        </p>
    </div>

    <div className="transition-transform transform hover:scale-105 skill-category mb-8 bg-gray-800 p-6 rounded">
        <h3 className="text-2xl font-semibold mb-4 text-teal-300">Deep Learning & Machine Learning</h3>
        <p className="text-gray-400 text-lg">
            My expertise extends to advanced machine learning frameworks such as:
            <strong className="text-teal-400"> PyTorch</strong> and <strong className="text-teal-400">TensorFlow.</strong> I employ these technologies in developing models that can learn from and make decisions based on data. I am also proficient in <strong className="text-teal-400">Scikit-Learn</strong> for more traditional, structured data problems.
        </p>
    </div>

    <div className="transition-transform transform hover:scale-105 skill-category mb-8 bg-gray-800 p-6 rounded">
        <h3 className="text-2xl font-semibold mb-4 text-teal-300">Natural Language Processing</h3>
        <p className="text-gray-400 text-lg">
            In NLP, I am skilled with tools and frameworks like <strong className="text-teal-400">NLTK, Gensim,</strong> and <strong className="text-teal-400">Spacy</strong> to process and analyze human language data. My projects often leverage the the power of <strong className="text-teal-400">Hugging Face Library</strong> to incorporate fine-tuned cutting-edge pre-trained models into applications.
        </p>
    </div>

    <div className="transition-transform transform hover:scale-105 skill-category mb-8 bg-gray-800 p-6 rounded">
        <h3 className="text-2xl font-semibold mb-4 text-teal-300">Software Development</h3>
        <p className="text-gray-400 text-lg">
            Beyond machine learning, I am also experienced in robust software development, focusing on both frontend and backend technologies to build complete, scalable applications. This includes proficiency in <strong className="text-teal-400">Flask,</strong> <strong className="text-teal-400">JavaScript, React, Node.js,</strong> and modern tools like <strong className="text-teal-400">Material UI</strong> and <strong className="text-teal-400">Tailwind CSS.</strong>
        </p>
    </div>

</div>

  );
};

export default Skills;  