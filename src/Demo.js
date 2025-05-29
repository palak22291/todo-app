import React, { useEffect } from 'react'


const Demo = () => {
    useEffect(()=>{
        console.log("component mounted")
        return console.log("component unmounted")
        

    },[])
   
  return (
    
    <div>demo</div>
  )
}


export default Demo;