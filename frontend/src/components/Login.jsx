import React, {useState, useEffect} from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../slices/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {userInfo} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if (userInfo) {
            navigate('/')
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password })).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Invalid email or password";
                toast.error(errorMessage);
            }else{
                navigate('/')
            }
        })
    }
  return (
    <div className='w-[500px] h-[450px] lg:w-[400px] lg:h-[350px] bg-[#45454B] rounded-lg flex flex-col p-4 shadow-gray-500 shadow-md text-white justify-between'>
        <div className='flex p-2 justify-center w-full'>
              <h1 className='font-semibold text-[20px]'>Sign in</h1>
        </div>
        <hr />
        <div className='flex flex-col w-full'>
            <p>Email</p>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className='p-2 bg-black rounded' placeholder='youremail@gmail.com'/>
        </div>
        <div className='flex flex-col w-full'>
            <p>Password</p>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className='p-2 bg-black rounded' placeholder='password'/>
        </div>
        <button onClick={handleSubmit} className='p-3 bg-black hover:text-green-500'>Signin</button>
    </div>
  )
}

export default Login
