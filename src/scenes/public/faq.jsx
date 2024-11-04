import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
  const faqs = [
    {
      question: "What is a grievance?",
      answer: "A grievance is a formal complaint raised by an individual regarding any issue they are facing in the institution. It could be related to academics, facilities, harassment, or any other concern."
    },
    {
      question: "How do I submit a grievance?",
      answer: "You can submit your grievance through the online Grievance Management Portal by logging into your account, filling out the form with details about the issue, and submitting it for review."
    },
    {
      question: "What happens after I submit a grievance?",
      answer: "After submitting, your grievance will be reviewed by the relevant authorities, and you'll receive updates on the status of your grievance via the portal or email notifications."
    },
    {
      question: "How can I track the status of my grievance?",
      answer: "You can track the status of your grievance by logging into the portal, where you can see updates about the review process and the resolution of your issue."
    },
    {
      question: "What should I do if my grievance is not resolved?",
      answer: "If your grievance is not resolved to your satisfaction, you can escalate it to higher authorities or contact the grievance cell for further assistance."
    },
    {
      question: "Who can file a grievance?",
      answer: "Any student, faculty member, or staff of Banasthali Vidyapeeth can file a grievance using the grievance management system."
    }
  ];

  return (
    <Box sx={{
      padding: '20px',
      width: '100%', 
      height: '100%', // Maximize height to fit the container
      maxWidth: '1200px', // Optional: limit max width
      margin: '0 auto',
      backgroundColor: '#002D62',
      borderRadius: '10px',
      overflowY: 'auto', // Allow scrolling if content exceeds height
      boxSizing: 'border-box'
    }}>
      {/* Title */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#ffffff', fontSize: '2rem', fontWeight: 'bold' }}>
        Frequently Asked Questions (FAQs)
      </Typography>

      {/* Accordion with larger font and white text */}
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ backgroundColor: '#ffffff', marginBottom: '10px', borderRadius: '8px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`faq-${index}-content`}
            id={`faq-${index}-header`}
          >
            <Typography variant="h6" sx={{ fontSize: '1.5rem', color: '#000000' }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontSize: '1.2rem', color: '#333333' }}>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;
