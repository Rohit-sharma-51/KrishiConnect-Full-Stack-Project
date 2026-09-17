import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Faq = () => {
  return (
    <div className="flex flex-col my-[3rem]">
      <div className="flex flex-col gap-[0.2rem] mx-auto items-center mb-[1rem]">
        <h3 className="text-bold text-[2.5rem] underline-offset-4 text-[#219653]">
          Frequently Asked Questions
        </h3>
        <div className="h-[0.3rem] w-[12rem] bg-[#219653] rounded-lg" />
      </div>
      <div className="w-[80%] mx-auto flex flex-col gap-[1.5rem]">
        <Accordion className="border border-[#219653] rounded-lg shadow-md">
          <AccordionSummary
            expandIcon={<AddCircleIcon style={{ color: "#219653" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="font-bold text-[#219653] text-[1.2rem]">
              What is KrishiConnect?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-gray-700">
              KrishiConnect is an online marketplace that connects farmers with buyers for secure and transparent contract farming. Our platform offers a comprehensive ecosystem for managing demand, signing contracts, monitoring crops, and ensuring payments.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="border border-[#219653] rounded-lg shadow-md">
          <AccordionSummary
            expandIcon={<AddCircleIcon style={{ color: "#219653" }} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className="font-bold text-[#219653] text-[1.2rem]">
              How does KrishiConnect ensure secure contracts?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-gray-700">
              We use blockchain technology to secure contracts and payments, ensuring that all transactions are transparent and tamper-proof. This guarantees that both farmers and buyers can trust the integrity of their agreements.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="border border-[#219653] rounded-lg shadow-md">
          <AccordionSummary
            expandIcon={<AddCircleIcon style={{ color: "#219653" }} />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className="font-bold text-[#219653] text-[1.2rem]">
              What support does KrishiConnect offer to farmers?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-gray-700">
              KrishiConnect offers multi-language and voice assistance, as well as integration with government crop insurance schemes. We also provide AI-powered insights to help farmers make informed decisions and improve crop management.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="border border-[#219653] rounded-lg shadow-md">
          <AccordionSummary
            expandIcon={<AddCircleIcon style={{ color: "#219653" }} />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography className="font-bold text-[#219653] text-[1.2rem]">
              How can buyers ensure they receive quality produce?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-gray-700">
              Buyers can access detailed information about the farmers and the crops through our platform. We facilitate transparent contract agreements and provide tools for monitoring crop progress, ensuring that buyers receive high-quality produce.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;

