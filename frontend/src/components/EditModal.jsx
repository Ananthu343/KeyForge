import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { editPassword } from '../slices/userSlice';
import toast from 'react-hot-toast';

const EditModal = (props) => {
    const { setModal, element } = props;
    const [name, setName] = useState(element.name)
    const [password, setPassword] = useState(element.password)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name !== element.name || password !== element.password) {
            dispatch(editPassword({ name, password, passwordId: element._id })).then((action) => {
                if (action.meta.requestStatus === "rejected") {
                    const errorMessage = "Cannot save";
                    toast.error(errorMessage);
                } else {
                    toast.success("Saved")
                }
            })
        }
    }

    return (
        <div className='h-screen w-screen flex justify-center bg-black/30 absolute'>
            <div className='w-[500px] h-[450px] lg:w-[400px] lg:h-[350px] bg-[#45454B] rounded-lg flex flex-col p-4 shadow-gray-500 shadow-md text-white justify-between'>
                <div className='flex p-2 justify-center w-full relative'>
                    <h1 className='font-semibold text-[20px]'>Edit</h1>
                    <svg onClick={()=>setModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute right-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <hr />
                <div className='flex flex-col w-full'>
                    <p>Name</p>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="email" className='p-2 bg-black rounded' placeholder='youremail@gmail.com' />
                </div>
                <div className='flex flex-col w-full'>
                    <p>Password</p>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='p-2 bg-black rounded' placeholder='password' />
                </div>
                <button onClick={handleSubmit} className='p-3 bg-black hover:text-green-500'>Save</button>
            </div>
        </div>
    )
}

export default EditModal
