import { Paper,TextField,Button } from "@mui/material";
import React from "react";


export default function Tip(){


    return(
        <div style={{padding:"20px 15px"}}>
        <div style={{fontFamily:"roboto",fontWeight:'700',fontSize:'16px',lineHeight:"24px",color:"rgb(0,0,0)"}}>Delivery Partner Tip</div>
        <div style={{marginTop:10,marginBottom:15,color:"rgb(167, 167, 169)"}}>The entire amount will be sent to your delivery partner</div>
        <div>
           
            <Button variant="outlined" sx={{marginRight:1.2,width:80,height:"30px",borderRadius:"15px",color:'rgb(43,30,53)',borderColor:'rgb(211,209,213)'}}><img src="assets/coin.png" style={{height:20,width:20}}/>&#8377;10</Button>
            <Button variant="outlined" sx={{marginRight:1.2,width:80,height:"30px",borderRadius:"15px",color:'rgb(43,30,53)',borderColor:'rgb(211,209,213)'}}><img src="assets/coin.png" style={{height:20,width:20}}/>&#8377;20</Button>
            <Button variant="outlined" sx={{marginRight:1.2,width:80,height:"30px",borderRadius:"15px",color:'rgb(43,30,53)',borderColor:'rgb(211,209,213)'}}><img src="assets/coin.png" style={{height:20,width:20}}/>&#8377;30</Button>
            <Button variant="outlined" sx={{marginRight:1.2,width:80,height:"30px",borderRadius:"15px",color:'rgb(43,30,53)',borderColor:'rgb(211,209,213)'}}><img src="assets/coin.png" style={{height:20,width:20}}/>&#8377;50</Button>
        </div>
        </div>)
}