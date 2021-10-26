import { useEffect, useState } from "react"


const useAfterEffect = (effect:any,deps:any)=>{
  const [iteration,setIterations] =  useState(0)

  useEffect(()=>{
    if(iteration > 0){
      effect()
    }else{
      setIterations(iteration+1)
    }
  },[...deps])
}

export default useAfterEffect