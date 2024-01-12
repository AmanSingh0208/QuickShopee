import React from "react";
import { useStyles } from "./OfferCss";
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
export default function Offer(){
    const classes = useStyles()
    return(
        <div className={classes.main}>
            <div className={classes.submain}>
            <div style={{marginRight:"6px"}}><img src="../../assets/discount.png" height="22px" width="20px"/></div>
            <div>Available Offers / Coupons</div>
            </div>
            <ArrowRightRoundedIcon fontSize="large" sx={{color:"rgb(255,50,105)"}}/>
        </div>
    )
}