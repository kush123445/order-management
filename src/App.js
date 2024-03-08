// App.js

import React from 'react';
import './App.css';

function App() {
  const linkedInUrl = 'https://www.linkedin.com/in/kushal-khandelwal/268349196';
  const githubUrl = 'https://github.com/kush123445';
  const homecure= 'https://plumber-two.vercel.app'
  return (
    <div className="cvv">
      <header style={{backgroundColor:"#C5BA99"}}>
        <div className="name" style={{marginLeft:"20px"}}>
          <h1>Kushal Khandelwal</h1>
          <p> Full Stack Developer</p>
        </div>
        <div className="social-links ">
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </header>

    <div className="cv">
      <div className="center-column">
       

        <section className="contact">
          <h2>Contact Information</h2>
          <p>Location: Hathras, India</p>
          <p>Phone: 8218662808</p>
          <p>Email: kushalhts00@gmail.com</p>
        </section>

        <section className="skills">
          <h2>Skills</h2>
          <div className="skills-columns">
            <div className="column">
              <ul>
                <li>Node.js</li>
                <li>React.js</li>
                <li>REST API</li>
                <li>JAVASCRIPT</li>
                <li>Linux</li>
                <li>Docker</li>
                <li>Kubernetes</li>
              </ul>
            </div>
            <div className="column">
              <ul>
                
                <li>Jenkins</li>
                <li>SQL</li>
                <li>Git</li>
                <li>C</li>
                <li>HTML</li>
                <li>C++</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="projects">
          <h2>Projects</h2>
          <div className="project">
          <a href={homecure} target="_blank" rel="noopener noreferrer">
          <h3>HomeCure.in - Portal Integration</h3>
          </a>
           
            <p>June 2023</p>
            <p>Developed a service platform allowing customers to subscribe to services on a yearly basis using Node.js and React.js.</p>
          </div>

          <div className="project">
            <h3>Just-Check-In - Full Stack Web Application</h3>
            <p>May 2021 - July 2021</p>
            <p>Developed a full-stack web application with React.js, Node.js, and Express.js, including user authentication and CRUD operations via a RESTful API.</p>
          </div>

          <div className="project">
            <h3>Deploy Tms(php-mysql) web app on Kubernetes cluster</h3>
            <p>July 2023</p>
            <p>Created deployment for PHP application and stateful set for MySQL. Used PV, PVC as storage volumes and added ingress for routing.</p>
          </div>

          <div className="project">
            <h3>Docker in Jenkins - Pipeline for Docker</h3>
            <p>August 2023</p>
            <p>Created a pipeline that builds a Docker image, pushes it to Docker Hub, pulls it from Docker Hub, and runs the container.</p>
          </div>
        </section>
        <section className="education">
          <h2>Education</h2>
          <p>B.TECH (CSE) - Lovely Professional University</p>
          <p>GPA: 7.98 | Graduation Date: July 2023</p>
        </section>

      </div>

      <div className="right-column" >
        
      <section className="experience">
          <h2>Work Experience</h2>
          <div className="job">
            <h3>Jr. Full Stack Developer - RCS SOFT, Bangalore, India</h3>
            <p>November 2023 - Present</p>
            <ul>
              <li>Developed dynamic and responsive web applications using React.js and Node.js.</li>
              <li>Played a key role in the entire software development life cycle, ensuring robust and scalable solutions.</li>
            </ul>
          </div>

          <div className="job">
            <h3>Associate DevOps Intern - XenonStack, Mohali, India</h3>
            <p>May 2023 - October 2023</p>
            <ul>
              <li>Gained hands-on experience in Docker, Jenkins, and Kubernetes during an internship.</li>
              <li>Demonstrated the ability to containerize applications and manage scalable, fault-tolerant environments.</li>
            </ul>
          </div>

          <div className="job">
            <h3>Software Developer Intern - AB-InBev India, Bangalore, India</h3>
            <p>July 2022 - December 2022</p>
            <ul>
              <li>Spearheaded the front-end development efforts as a React developer, creating intuitive user interfaces and interactive features for a dynamic web application.</li>
              <li>Led the end-to-end development of a full-stack web application, leveraging React for the front end, Node.js for the back end, and MySQL for data storage.</li>
            </ul>
          </div>

          <div className="job">
            <h3>Web content creator - Priyam Innovations</h3>
            <p>June 2022 - August 2022</p>
            <ul>
              <li>Technical content creator</li>
            </ul>
          </div>
        </section>
       

        <section className="certificates">
          <h2>Certificates</h2>
          <div className="certificate">
            <h3>Beginning with back-end (Node.js) - Fifth-force</h3>
            <p>June 2021 - July 2021</p>
          </div>

          <div className="certificate">
            <h3>Mern stack project - Fifth-force</h3>
            <p>June 2021 - July 2021</p>
          </div>

          <div className="certificate">
            <h3>Node.js (Backend) project - Uniquedu</h3>
            <p>May 2022 - July 2022</p>
          </div>
        </section>

       
      </div>
    </div>
    </div>
  );
}

export default App;
