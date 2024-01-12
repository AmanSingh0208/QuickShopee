import React, { useState,useEffect } from "react";
import { useStyles } from "./LocationCss";
import { Button } from "@mui/material";
import NumberVerification from "../popups/NumberVerification";
import { useNavigate } from "react-router-dom";


export default function Location(props){
    const classes = useStyles();
    const [status,setStatus] = useState(false)
    const [btnTitle,setBtnTitle] = useState('ADD ADDRESS TO PROCEED')
    const [iconTitle,setIconTitle] = useState('Enter your delivery address')
    var navigate = useNavigate()

    const handleClick = () => {
        if(btnTitle === 'ADD ADDRESS TO PROCEED')
        {setStatus(true)}
        else
        {navigate("/makepayment")}
    }

    useEffect(function(){
        props.pageRefresh()
    })

    const showAddress=()=>{
        console.log("Adressss",props.address)
        return props.address.map((item)=>{
            return(
                <div className={classes.delivery_add}>
                    <div>{item.name}</div>
                    <div>{item.mobileno}, {item.alternateno}</div>
                    <div>{item.addressone}, {item.addresstwo}</div>
                    <div>{item.city}, {item.state}</div>
                    <div>{item.zip}</div>

                </div>
                
            )
        })
    }

    return(
        <div className={classes.main}>
            <div className={classes.head}>
                <div><img src="../../assets/location.png" height="30rem"/></div><div className={classes.text}>{iconTitle}</div>
                
            </div>
            <div className={classes.display_add}>{showAddress()}</div>
            <div><Button variant="contained" sx={{height:"40px",bgcolor:"rgb(255,50,105)",border:"1px solid rgb(255,50,105)"}} onClick={handleClick} fullWidth><div className={classes.btn} >{btnTitle}</div></Button></div>
            <NumberVerification setIconTitle={setIconTitle} address={props.address} setAddress={props.setAddress} setBtnTitle={setBtnTitle} status={status} />
            
        </div>
    )
}