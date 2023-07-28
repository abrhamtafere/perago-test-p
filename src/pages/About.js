import React from 'react';
import peragoLogo from '../images/perago2.png';

export default function About() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Perago Systems</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            We help businesses achieve their goals with custom software solutions
          </p>
          <img className="mx-auto mt-8 w-64" src={peragoLogo} alt="Perago Systems Logo" />
        </div>
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3L4 5v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="ml-3">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Custom software development
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  We specialize in building custom software solutions tailored to the unique needs of your business. From web applications to mobile apps, we can help you achieve your goals with technology.
                </dd>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="ml-3">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Consulting services
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Our experienced consultants can help you navigate the complex world of technology and make informed decisions that align with your business goals. From project scoping to technical architecture, we're here to help.
                </dd>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3L4 5v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="ml-3">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Cloud computing
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  We can help you leverage the power of cloud computing to scale your business and improve efficiency. Whether you need help with migration, architecture, or ongoing management, we've got you covered.
                </dd>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="ml-3">
                <dt className="text-lg leading-6 font-mediumtext-gray-900">
                  Our mission
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  At Perago Systems, our mission is to help businesses achieve their goals with technology. We believe that technology should be a tool to enable businesses to innovate, grow, and succeed. That's why we're committed to delivering high-quality, custom software solutions that are tailored to the unique needs of each of our clients.
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}