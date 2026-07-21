import React, { useState, useRef } from "react";
import { PhoneIcon, MailIcon, LocationMarkerIcon, MicrophoneIcon } from "@heroicons/react/outline";

const ContactUs = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);

  // Function to handle recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        const audioBlob = new Blob([e.data], { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Recording failed: ", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">

          <h1 className="text-5xl font-extrabold text-agritech-green mb-4">

            Get in Touch
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-8">
            We're here to assist you. Reach out to us for any queries, support, or partnerships.
          </p>
        </div>

        {/* Contact Methods Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Call Us */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">

            <PhoneIcon className="h-12 w-12 text-agritech-green mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800">Call Us</h3>
            <p className="text-gray-600 mt-2">For immediate assistance, call us:</p>
            <a href="tel:+919876543210" className="text-lg font-medium text-agritech-green mt-4 inline-block">
              7300593752
            </a>
            <button className="mt-4 mx-4 bg-agritech-gradient text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transition duration-300">

              Call Us
            </button>
          </div>

          {/* Email Us */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">

            <MailIcon className="h-12 w-12 text-agritech-green mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800">Email Us</h3>
            <p className="text-gray-600 mt-2">Reach out to us via email for support or queries:</p>
            <a href="mailto:support@krishiconnect.com" className="text-lg font-medium text-agritech-green mt-4 inline-block">
              support@krishiconnect.com
            </a>
          </div>

          {/* Visit Us */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">

            <LocationMarkerIcon className="h-12 w-12 text-agritech-green mx-auto mb-4" />

            <h3 className="text-2xl font-semibold text-gray-800">Visit Us</h3>
            <p className="text-gray-600 mt-2">Office Address:</p>
            <p className="text-lg font-medium text-gray-700 mt-4">
              Gautam Buddha University, Noida
            </p>
          </div>
        </div>
        </div>
      </div>
  
  );
};

export default ContactUs;