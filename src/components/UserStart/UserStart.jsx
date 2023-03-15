import React,{useRef} from 'react'
import './userStart.css'
const UserStart = ({setUserName}) => {

    const inputRef = useRef()

    const handleClick = () => {
       inputRef.current.value && setUserName(inputRef.current.value)
    }

  return (
    <div className="start">
      <input
        className="startInput"
        placeholder="enter your name"
        ref={inputRef}
      />
      <button className="startButton" onClick={handleClick}>
        Start
      </button>
    </div>
  )
}

export default UserStart