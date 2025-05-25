import React from "react";
import { Link } from "react-router-dom";
import HowItWorks from '../components/HowItWorks';
import Button from '../components/Button';
import Text from '../components/Text';

function LandingPage() {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="max-w-xl">
            <Text variant = "h1" className="font-bold text-4xl md:text-5xl">Confra</Text>
            <Text variant = "bodyLarge" className="text-xl md:text-2xl text-gray-400">Create and manage events with ease</Text>

            <Button to="/create-event" className="mb-16">Create an event</Button>
             
            </div>   
                
            <HowItWorks />
        </div>
    )
}

export default LandingPage;
