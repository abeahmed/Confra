import React from 'react';
import Text from './Text';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Create Your Event",
      description: "Fill in the details of your event including the date, time, location, and capacity."
    },
    {
      number: 2,
      title: "Share Your Event",
      description: "Share your unique event link with potential attendees via email, text or social media."
    },
    {
      number: 3,
      title: "Manage RSVPs",
      description: "Track registrations, manage capacity, and communicate with attendees from your dashboard."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-10 py-8">
      <Text variant = "h2">How It Works</Text>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center text-center rounded-lg
             py-8 bg-zinc-950 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-10 h-10 bg-rose-900 text-white rounded-full flex items-center justify-center font-bold m-4  shrink-0">
                {step.number}
              </div>
              <div className="px-6">
                <Text variant = "h3">{step.title}</Text>
                <Text variant = "body" className="text-gray-400">{step.description}</Text>
              </div>
            </div>
          ))}

      </div>
    </div>
  );
};

export default HowItWorks; 