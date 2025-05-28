import { useState, useRef, useEffect } from 'react';
import { initiateVerification } from '../api/rsvpservice';
import Text from './Text';
import ContentCard from './ContentCard';
import Button from './Button';
import Alert from './Alert';


const VerificationCode = ( {onVerify, error: externalError }) => {
    const [code, setCode] = useState(Array(6).fill(""));
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);


    const handleKeyDown = (e) => {
        if (
            !/^[0-9]{1}$/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "Delete" &&
            e.key !== "Tab" &&
            !e.metaKey
        ) {
            e.preventDefault();
        }

        if (e.key === "Delete" || e.key === "Backspace") {
            const index = inputRefs.current.indexOf(e.target);
            setCode((prevCode) => {
                const newCode = [...prevCode];
                            
                if (newCode[index]) {
                    newCode[index] = "";
                } else if (index > 0) {
                    newCode[index - 1] = "";
                    inputRefs.current[index - 1].focus();
                }
                return newCode;
            });
        }
    };

    const handleInput = (e) => {
        const { target } = e;
        const index = inputRefs.current.indexOf(target);
        if (target.value) {
            setCode((prevCode) => {
                const newCode = [
                    ...prevCode.slice(0, index),
                    target.value,
                    ...prevCode.slice(index + 1),
                ];
                return newCode;
            });

        
            if (index < code.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleFocus = (e) => {
        e.target.select();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        if (!new RegExp(`^[0-9]{${code.length}}$`).test(text)) {
            return;
        }
        const digits = text.split("");
        setCode(digits);
    };

    useEffect(() => {
        if (code.every(digit => digit !== "")) {
            handleSubmit();
        }
    }, [code]);

    const handleSubmit = async (e = null) => {
        if (e?.preventDefault) e.preventDefault();
        setLoading(true);
        setError('');
        try {
            onVerify(code.join(''));
        } catch (error) {
            setError(error.response?.data?.error || error.message || 
            'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
            <div className="flex flex-wrap justify-center gap-2">
                <Text variant="body">
                    Enter the 6-digit code sent to your email
                </Text>

                <form>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
                        {code.map((digit, index) => (
                            <input 
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                                onFocus={handleFocus}
                                onPaste={handlePaste}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="w-12 h-12 sm:w-12 text-center text-xl font-semibold rounded-md 
                                border-2 border-zinc-800 focus:outline-none focus:border-rose-900 
                                transition-all duration-150 bg-zinc-800/30 text-gray-100"
                                inputMode="numeric"
                                pattern="[0-9]"
                            />
                        ))}

                    </div>

                    {(error || externalError) && (
                        <Alert type="error" className="mb-6">
                            {error || externalError}
                        </Alert>
                    )}

                </form>
            </div>
    );
    
}

export default VerificationCode;