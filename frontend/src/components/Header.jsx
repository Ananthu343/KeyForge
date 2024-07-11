import React from 'react'

const Header = () => {
    return (
        <div className='w-screen flex justify-center'>
            <div className='w-full lg:w-[70%] bg-[#45454B] h-[50px] rounded-b-xl flex justify-between text-white p-2'>
                <div className='flex items-center p-2'>
                    <h2 className='font-bold text-[20px]'>KeyForge</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="gold" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gold" className="ml-2 size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Header
