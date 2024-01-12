import Header from "../../header/Header";
import ProductImages from "./ProductImages"
import { useTheme } from '@mui/material/styles';
import { Grid,useMediaQuery,Divider } from "@mui/material";
import Footer from "../../footer/Footer";
import ProductDetails from "./ProductDetails";
import ProductName from "./ProductName";
import WhyShopQuickshopee from "./WhyShopQuickshopee";
import { useLocation } from "react-router-dom";
import ProductUnit from "./ProductUnit";
import { useStyle } from "./AboutProductCss";
import { useState } from "react";


export default function AboutProduct(props,state){
    window.scroll({top:0,left:0,behavior:'smooth'})


    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
  
    var location=useLocation()
    var classes=useStyle()
    
    
     var product=location.state.product
    
    
      var subcategoryname=location.state.subcategoryname

     const[productlistid,setproductlistid] =useState('')
     const[productWeight,setproductWeight] =useState('')
     const [refresh,setRefresh]=useState(false)

     const getproductlistid=(productlistid,productWeight)=>{
           setproductlistid(productlistid)
           setproductWeight(productWeight)
           }
     
           const refreshPage=()=>{
                 setRefresh(!refresh)
                }




    return(
        <div>
            <Header/>
         <div className={classes.mainDiv}>
        
         <Grid container >
        
             <Grid item xs={!sm ? 12 : 6} >
                  <ProductImages/>
                  <ProductDetails/>
        
             </Grid>
        
        {!sm?<></>:<><Divider orientation="vertical" flexItem  style={{ height:'auto', marginLeft: '2%', marginRight: '1%',border:'1px solid grey',marginTop:'5%' }} /></>}

        <Grid item xs={!sm ? 12 : 5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%',marginTop:'1%' }}>
            
        <ProductName/>
        <Divider/>
            <ProductUnit/>
        <WhyShopQuickshopee/>
             </Grid>        
        
        
        </Grid>
         </div>
        
         <Footer/>
        </div>
          
    )
}