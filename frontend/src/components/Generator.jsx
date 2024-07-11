import React, { useEffect, useState } from 'react'
import RangeSlider from "react-range-slider-input";
import 'react-range-slider-input/dist/style.css';

const Generator = () => {
    const [password, setPassword] = useState("password")
    const [length, setLength] = useState(8)
    const [status, setStatus] = useState("poor")
    const [upper, setUpper] = useState(true);
    const [lower, setLower] = useState(true);
    const [sym, setSymbols] = useState(false);
    const [num, setNumbers] = useState(false);
    const lowerCase = "abcdefghijklmnopqrstuwxyz"
    const upperCase = lowerCase.toUpperCase()
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-+";

    useEffect(() => {
        if (length <= 8) {
            setStatus("poor")
        } else if (length <= 15) {
            setStatus("medium")
        } else {
            setStatus("strong")
        }
    }, [handleSliderChange, length])

    const generatePass = () => {
        let charPool = "";
        if (lower) charPool += lowerCase;
        if (upper) charPool += upperCase;
        if (num) charPool += numbers;
        if (sym) charPool += symbols;

        let newPassword = "";
        for (let i = 0; i < length; i++) {
            newPassword += charPool[Math.floor(Math.random() * charPool.length)];
        }
        setPassword(newPassword);
    }

    function handleSliderChange(value) {
        setLength(value[1])
    }

    const handleRadioChange = (e) => {
        const { name } = e.target;
        switch (name) {
            case "uppercase":
                setUpper(!upper);
                break;
            case "lowercase":
                setLower(!lower);
                break;
            case "symbols":
                setSymbols(!sym);
                break;
            case "numbers":
                setNumbers(!num);
                break;
            default:
                break;
        }
    };

    const handleInput = (e) =>{
        setPassword(e.target.value)
        setLength(e.target.value.length)
    }

    return (
        <div className='w-[500px] h-[550px] lg:w-[400px] lg:h-[450px] bg-[#45454B] rounded-lg flex flex-col p-4 shadow-gray-500 shadow-md text-white'>
            <div className='flex p-2 justify-center w-full'>
                <h1 className='font-semibold'>Password Generator</h1>
            </div>
            <div className='flex w-full justify-between items-center mt-5'>
                <input onChange={handleInput} value={password} type="text" className='w-[90%] p-2 bg-black rounded border border-white' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                </svg>
            </div>
            <div className='w-full mt-4 text-sm flex flex-col '>
                <p>Choose length ( {length ?? 0} letters )</p>
                <div className='w-full justify-between mt-2 flex items-center'>
                    <RangeSlider
                        className="single-thumb w-[80%]"
                        min={0}
                        max={20}
                        defaultValue={[0, length]}
                        thumbsDisabled={[true, false]}
                        rangeSlideDisabled={true}
                        onInput={handleSliderChange}
                    />
                    <p className={`${status === "poor" ? "text-red-500" : status === "medium" ? "text-yellow-500" : "text-green-500"} font-semibold text-sm mr-2`}>{status}</p>
                </div>
            </div>
            <div className='mt-5 w-full flex flex-col'>
                <h2 className='underline'>Include</h2>
                <div className='flex justify-around w-full mt-3'>
                    <div className='flex'>
                        <input
                            type="radio"
                            name="uppercase"
                            id="uppercase"
                            checked={upper}
                            onClick={handleRadioChange}
                            readOnly
                        />
                        <p>Uppercase</p>
                    </div>
                    <div className='flex'>
                        <input
                            type="radio"
                            name="lowercase"
                            id="lowercase"
                            checked={lower}
                            onClick={handleRadioChange}
                            readOnly
                        />
                        <p>Lowercase</p>
                    </div>
                </div>
                <div className='flex justify-around w-full mt-3'>
                    <div className='flex'>
                        <input
                            type="radio"
                            name="symbols"
                            id="symbols"
                            checked={sym}
                            onClick={handleRadioChange}
                            readOnly
                        />
                        <p>Symbols</p>
                    </div>
                    <div className='flex'>
                        <input
                            type="radio"
                            name="numbers"
                            id="numbers"
                            checked={num}
                            onClick={handleRadioChange}
                            readOnly
                        />
                        <p>Numbers</p>
                    </div>
                </div>
            </div>
            <button onClick={generatePass} className='font-semibold bg-black p-3 mt-5 hover:text-green-500'>Generate</button>
            <div className='w-full mt-3 text-sm'>
               <button>Save password</button>
            </div>
        </div>
    )
}

export default Generator
