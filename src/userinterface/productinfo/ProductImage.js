import React from "react";
import { useState,useEffect } from "react";
import { Grid } from "@mui/material";
import { getData,postData } from "../../administrator/services/FetchNodeServices";
import { serverURL } from "../../administrator/services/FetchNodeServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useLocation } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";


export default function ProductImage(props,result){
    const [productImages,setProductImages] = useState([])
    const [productImageMain,setProductImageMain] = useState([])
    const location = useLocation()

    const fetchProductImages=async()=>{
       var result=await postData("userinterface/fetch_product_images",{productlistname:location.state.productlistname})
       var images=result.data.pictures.split(",")
       setProductImages(images)
       
    }

    const fetchProductImageMain=async()=>{
        var result=await postData("userinterface/fetch_product_image_main",{productlistid:location.state.productlistid})
        setProductImageMain(result.data.picture)
        
     }

    const showProductImageMain=()=>{
        return(
            
                 <div ><img src={`${serverURL}/images/${productImageMain}`} width="100%" height="100%"/></div>
            
        )
    }

    const showProductImages=()=>{
        return(
            productImages.map((item)=>{
                return <div style={{margin:"1rem"}}><img src={`${serverURL}/images/${item}`} width="100rem" height="100rem"/></div>
            })
        )
    }

    

    useEffect(function(){
        fetchProductImages()
        fetchProductImageMain()
    },[])
    return(
        <div style={{alignItems:"center",display:"flex",flexDirection:"column"}}>
            <div style={{padding:"10px",display:"flex",alignItems:"center",justifyContent:"center",}}>
                
                    {showProductImageMain()}
                
            </div>
            <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>{showProductImages()}</div>
            
        </div>
        
            
      
    )
}