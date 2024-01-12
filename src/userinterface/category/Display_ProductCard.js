import React, { useEffect, useState } from "react";
import { useStyles } from "./ExploreByCategoryCss";
import { serverURL } from "../../administrator/services/FetchNodeServices";
import { Grid,List,ListItem,ListItemButton,Paper,useMediaQuery,ListSubheader,Divider, Button } from "@mui/material";
import {useTheme} from "@mui/material";
import { getData,postData } from "../../administrator/services/FetchNodeServices";
import { useNavigate,useLocation } from "react-router-dom";

export default function ProductCard(props,{getProductListId,data,result,state}){
    var item = props.item
    const theme = useTheme()
    const lg = useMediaQuery(theme.breakpoints.down("lg"))
    const md = useMediaQuery(theme.breakpoints.down("md"))
    const classes = useStyles() 
    const [product,setProduct] = useState([])
    const navigate = useNavigate()
    const location = useLocation()


    const fetchAllProducts=async()=>{
        var result = await getData('userinterface/fetch_all_products')
       
        setProduct(result.data)
    }

    const fetchAllProductsBySubcategory=async()=>{
        var result = await getData('userinterface/fetch_all_products_by_subcategoryid',)
       
        setProduct(result.data)
    }

    useEffect(function(){
        
        fetchAllProducts()
    },[])

    const handleClick=(item)=>{
        // getProductListId(item.productlistid)
        navigate(props.url,{state:{product:item}})
        
    }

    const productList = () =>{
        // return product.map((item)=>{
            return(
                <div onClick={()=>handleClick(item)}>
                    {/* <Grid item xs={md?6:lg?3:2.4} > */}

                            <Paper elevation={0} sx={{padding:"2px 5px",background:"#fff",margin:"2px",height:"16.5rem",width:"10rem",cursor:"pointer"}} variant="outlined" square >
                            <div className={classes.category_product_main} >
                                    
                                        
                                        <div className={classes.category_product_img}><img src={`${serverURL}/images/${item.picture}`} width={md?"50%":"100%"} heigth={md?"50%":"100%"}/></div>
                                        <div className={classes.category_product_name}>{item.productlistname}</div>
                                        <div className={classes.category_product_description}>{item.weight}</div>
                                        <div className={classes.price_button}>
                                        <div className={classes.category_product_price}>
                                            <div className={classes.category_product_rate}>{item.offer==0?<>&#000; ₹{item.rate}</>:<s style={{color:"#BDBDBD"}}>₹{item.rate}</s>}</div>
                                            <div className={classes.category_product_offer}>{item.offer==0?<><p hidden>12</p></>:<>₹{item.offer}</>}</div>
                                            </div>
                                            <div className={classes.category_product_button}><Button variant="outlined" color="error">ADD</Button></div>
                                        </div>
                                
                            </div>
                            </Paper>
                            
                    {/* </Grid> */}
                </div>
            )
        // })
    }

    return(
        <div>
            {/* <div className={classes.category_name_heading}>Detergents (120)</div> */}
                        {/* <Grid container spacing={0}> */}
                            
                            {productList()}
                        {/* </Grid> */}
        </div>
    )
}