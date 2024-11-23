import { useEffect, useRef, useState } from "react";
import { FaArrowUp ,FaArrowDown,FaArrowLeft,FaArrowRight } from "react-icons/fa";

export default function SnakeGame(){

  const Size=15;

  const mat = Array.from({ length: Size }, () => new Array(Size).fill(""));

  const [snakeBody,setSnakeBody]=useState([
    [5,5],
  ]);

  const isSnakeBody=(xc,yr)=>snakeBody.some(([x,y])=>{
    return x===xc && y===yr
  })

  const generateFood=()=>{
    const x=Math.floor(Math.random()*Size)
    const y=Math.floor(Math.random()*Size)
    return [x,y]
  }

  const directionRef=useRef([1,0]);
  const foodRef=useRef(generateFood());


  const isFood=(xc,yr)=> foodRef.current[0]===xc && foodRef.current[1]===yr
  const isSnakeHead=(xc,yr)=> snakeBody[0][0]===xc && snakeBody[0][1]===yr

  function handleDirectionViaControl(e){
    if(e==="Down" && directionRef.current[1]!==-1)
      directionRef.current=[0,1]
    else if(e==="Up" && directionRef.current[1]!==1)
      directionRef.current=[0,-1]
    else if(e==="Left" && directionRef.current[0]!==1)
      directionRef.current=[-1,0]
    else if(e==="Right" && directionRef.current[0]!==-1)
      directionRef.current=[1,0]
  }

  useEffect(()=>{
    const interval1=setInterval(()=>{

      setSnakeBody((prevBody)=>{
        const newHead=[prevBody[0][0]+directionRef.current[0],prevBody[0][1]+directionRef.current[1]]
        if(newHead[0]<0||newHead[0]>=Size||newHead[1]<0||newHead[1]>=Size||prevBody.some(([x,y])=> x===newHead[0] && y===newHead[1]))
          return [
            [5,5],
          ];
          
        const body=[...prevBody];

        if(newHead[0]===foodRef.current[0]&&newHead[1]===foodRef.current[1])
          {foodRef.current=generateFood();}
        else
          {body.pop();}
            
        body.unshift(newHead);
        return body;
      })

  },400)

  function handledirection(e){
    if(e.key==="ArrowDown" && directionRef.current[1]!==-1)
      directionRef.current=[0,1]
    else if(e.key==="ArrowUp" && directionRef.current[1]!==1)
      directionRef.current=[0,-1]
    else if(e.key==="ArrowLeft" && directionRef.current[0]!==1)
      directionRef.current=[-1,0]
    else if(e.key==="ArrowRight" && directionRef.current[0]!==-1)
      directionRef.current=[1,0]
  }

  window.addEventListener("keydown",handledirection);

    return()=>{
      clearInterval(interval1)
      window.removeEventListener("keydown",handledirection)
    }

  },[]);

  return <div className="container">

  <h2>Score:{snakeBody.length-1}</h2>

  <div className="con">
    {
      mat.map((row,yr)=>{
        return row.map((cell,xc)=>{
          return <div className={`cell ${isSnakeBody(xc,yr)?"snake":""} ${isSnakeHead(xc,yr)?"snakeHead":""} ${isFood(xc,yr)?"food":""}`} key={xc}>

          </div>
          })

      })
    }
</div>

<div className="controls">
    <div className="control top" onClick={()=>handleDirectionViaControl("Up")}><FaArrowUp size={30}/></div>
    <div className="control bottom" onClick={()=>handleDirectionViaControl("Down")}><FaArrowDown size={30} /></div>
    <div className="control left" onClick={()=>handleDirectionViaControl("Left")}><FaArrowLeft size={30} /></div>
    <div className="control right" onClick={()=>handleDirectionViaControl("Right")}><FaArrowRight size={30} /></div>
</div>

</div>
}