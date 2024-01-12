import { useState,useEffect } from "react";
import { Button } from "@mui/material";

export default function PlusMinusComponent(props){
    const [value,setValue] = useState()

    useEffect(()=>{
        setValue(props.qty)
    },[props])
    const handlePlusClick=()=>{
        
        setValue((prev)=>{
            if(prev<=100)
           { props.onChange(prev+1)
            return prev+1}
            else 
            { props.onChange(prev)
                return prev}
        })
    }

    const handleMinusClick=()=>{
        
        setValue((prev)=>{
            if(prev>=1)
            { props.onChange(prev-1)
            return prev-1}
        })
    }

    return(
        <div>
            <div style={{}}>
               {value==0?<Button onClick={handlePlusClick} variant="contained" sx={{bgcolor:"rgb(255,50,105)"}} >ADD</Button>:
               <div style={{width:"6rem",display:"flex",alignItems:"center",justifyContent:"space-between",border:"2px solid rgb(255,50,105)",borderRadius:5,height:36}}>
                
                <div onClick={handleMinusClick}  style={{ fontWeight:400,fontSize:18,backgroundColor:"rgb(255,50,105)",color:"#fff",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",height:36,width:"2.5rem"}}>-</div>
                <div style={{fontWeight:400,fontSize:18,backgroundColor:"rgb(255,50,105)",color:"#fff",width:"2rem",height:36,display:"flex",justifyContent:"center",alignItems:"center"}}>{value}</div>
                <div onClick={handlePlusClick} style={{fontWeight:400,fontSize:18,backgroundColor:"rgb(255,50,105)",color:"#fff",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",height:36,width:"2.5rem"}} >+</div>
                
               
               </div>}
            </div>
        </div>
    )
}