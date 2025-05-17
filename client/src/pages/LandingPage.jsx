import React from "react";
import { Link } from "react-router-dom";
import HowItWorks from '../components/HowItWorks';
import Button from '../components/Button';

function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-5">
            <div className="max-w-xl">
                <h1 className="text-5xl font-bold mb-2 text-white">Confra</h1>
                <h2 className="text-2xl mb-6 text-gray-400">Create and manage events with ease</h2>

                <Button to="/create-event">Create an Event</Button>
            </div>   
                
            <HowItWorks />
        </div>
    )
}

export default LandingPage;
