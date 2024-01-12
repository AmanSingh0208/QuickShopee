import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import { Grid,useMediaQuery,Divider } from "@mui/material";
import { useStyle } from "./ProductDetailCss";
import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import PictureComponent from "../productdetailcomponents/PictureComponent";
import CustomDivider from "../divider/CustomDivider";
import ProductDetails from "../AboutProduct/AboutProduct/ProductDetails";
import NameComponent from "../productdetailcomponents/NameComponent";
import WhyShopQuickshopee from "../AboutProduct/AboutProduct/WhyShopQuickshopee";
import UnitComponent from "../productdetailcomponents/UnitComponent";


export default function ProductOrderDetail(props,state){
    window.scroll({top:0,left:0,behavior:'smooth'})


    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md')); 
    var location=useLocation()
    var classes=useStyle()
    
    
    var product=location.state.product
    
    
    //   var subcategoryname=location.state.subcategoryname

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
                  <PictureComponent product={product} />
                  <Divider style={{margin:"1rem 0"}}/>
                  <ProductDetails/>
        
             </Grid>
        
        {!sm?<></>:<><Divider orientation="vertical" flexItem  style={{ height:'auto', marginLeft: '1%', marginRight: '2%',marginTop:'5%' }} /></>}

        <Grid item xs={!sm ? 12 : 5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%',marginTop:'1%' }}>
            
        <NameComponent product={product}/>
        <Divider style={{margin:"1rem 0"}}/>
            <UnitComponent product={product} refreshPage={refreshPage}/>
        <Divider style={{margin:"1rem 0"}}/>
        <WhyShopQuickshopee/>
             </Grid>        
        
        
        </Grid>
         </div>
         <div className={classes.footer}>
            <CustomDivider/>
                <Footer/>
            </div>
        </div>
          
    )
}