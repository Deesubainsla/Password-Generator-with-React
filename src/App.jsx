import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passGenerate = useCallback(() => {
    let pass= "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]/`;:";

    
    for (let i = 1; i <= length; i++) {
      
      pass += str.charAt(Math.floor(Math.random()*(str.length+1)));
      
    }
    
    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword])

  let Passwordref = useRef(null);

  const copytoclipboard = useCallback(()=>{
    Passwordref.current.select()
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(()=>{ passGenerate()},[length,numberAllowed,charAllowed] );

  return (
    <>
        {/* Heading block */}
    <div className='bg-black h-screen flex justify-center items-center   '>
      <div className='bg-slate-700 flex flex-col p-10 rounded-xl '>
        <h1 className='text-6xl text-white font-bold m-4'>Password Generator</h1>

        {/* input block */}

       <div className=' flex overflow-hidden shadow-lg h-12 mb-4 rounded-xl '>
            <input  type="text" value={password} placeholder='password' 
            className='w-full outline-none text-xl font-medium ' ref={Passwordref}  />
            <button className='bg-blue-700 outline-none shrink-0 rounded font-bold text-white px-5 text-xl' onClick={copytoclipboard}
            >copy</button>
        </div>

        {/* downupdate block */}

        <div className='flex gap-x-12'>
          <div>

          <input type="range" name='slider'
          min={6} max={100}
          value={length} 
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label className='text-white ml-2 font-bold' htmlFor="slider">length:{length}</label>
          </div>

          <div>
          <input className='h-4 w-4 mr-2' type="checkbox" defaultChecked={numberAllowed} id='numbercheck'  onChange={()=>{ setNumberAllowed((prev)=> !prev )}} />
          <label className='text-white font-bold' htmlFor="numbercheck">Number</label>
          </div>

          <div>
          <input className='h-4 w-4 mr-2'  type="checkbox" id='charcheck' defaultChecked={charAllowed} 
          onChange={()=>{setCharAllowed((prev)=> !prev)}}/>
          <label className='text-white font-bold' htmlFor="charcheck">Special Character</label>
          </div>


        </div>

      
      </div>
    </div>
    </>
  )
}

export default App
