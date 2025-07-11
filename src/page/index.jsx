import React, { useState } from "react";
import mentor from '../assets/mentor.png';
import { NavLink } from "react-router-dom";
import { Nav } from "../components/Nav";
import TopMentors from '../components/TopMentors';

const Home = () => {
  const [isOpen, setIsOpen] = useState({});
  const toggleFAQ = (index) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      <Nav />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-green-100 py-16 px-6 md:py-24">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold text-green-800 leading-tight">
                <span className="text-5xl md:text-7xl text-green-900">Elevate Hub:</span>
                <br />Your journey, our guidance
              </h1>
              <p className="mt-6 text-lg md:text-2xl text-green-700">
                Every great achiever was inspired by a great mentor. Find yours today!
              </p>
              <div className="mt-8">
                <NavLink to="/mentors">
                  <button className="px-8 py-3 text-white text-lg font-medium bg-green-600 rounded-lg shadow-lg hover:bg-green-700 hover:scale-105 transition duration-300">
                    Match with a Mentor
                  </button>
                </NavLink>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
              <div className="relative">
                <img
                  className="w-full max-w-lg rounded-lg shadow-lg"
                  src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                  alt="Mentorship Hub"
                />
                <div className="absolute inset-0 bg-green-900 bg-opacity-10 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        {/* ... Keep your existing About Section code unchanged ... */}

        {/* Features Section */}
        {/* ... Keep your existing Features Section code unchanged ... */}

        {/* How It Works Section */}
        {/* ... Keep your existing How It Works Section code unchanged ... */}

        {/* Mentor Categories Section */}
        <section className="px-8 py-20 bg-gray-100">
          <div className="container mx-auto">
            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start">
              <div className="mb-8 md:w-1/3 md:mr-12">
                <h2 className="text-4xl font-extrabold text-green-700">
                  Find the Right Mentor for You
                </h2>
                <p className="mt-4 text-lg text-gray-700">
                  Unlock growth opportunities with expert mentors. Whether you're aiming to boost your career, enhance your skills, or explore new fields, Elevate Hub has the perfect mentor for you.
                </p>
                <NavLink
                  to="/mentors"
                  className="inline-flex items-center px-6 py-3 mt-6 text-white transition duration-300 bg-green-500 rounded-md shadow-md hover:bg-green-600 hover:shadow-lg"
                >
                  Get Started
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </NavLink>
              </div>

              <div className="grid flex-grow grid-cols-2 gap-6 md:grid-cols-3">
                {[
                  "Career Coaches",
                  "Business Mentors",
                  "Creative Mentors",
                  "Tech Experts",
                  "Marketing Gurus",
                  "Finance Advisors",
                  "Wellness Coaches",
                  "Education Mentors",
                  "Social Impact Leaders",
                ].map((category, index) => (
                  <a
                    key={index}
                    href="/"
                    onClick={(e) => e.preventDefault()}
                    className="block p-4 text-center transition duration-300 border rounded-lg shadow-sm bg-white text-gray-800 
                    border-green-400 hover:bg-green-500 hover:text-white hover:shadow-lg cursor-not-allowed"
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>

            <div className="relative mt-10">
              <img
                className="object-cover w-full h-56 sm:h-96 rounded-lg shadow-md"
                src="https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Mentorship"
              />
              <div className="absolute inset-0 bg-green-900 bg-opacity-30 rounded-lg" />
            </div>
          </div>
        </section>

        {/* Top Mentors Section */}
        <section
          style={{
            background: 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb)',
            backgroundSize: '200% 200%',
            animation: 'gradientAnimation 6s ease infinite',
          }}
        >
          <div className="container mx-auto">
            <TopMentors />
          </div>
        </section>

        {/* Pricing Section */}
        {/* ... Keep your existing Pricing Section code unchanged ... */}

        {/* FAQs Section */}
        {/* ... Keep your existing FAQ Section code unchanged ... */}

        {/* Call to Action */}
        {/* ... Keep your existing CTA Section code unchanged ... */}

        {/* Footer */}
        {/* ... Keep your existing Footer code unchanged ... */}
      </div>
    </>
  );
};

export default Home;
