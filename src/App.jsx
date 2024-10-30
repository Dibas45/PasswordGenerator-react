import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(0)
  const [numberallowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberallowed) str += "0123456789"
    if (charAllowed) str += "!@#$*"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberallowed, charAllowed, setPassword])
   
  const copyPasswordToClipboard= useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password],)

  useEffect(() => {
    passwordGenerator()
  }, [length, numberallowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md h-28 mx-auto shadow-md rounded-lg px-4 my-8 text-orange bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 justify-center'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label>Length: {length}</label>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                checked={numberallowed}
                id="numberInput"
                onChange={() => setNumberAllowed(prev => !prev)}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                checked={charAllowed}
                id="characterInput"
                onChange={() => setCharAllowed(prev => !prev)}
              />
              <label htmlFor="characterInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
