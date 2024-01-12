import React from "react";
import { useStyles } from "./CartCss";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useTheme } from '@mui/material/styles';
import { Grid,useMediaQuery,Divider,Paper, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Billing from "../cart/Billing";
import Location from "../cart/Location";
import ProductDetail from "../cart/ProductDetail";
import Tip from "../cart/Tip"
import CustomDivider from "../divider/CustomDivider";
import Offer from "../cart/Offer";
import { useSelector } from "react-redux";

export default function Cart(props,state){
    const classes = useStyles()
    const location = useLocation()
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const cart=useSelector((state)=>state.products)
    const cartData=Object.values(cart)
    const [refresh,setRefresh] = useState(false)
    const [address,setAddress] = useState([])

    const pageRefresh = () =>{
        setRefresh(!refresh)
    }

    return(
        <div>
         <Header/>
         
            <div className={classes.main}>
                
            <div className={classes.cart_heading}>
                <div style={{marginLeft:"1rem",letterSpacing:1}}>Cart ({cartData.length} Items)</div><Button style={{color:"rgb(255,50,105)",border:"1px solid rgb(255,50,105)",marginRight:"1rem"}} variant="outlined">EMPTY</Button>
                </div>
                <div className={classes.sub_main}>
            <div className={classes.components}>
                <div className={classes.outterbox}><ProductDetail pageRefresh={pageRefresh} cartData={cartData}/></div>
                
                <div className={classes.outterbox}><Tip/></div>
            </div>
            
            <div className={classes.components}>
            <div className={classes.outterbox}><Offer/></div>
            <div className={classes.outterbox}><Billing pageRefresh={pageRefresh} /></div>
            <div className={classes.outterbox}><Location address={address} setAddress={setAddress} pageRefresh={pageRefresh}/></div>
            </div>
            </div>
            </div>
            
            <div className={classes.footer}>
            <CustomDivider/>
                <Footer/>
            </div>
         
        </div>
    )
}