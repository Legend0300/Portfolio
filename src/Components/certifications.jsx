import React from 'react';

const Certifications = () => {
  const certificationList = [
    {
      title: 'Machine Learning Specialization',
      description: 'Completed a specialization in Machine Learning from Coursera. This certification signifies my understanding and application of machine learning concepts.',
      link: 'https://coursera.org/share/fffa9e8fff63bfd5c29f995ac6d6fb24',
    },
    {
      title: 'NLP Foundations',
      description: 'This certification validates my expertise in building applications using NLP techniques. It covers topics like Vector Embeddings,  RNNs , LSTMs , Attention Mechanism and Transformers.',
      link: 'https://learn.ineuron.ai/certificate/98650364-ebb7-43d4-a0fc-cdab1cc73779',
    },
    {
      title: 'React Certification',
      description: 'Certified in React development from Coursera. This certification validates my expertise in building modern and efficient user interfaces using React.',
      link: 'https://coursera.org/share/77755365f37e91d875393b2c83861431',
    },
    {
      title: 'JavaScript Certification',
      description: 'Achieved certification in JavaScript development from Coursera. This certification highlights my proficiency in JavaScript programming and web development.',
      link: 'https://coursera.org/share/e32a6448d840715f4097b8e7aa8b7910',
    },
    {
      title: 'Node JS Certification',
      description: 'Certified in Node.js development from Coursera. This certification demonstrates my skills in server-side JavaScript programming and building scalable applications.',
      link: 'https://coursera.org/share/b4e0c2d5667f2a968b0702a29561e3c0',
    },
    {
      title: 'Introduction to Front-End Development',
      description: 'Completed Introduction to Front-End Development from Coursera. This certification signifies my understanding and application of front-end development concepts.',
      link: 'https://www.coursera.org/account/accomplishments/certificate/4RN5TBSCJ9A7',
    },
    // Add more certifications following the same structure
  ];

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-900 text-white rounded shadow-lg font-montserrat" style={{"paddingBottom" : "8%"}}>
      <h2 className="text-4xl font-bold mb-6 text-center text-teal-400">Certifications</h2>
      <div className="container mx-auto my-8 p-8 text-white rounded shadow-lg font-montserrat">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationList.map((certification, index) => (
            <div key={index} className="certification bg-gray-800 p-6 rounded border-gray-600 transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-3 text-teal-400">{certification.title}</h3>
              <p className="text- mb-4 text-gray-400">{certification.description}</p>
              <a
                href={certification.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-700 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out inline-block"
              >
                View Certification
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
