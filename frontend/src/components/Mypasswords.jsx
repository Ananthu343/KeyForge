import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPasswords, deletePassword } from '../slices/userSlice'
import toast from 'react-hot-toast'
import EditModal from './EditModal'

const Mypasswords = () => {
    const { userInfo, passwords } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [editOption, setEditOption] = useState({})

    const copyPasswordToClipboard = (password) => {
        navigator.clipboard.writeText(password).then(function () {
            toast.success('Copied to clipboard');
        }, function (err) {
            console.error('Could not copy text: ', err);
        });
    };

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else {
            dispatch(getPasswords())
        }
    })

    const handleEdit = (ele) =>{
        setEditOption(ele)
        setModal(true)
    }

    const handleDelete = (id) =>{
        dispatch(deletePassword(id)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Cannot delete";
                toast.error(errorMessage);
            } else {
                toast.success("Deleted")
            }
        })
    }
    
    return (
        <>
        <div className='w-full h-auto lg:w-[70%] bg-[#45454B] rounded-lg flex flex-col p-4 shadow-gray-500 shadow-md text-white'>
            <table className="w-full mx-auto">
                <thead className='border-b'>
                    <tr>
                        <th className="text-left">Sl</th>
                        <th className="text-left">Password Name</th>
                        <th className="text-left">Password</th>
                        <th className="text-left"></th>
                        <th className="text-left">Edit</th>
                        <th className="text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {passwords[0] ? (
                        passwords.map((ele, index) => (
                            <tr key={index}>
                                <td className="text-left"><div className="pb-5 pt-5" >{index + 1}</div></td>
                                <td className="text-left">{ele.name}</td>
                                <td className="text-left">
                                    {ele.password}
                                </td>
                                <td className="text-left">
                                   <svg onClick={()=>copyPasswordToClipboard(ele.password)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6   cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                    </svg>

                                </td>
                                <td className="text-left">
                                    <svg onClick={()=>handleEdit(ele)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6 cursor-pointer ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </td>
                                <td className="text-left">
                                    <svg onClick={()=>handleDelete(ele._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">Empty</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        {modal && <EditModal setModal={setModal} element={editOption}/>}
        </>
    )
}

export default Mypasswords
