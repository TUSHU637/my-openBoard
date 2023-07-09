import React from 'react'

function Challenges2() {
    let time=new Date().toLocaleDateString;
    const [cTime,setTime]=useState(time);
    const updateButton=()=>{
        setTime(time);
    }
  return (
    <div>
        <h1>{cTime}</h1>
        <button onClick={updateButton}>Get Time</button>
    </div>
  )
}

export default Challenges2