import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../slices/userSlice';
import toast from 'react-hot-toast';

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPass] = useState("")
    const {userInfo} = useSelector(state => state.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if (userInfo) {
            navigate('/')
        }
    })

    const isEmail = (email) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const isPasswordValid = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/.test(password);

    const isUsernameValid = (username) =>
        /^\S[a-zA-Z]{3,}$/.test(username);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isEmail(email)) {
            toast.error("Email is not valid")
        } else if (!isPasswordValid(password)) {
            toast.error(
                "Password should follow these conditions, \n\n Is at least 5 characters long.\nContains at least one lowercase letter.\nContains at least one uppercase letter.\nContains at least one digit.\nConsists only of letters (uppercase or lowercase) and digits.",
                {
                    duration: 6000,
                }
            );
        } else if (!isUsernameValid) {
            toast.error("Username should contain only letters (minimum 3)")
        } else if (password !== confirmPassword) {
            toast.error("Password didn't match")
        } else {
            const data = {
                name, email, password
            }
            dispatch(signup(data)).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    const errorMessage = "Email not accepted";
                    toast.error(errorMessage);
                } else {
                    navigate("/login")
                }
            })
        }
    }
  return (
    <div className='w-[500px] h-[450px] lg:w-[400px] lg:h-[550px] bg-[#45454B] rounded-lg flex flex-col p-4 shadow-gray-500 shadow-md text-white justify-between'>
        <div className='flex p-2 justify-center w-full'>
              <h1 className='font-semibold text-[20px]'>Sign up</h1>
        </div>
        <hr />
        <div className='flex flex-col w-full'>
            <p>Email</p>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className='p-2 bg-black rounded' placeholder='youremail@gmail.com'/>
        </div>
        <div className='flex flex-col w-full'>
            <p>Full name</p>
            <input value={name} onChange={(e)=>setName(e.target.value)} type="email" className='p-2 bg-black rounded'/>
        </div>
        <div className='flex flex-col w-full'>
            <p>Password</p>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className='p-2 bg-black rounded' placeholder='password'/>
        </div>
        <div className='flex flex-col w-full'>
            <p>Confirm password</p>
            <input value={confirmPassword} onChange={(e)=>setConfirmPass(e.target.value)} type="password" className='p-2 bg-black rounded' placeholder='re-enter password'/>
        </div>
        <button onClick={handleSubmit} className='p-3 bg-black hover:text-green-500'>Signin</button>
    </div>
  )
}

export default Signup
