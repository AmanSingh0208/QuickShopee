import React, { useEffect, useState } from "react";
import { useStyles } from "./ExploreByCategoryCss";
import Header from "../header/Header"
import { serverURL } from "../../administrator/services/FetchNodeServices";
import { Grid,List,ListItem,ListItemButton,Paper,useMediaQuery,ListSubheader,Divider, Button } from "@mui/material";
import Footer from "../footer/Footer";
import CustomDivider from "../divider/CustomDivider";
import {useTheme} from "@mui/material";
import { getData,postData } from "../../administrator/services/FetchNodeServices";
import { useNavigate,useLocation } from "react-router-dom";







export default function ExploreByCategory(props){
    const theme = useTheme()
    const lg = useMediaQuery(theme.breakpoints.down("lg"))
    const md = useMediaQuery(theme.breakpoints.down("md"))
    const classes = useStyles()
    const [subcategory,setSubcategory] = useState([])
    const [product,setProduct] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    console.log("location",location)

    const fetchAllSubCategories=async()=>{
        var result = await postData('userinterface/fetch_all_subcategory',{categoryid:location.state.categoryid})
       
        setSubcategory(result.data)
    }

    const fetchAllProducts=async()=>{
        var result = await getData('userinterface/fetch_all_products')
       
        setProduct(result.data)
    }

    useEffect(function(){
        fetchAllSubCategories()
        fetchAllProducts()
    },[])

    



    const subcategoryList = ()=>{
        return subcategory.map((item)=>{
            return(
                <div>
                    {/* <div className={classes.category_list}> */}
                    <ListItem disablePadding>
                    
                    <ListItemButton sx={{background:"#FFFFFF"}}> <div className={classes.category_img}><img src={`${serverURL}/images/${item.icon}`} width="34rem" height="40rem"/></div><div className={classes.category_name}>{item.categoryname}</div> </ListItemButton>
                    
                    </ListItem>
                    {/* </div> */}
                    
                </div>
                
            )
        })
    }


    const productList = () =>{
        return product.map((item)=>{
            return(
                // <div>
                    <Grid item xs={md?6:lg?3:2.4} >

                            <Paper elevation={0} sx={{padding:"5px",background:"#fff"}} variant="outlined" square>
                            <div className={classes.category_product_main}>
                                    
                                        
                                        <div className={classes.category_product_img}><img src={`${serverURL}/images/${item.picture}`} width={md?"50%":"100%"} heigth={md?"50%":"100%"}/></div>
                                        <div className={classes.category_product_name}>{item.productlistname}</div>
                                        <div className={classes.category_product_description}>{item.weight}</div>
                                        <div className={classes.price_button}>
                                            <div className={classes.category_product_price}>
                                            <div className={classes.category_product_rate}><s>{item.rate}</s></div>
                                            <div className={classes.category_product_offer}>₹{item.offer}</div>
                                            </div>
                                            <div className={classes.category_product_button}><Button variant="outlined" color="error">ADD</Button></div>
                                        </div>
                                
                            </div>
                            </Paper>
                            
                    </Grid>
                // </div>
            )
        })
    }

    
      
        
    

    return(
        <div>
            <Header/>
            <div className={classes.main} style={{margin:md?"0%":lg?"0% 2%":"0% 4%"}}>
                <div className={classes.grid_category}>
                <Grid container spacing={2}>
                    <Grid item xs={md?5:lg?3.5:2.5}>
                        
                        <Paper elevation={1} sx={{padding:"5px"}} square>
                        <div  className={classes.category_heading}>Categories</div>
                        <Divider/>
                        <List 
                          sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: '#F0FFFF',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 550,
                            
                            '& ul': { padding: 0 },
                          }}
                          
                        >
                             <div className={classes.container_body}>{subcategoryList()}</div>
        
                        </List>
                        
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={md?7:lg?8.5:9.5}>
                        <div className={classes.category_name_heading}>Detergents (120)</div>
                        <Grid container spacing={0}>
                            
                            {productList()}
                        </Grid>
                            
                    </Grid>
                </Grid>
                </div>
                <CustomDivider/>
                <Footer/>
            </div>
            
        </div>
    )
}