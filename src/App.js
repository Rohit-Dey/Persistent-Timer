
import React, { useEffect, useState } from "react";

function App() {
  const[isActive, setIsActive] = useState(false);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  function handleStart(){
    setIsActive(true);
  }

  function handleReset(){
    setSec(0);
    setMin(0);
    setIsActive(false);
  }

  useEffect(() => {
    const data = window.localStorage.getItem('sec')
    if(JSON.parse(data) !== 0){
      setIsActive(true)
      setSec(JSON.parse(data));
    }
  }, [])

  useEffect(() => {
    const dataMin = window.localStorage.getItem('min')
    if(JSON.parse(dataMin) !== 0){
      setIsActive(true)
      setMin(JSON.parse(dataMin));
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('sec', JSON.stringify(sec))
  }, [sec])

  useEffect(() => {
    window.localStorage.setItem('min', JSON.stringify(min))
  }, [min])

  useEffect(() =>{
    console.log(sec)
    if(isActive){
      if(sec === 60){
        setMin(min+1);
        setSec(0)
      }
      const secId = setInterval(() => setSec((sec) => (sec+1)), 1000);
        
      return() => {
        clearInterval(secId);
      }
    }
  }, [isActive, sec, min])
  

  return (
    <>
     <div>{min} : {sec}</div>
     <div>{isActive ? <button onClick={handleReset}>Reset</button> : <button onClick={handleStart}>Start Mission</button>}</div>
    </>
  );
}

export default App;
