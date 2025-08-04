import React, { useContext, useState } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {

  const [CurrState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext)
  
  const onSubmitHandler = (event)=>{
    event.preventDefault();

    if (CurrState === 'Sign up' && !isDataSubmitted){
      setIsDataSubmitted(true)
      return;
    }
    login(CurrState === "Sign up" ? 'signup' : 'login', { fullName, email, password, bio });

  }

  return (
    <div className='min-h-screen px-6 py-10 bg-cover bg-center flex items-center justify-center gap-4 sm:justify-evenly max-sm:flex-col backdrop-blur-md'>

      {/*---------------------left--------------------------------*/}
      <img src={assets.logo} alt="" className='w-[min(30vw,250px)]' />

      {/*---------------------right---------------------------*/}
   <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-black border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>


        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {CurrState}
          {isDataSubmitted && <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt=""className='w-5 cursor-pointer'/>
          } 
          
          
        </h2>

        {CurrState === "Sign up" && !isDataSubmitted && (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-700">Full Name</label>
    <input 
      onChange={(e) => setFullName(e.target.value)} 
      value={fullName} 
      type="text" 
      className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black' 
      placeholder="Enter your full name"
      required
    />
  </div>
)}

{!isDataSubmitted && (
  <>
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-700">Email Address</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder='Enter your email'
        required
        className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black'
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-700">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder='Enter your password'
        required
        className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black'
      />
    </div>
  </>
)}


        {CurrState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='Provide a short bio...'
            required
          ></textarea>
        )}

        <button className='py-3 bg-gradient-to-r from-green-400 to-teal-600 text-black rounded-md cursor-pointer'>
          {CurrState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2">
  <input type="checkbox" required/>
  <p>Agree to the terms of use & privacy policy</p>
</div>


        <div className='flex flex-col gap-2'>
          {CurrState === "Sign up" ? (
            <p className='text-sm text-gray-600'>
              Already have an account? <span className='font-medium text-violet-500 cursor-pointer' onClick={()=>{setCurrState("login");setIsDataSubmitted(false)}}>Login here</span>
            </p>
          ) : (
            <p className='text-sm text-gray-600'>
              Create an account <span
  className='font-medium text-violet-500 cursor-pointer'
  onClick={() => { setCurrState("Sign up"); setIsDataSubmitted(false); }}
>
  Click here
</span>
            </p>
          )}
        </div>

      </form>
    </div>
  );
};

export default LoginPage;
