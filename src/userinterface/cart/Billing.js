import { useState,useEffect } from "react";
import { useStyles } from "./BillingCss";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";

export default function Billing(props){
    const classes = useStyles()
    const cart = useSelector((state)=>state.products)
    const cartData = Object.values(cart)

    useEffect(function(){
        props.pageRefresh()
    })

    var totalOffer = cartData.reduce((p1,p2)=>{
        return p1+(p2.rate*p2.qty)
        },0)

    var totalAmout = cartData.reduce((p1,p2)=>{
        return p1+(p2.rate*p2.qty)
    },0)

    var totalSaving = totalAmout - totalOffer
    
    return(
        <div className={classes.main}>
            <div className={classes.total}>
                <div className={classes.heading1}>Item Total</div>
                <div className={classes.line}>
                <div style={{color:"rgb(167,167,167)"}}><s>&#8377;{totalAmout}</s></div><div style={{marginLeft:"5px"}}>&#8377;{totalOffer}</div>
                </div>
            </div>
            <div className={classes.total}>
                <div className={classes.line}>
                <div style={{color:"rgb(167,167,167)"}}>Handling Charge</div><div style={{marginLeft:"5px",color:"rgb(39, 184, 123)"}}>&#8377;(10 saved)</div>                
                </div>
                <div className={classes.line}>
                <div style={{color:"rgb(167,167,167)"}}><s>&#8377;15</s></div><div style={{marginLeft:"5px",color:"rgb(39, 184, 123)"}}>&#8377;5</div>
                </div>
            </div>
            <div className={classes.total}>
                <div className={classes.line}>
                <div style={{color:"rgb(167,167,167)"}}>Delivery Fee</div><div style={{marginLeft:"5px",color:"rgb(39, 184, 123)"}}>&#8377;(35 saved)</div>                
                </div>
                <div className={classes.line}>
                <div style={{color:"rgb(167,167,167)"}}><s>&#8377;35</s></div><div style={{marginLeft:"5px",color:"rgb(39, 184, 123)"}}>&#8377;0</div>
                </div>
            </div>
            <div className={classes.total}>
                <div className={classes.pay}>To Pay</div>                
                <div className={classes.pay}>&#8377;{totalOffer}</div>
            </div>
            <Divider style={{marginTop:"1rem"}} variant=""/>
        </div>
    )
}