import React from "react";
import { Link } from "react-router-dom";
import HowItWorks from '../components/HowItWorks';
import Button from '../components/Button';
import Text from '../components/Text';

function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-start text-center">
            <div className="max-w-xl p-10">
                <Text variant = "h1" className="text-5xl font-bold mb-2 text-white">Confra</Text>
                <Text variant = "bodyLarge" className="text-2xl mb-6 text-gray-400">Create and manage events with ease</Text>

                <Button to="/create-event">Create an event</Button>
             
            </div>   
                
            <HowItWorks />
        </div>
    )
}

export default LandingPage;
