import { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system preference for dark mode
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    
    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-primary via-primary/95 to-secondary/20'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Dark mode toggle */}
        <div className="absolute top-6 right-6">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 animate-fade-in ${
            isDarkMode ? 'text-white' : 'text-white'
          }`}>
            Get In Touch
          </h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6 rounded-full"></div>
          <p className={`text-lg max-w-2xl mx-auto animate-fade-in ${
            isDarkMode ? 'text-gray-300' : 'text-gray-100'
          }`}>
            Drop us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`rounded-2xl shadow-xl p-8 h-fit animate-slide-up transform transition-all duration-500 hover:scale-[1.02] ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-gray-100 dark:bg-primary'
          }`}>
            <h2 className={`text-2xl font-bold mb-8 ${
              isDarkMode ? 'text-white' : 'text-primary dark:text-white'
            }`}>
              Contact Information
            </h2>
            
            <div className="space-y-11">
              <div className="flex items-start group">
                <div className={`flex-shrink-0 p-4 rounded-full transition-all duration-300 group-hover:scale-110 ${
                  isDarkMode ? 'bg-secondary/20' : 'bg-secondary/10'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500 dark:text-gray-300'
                  }`}>Phone</p>
                  <p className={`mt-1 text-lg font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}>+94 71 3569 999</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className={`flex-shrink-0 p-4 rounded-full transition-all duration-300 group-hover:scale-110 ${
                  isDarkMode ? 'bg-secondary/20' : 'bg-secondary/10'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500 dark:text-gray-300'
                  }`}>Email</p>
                  <p className={`mt-1 text-lg font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}>contact@kvaudio.com</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className={`flex-shrink-0 p-4 rounded-full transition-all duration-300 group-hover:scale-110 ${
                  isDarkMode ? 'bg-secondary/20' : 'bg-secondary/10'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500 dark:text-gray-300'
                  }`}>Address</p>
                  <p className={`mt-1 text-lg font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}>Colombo 07, Pothguk Street, SC 12345</p>
                </div>
              </div>
            </div>
            
            <div className={`mt-10 rounded-xl p-6 text-white transform transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-secondary/80 to-accent/80 backdrop-blur-sm' 
                : 'bg-gradient-to-r from-secondary to-accent'
            }`}>
              <h3 className="text-xl font-semibold mb-2">Our Hours</h3>
              <div className="h-1 w-12 bg-white/30 rounded-full mb-4"></div>
              <p className="mb-1 flex items-center">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
                Monday - Friday: 9AM - 6PM
              </p>
              <p className="flex items-center">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
                Saturday: 10AM - 4PM
              </p>
            </div>
            
            <div className="mt-10 flex space-x-4 justify-center">
              <a href="#" className="social-icon">
                <div className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}>
                  <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </a>
              <a href="#" className="social-icon">
                <div className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}>
                  <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </div>
              </a>
              <a href="#" className="social-icon">
                <div className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}>
                  <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`rounded-2xl shadow-xl p-8 animate-slide-up transform transition-all duration-500 ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-gray-100 dark:bg-primary'
          }`}>
            <h2 className={`text-2xl font-bold mb-8 ${
              isDarkMode ? 'text-white' : 'text-primary dark:text-white'
            }`}>
              Send us a message
            </h2>
            
            {submitted ? (
              <div className={`border rounded-lg p-6 text-center transform transition-all duration-500 animate-fade-in ${
                isDarkMode 
                  ? 'bg-green-900/30 border-green-700' 
                  : 'bg-green-50 border-green-200'
              }`}>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className={`text-lg font-medium ${
                  isDarkMode ? 'text-green-400' : 'text-green-800'
                }`}>
                  Message sent successfully!
                </h3>
                <p className={`mt-2 text-sm ${
                  isDarkMode ? 'text-green-300' : 'text-green-600'
                }`}>
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="group">
                    <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700 dark:text-gray-200'
                    }`}>
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 rounded-md border shadow-sm focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 dark:text-white'
                        }`}
                        placeholder="John Doe"
                      />
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-secondary transform origin-left scale-x-0 transition-transform duration-300 group-focus-within:scale-x-100 ${
                        formData.name ? 'scale-x-100' : ''
                      }`}></div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700 dark:text-gray-200'
                    }`}>
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 rounded-md border shadow-sm focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 dark:text-white'
                        }`}
                        placeholder="email@example.com"
                      />
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-secondary transform origin-left scale-x-0 transition-transform duration-300 group-focus-within:scale-x-100 ${
                        formData.email ? 'scale-x-100' : ''
                      }`}></div>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700 dark:text-gray-200'
                  }`}>
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3 rounded-md border shadow-sm focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 dark:text-white'
                      }`}
                      placeholder="How can we help you?"
                    />
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-secondary transform origin-left scale-x-0 transition-transform duration-300 group-focus-within:scale-x-100 ${
                      formData.subject ? 'scale-x-100' : ''
                    }`}></div>
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700 dark:text-gray-200'
                  }`}>
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3 rounded-md border shadow-sm focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 dark:text-white'
                      }`}
                      placeholder="Your message here..."
                    ></textarea>
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-secondary transform origin-left scale-x-0 transition-transform duration-300 group-focus-within:scale-x-100 ${
                      formData.message ? 'scale-x-100' : ''
                    }`}></div>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-secondary hover:bg-secondary/90 focus:ring-offset-gray-900'
                        : 'bg-secondary hover:bg-secondary/90'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transform hover:scale-[1.02] active:scale-[0.98]`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
         
        {/* Map Section */}
        <div className={`mt-16 rounded-2xl overflow-hidden shadow-xl animate-slide-up transform transition-all duration-500 hover:scale-[1.01] ${
          isDarkMode ? 'border border-gray-700' : ''
        }`}>
          <div className="h-96 w-full">
            <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467512262!2d79.8600757!3d6.9109506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259251b57a431%3A0x8f44e226d6d20a7e!2sColombo%2007%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1652345678901" 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen="" 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                          className={isDarkMode ? 'grayscale contrast-[1.2] brightness-[0.87]' : ''}
                        ></iframe>
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="mt-16 text-center">
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-200'}`}>
                        © {new Date().getFullYear()} KV Audio. All rights reserved.
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating contact button */}
                  <div className="fixed bottom-8 right-8 z-10">
                    <a 
                      href="tel:+94713569999" 
                      className={`flex items-center justify-center h-14 w-14 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 ${
                        isDarkMode 
                          ? 'bg-secondary text-white' 
                          : 'bg-secondary text-white'
                      }`}
                      aria-label="Call us"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </a>
                  </div>
                  
                  {/* Add some decorative elements */}
                  <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                    <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full ${
                      isDarkMode ? 'bg-secondary/5' : 'bg-secondary/10'
                    }`}></div>
                    <div className={`absolute top-1/3 -right-24 w-64 h-64 rounded-full ${
                      isDarkMode ? 'bg-accent/5' : 'bg-accent/10'
                    }`}></div>
                    <div className={`absolute -bottom-32 left-1/4 w-80 h-80 rounded-full ${
                      isDarkMode ? 'bg-secondary/5' : 'bg-secondary/10'
                    }`}></div>
                  </div>
                </div>
              );
            }
            