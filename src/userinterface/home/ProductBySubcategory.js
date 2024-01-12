import React, { useEffect, useState } from "react";
import { useStyles } from "./ProductBySubcategoryCss";
import Header from "../header/Header"
import { serverURL } from "../../administrator/services/FetchNodeServices";
import { Grid,useMediaQuery } from "@mui/material";
import Footer from "../footer/Footer";
import CustomDivider from "../divider/CustomDivider";
import {useTheme} from "@mui/material";
import { getData,postData } from "../../administrator/services/FetchNodeServices";
import { useNavigate,useLocation } from "react-router-dom";
import TypeList from "../category/Subcategory_List"
import ProductCard from "../category/Display_ProductCard";


export default function ProductBySubategory(props,result){
    const theme = useTheme()
    const lg = useMediaQuery(theme.breakpoints.down("lg"))
    const md = useMediaQuery(theme.breakpoints.down("md"))
    const [subcategory,setSubcategory] = useState([])
    const [subcategoryName,setSubcategoryName] = useState('')
    const [subcategoryId,setSubcategoryId] = useState('')
    const [productList,setProductList] = useState([])
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()
    

    const fetchAllSubCategories=async()=>{
        var result = await postData('userinterface/fetch_all_subcategory',{categoryid:location.state.categoryid})
        setSubcategory(result.data)
        // setSubcategoryName(result.data.subcategoryname)
    }

    const fetchAllProductsBySubCategories=async(scid)=>{
        var result = await postData('userinterface/fetch_all_products_by_subcategoryid',{subcategoryid:scid})
        setProductList(result.data)
    }

    const fetchAllProductsByCategories=async()=>{
        var result = await postData('userinterface/fetch_all_products_by_categoryid',{categoryid:location.state.categoryid})
        setProductList(result.data)
    }

    const getSubcategoryId = (scid,sname) =>{
        setSubcategoryName(sname)
        setSubcategoryId(scid)
        fetchAllProductsBySubCategories(scid)
    }

    useEffect(function(){
        fetchAllSubCategories()
        fetchAllProductsByCategories()
    },[])

    const listOfProducts=()=>{
        return productList.map((item)=>{
            return <ProductCard item={item} url={"/productorderdetail"}/>
        })
    }

   


    return(
        <div>
            <Header/>
            <div className={classes.main} style={{margin:md?"0%":lg?"0% 2%":"0% 4%"}}>
                <div className={classes.grid_category}>
                <Grid container spacing={2}>
                    <Grid item xs={md?5:lg?3.5:2.5}>
                        
                        <TypeList data={subcategory} getSubcategoryId={getSubcategoryId} />
                    </Grid>
                    
                    <Grid item xs={md?7:lg?8.5:9.5}>
                        <div className={classes.category_name_heading} >{productList.length==0?<>Product Not Available</>:<>{subcategoryName} ({productList.length})</>}</div>
                        <Grid container spacing={0}>
                        <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                            {listOfProducts()}
                        </div>
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