import React from "react";

const ContactUs = () => {
  return (
    <div className="contact-container pt-72 py-8 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center animate-fade-in">
        اتصل بنا
      </h1>
      <div className="contact-info bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          للتواصل معنا
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          يمكنك التواصل معنا عبر البريد الإلكتروني أو وسائل التواصل الاجتماعي
        </p>
        <div className="contact-methods space-y-4">
          <a
            href="mailto:morasel.be@gmail.com"
            className="email-link flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            morasel.be@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
