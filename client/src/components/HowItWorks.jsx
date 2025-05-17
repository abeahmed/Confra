import React from 'react';

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
    <div className="py-16 max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {steps.map((step, index) => (
            <div key={step.number} className={`flex items-start ${index !== steps.length - 1 ? 'mb-8' : ''} 
            rounded-lg py-15 bg-zinc-950 transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
              <div className="w-10 h-10 bg-rose-900 text-white rounded-full flex items-center justify-center font-bold m-4  shrink-0">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}

      </div>
    </div>
  );
};

export default HowItWorks; 