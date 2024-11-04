import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h1>About the Grievance Management System - Banasthali Vidyapeeth</h1>
      <p>
        Welcome to the Grievance Management System (GMS) of Banasthali Vidyapeeth, designed to empower students, faculty,
        and staff by providing a transparent, efficient, and user-friendly platform for addressing and resolving grievances.
        At Banasthali Vidyapeeth, we believe in fostering a supportive and inclusive environment where everyone’s voice
        matters. Our Grievance Management System reflects this commitment to upholding the highest standards of fairness,
        transparency, and accountability.
      </p>

      <h2>Key Features:</h2>
      <ul>
        <li>
          <strong>Confidentiality:</strong> All grievances are handled with the utmost confidentiality to protect the
          interests of the individuals involved.
        </li>
        <li>
          <strong>Transparency:</strong> The system allows users to track the status of their submitted grievances in real
          time, ensuring clarity throughout the resolution process.
        </li>
        <li>
          <strong>Timely Redressal:</strong> We aim to resolve issues promptly, adhering to defined timelines to ensure quick
          and efficient grievance redressal.
        </li>
        <li>
          <strong>Accessibility:</strong> Our platform is accessible to all members of the Banasthali Vidyapeeth community,
          ensuring that everyone has an opportunity to raise concerns and seek resolution.
        </li>
        <li>
          <strong>Accountability:</strong> Every grievance is assigned to a responsible officer or committee, ensuring
          accountability in addressing and resolving issues.
        </li>
      </ul>

      <p>
        Whether you are a student facing academic concerns, a faculty member with institutional feedback, or a staff member
        with operational grievances, our system ensures your concerns are heard and addressed in a structured, responsive
        manner.
      </p>

      <h2>How It Works:</h2>
      <ol>
        <li>
          <strong>Submit a Grievance:</strong> Log in to the portal and submit your grievance with relevant details.
        </li>
        <li>
          <strong>Track Progress:</strong> Receive updates and track the progress of your grievance through the system.
        </li>
        <li>
          <strong>Resolution:</strong> Get a timely and satisfactory resolution, with opportunities for further feedback if
          needed.
        </li>
      </ol>

      <h2>Download Grievance Submission Guidelines</h2>
      <p>
        For more information on how to submit a grievance, download the detailed guidelines by clicking the link below:
      </p>
      <a href="/resources/grievance-guidelines.pdf" target="_blank" rel="noopener noreferrer">
        Download Grievance Submission Guidelines (PDF)
      </a>

      <p>
        Together, let’s create a positive and harmonious environment at Banasthali Vidyapeeth where issues are resolved with
        fairness and respect.
      </p>
    </div>
  );
};

export default About;
