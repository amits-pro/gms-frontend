import React from 'react';
import background from "../homepage/background.png"; // Import the background image

const Homepage = () => {
  // Inline styles
  const styles = {
    container: {
      backgroundImage: `url(${background})`, // Set the background image
      backgroundSize: 'cover',               // Ensure the image covers the entire container
      backgroundPosition: 'center',          // Center the image
      height: '100vh',                       // Full viewport height
      width: '100vw',                        // Full viewport width
      display: 'flex',                       // Use flexbox to center the content
      justifyContent: 'center',              // Center horizontally
      alignItems: 'center',                  // Center vertically
      textAlign: 'center',                   // Center the text
      color: 'white',                        // White text color for contrast
      flexDirection: 'column',               // Align items in a column
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay with transparency
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '80%',                       // Limit the width of the overlay on large screens
      margin: '0 auto',                      // Center the overlay
    },
    heading: {
      fontSize: '3rem',                      // Large heading font size
      marginBottom: '20px',
    },
    paragraph: {
      fontSize: '1.2rem',                    // Subtext font size
      marginBottom: '30px',
    },
    button: {
      backgroundColor: '#007BFF',            // Call-to-action button color
      color: 'white',
      padding: '15px 30px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Grievance Management System</h1>
        <p style={styles.paragraph}>
          Welcome to Banasthali Vidyapeeth's Grievance Management Portal. A place where your voice is heard and solutions are made.
        </p>
        
      </div>
    </div>
  );
};

export default Homepage;
