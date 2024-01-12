import React, { useState } from "react";
import { useStyles } from "./ProductDetailCss";
import { Grid,Button, Divider, Paper } from "@mui/material";
import { serverURL } from "../../administrator/services/FetchNodeServices";
import PlusMinusComponent from "../plusminuscomponent/PlusMinusComponent";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetail(props,cartData,value){
const classes = useStyles()
const dispatch = useDispatch()


const handleQtyChange=(selectedProduct,value)=>{
    var product = selectedProduct
    if(value>=1)
    
    {
        product['qty']=value
        dispatch ({type:'ADD_PRODUCT',payload:[product.productlistid,product]})
    }
    else
    {
        product['qty']=0
        dispatch ({type:'DELETE_PRODUCT',payload:[product.productlistid,product]})
    }

        props.pageRefresh()
    }


                const showImages = ()=>{
      
                    return props.cartData.map((item)=>{
                        return(
                            <div >
                                <Grid container spacing={5} sx={{display:"flex",alignItems:"center",padding:"15px"}}>
                                    <Grid item xs={2}><img src={`${serverURL}/images/${item.picture}`} height="60rem" width="50rem"/></Grid>
                                    <Grid item xs={7}><div><div className={classes.name} style={{}}>{item.productlistname}</div>
                                    <div className={classes.weight} style={{}}>{item.weight}</div>
                                    <div className={classes.rate} style={{}}>
                                    {item.offer==0?<div className={classes.offer} >&#8377;{item.rate*item.qty}</div>:<><div className={classes.offer} style={{}}>&#8377;{item.offer*item.qty}</div>
                                    <div className={classes.price} style={{}}><s>&#8377;{item.rate*item.qty}</s></div></>}</div>
                                    </div>
                                    </Grid>
                                    <Grid item xs={3} sx={{paddingRight:"1rem"}}><PlusMinusComponent onChange={(value)=>handleQtyChange(item,value)} qty={item.qty}/></Grid>
                                </Grid>
                                <Divider fullWidth/>
                            </div>
                            
                          )
            
                    })
            
                }
            
    

return(
    <div>
        {showImages()}
    
    </div>
)
}