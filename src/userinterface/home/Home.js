import { useEffect, useState } from "react";
import { useStyles } from "./HomeCss";
import Header from "../header/Header";
import BannerComponent from "../banner/BannerComponent";
import TrendyProductsBanner from "../trendyproductsbanner/TrendyProductsBanner";
import Footer from "../footer/Footer";
import { Divider } from "@mui/material";
import CustomDivider from "../divider/CustomDivider"
import PopularProducts from "../popular products/PopularProducts";
import CategoryPopularProducts from "../categorypopularproduct/CategoryPopularProducts";
import { postData,getData } from "../../administrator/services/FetchNodeServices";

export default function Home(props){
    const [banners,setBanners] = useState([])
    const [category,setCategory] = useState([])
    const [categoryTrendy,setCategoryTrendy] = useState([])
    const [product,setProduct] = useState([])
    const [productDetergents,setProductDetergents] = useState([])

    const fetchAllBanners=async()=>{
        var result = await getData('userinterface/fetch_all_banners')
        var images = result.data.banners.split(",")
        setBanners(images)
    }

    const fetchAllCategories=async(status)=>{
        var result = await postData('userinterface/fetch_all_category',{status:status})
        if(status=="continue")
        setCategory(result.data)
        else if(status=="trendy")
        setCategoryTrendy(result.data)
    }

    // const fetchAllCategoriesTrendy=async(status)=>{
    //     var result = await postData('userinterface/fetch_all_category',{status:status})
    //     setCategory(result.data)
    // }

    const fetchAllProductsDetergents=async(subcategoryname)=>{
        var result = await postData('userinterface/fetch_products_by_subcategory',{subcategoryname:subcategoryname})
        
        setProductDetergents(result.data)
        
    }
    
    const fetchAllProducts=async()=>{
        var result = await getData('userinterface/fetch_all_products')
       
        setProduct(result.data)
    }
    
    useEffect(function(){
        fetchAllBanners()
        fetchAllCategories("continue")
        fetchAllCategories("trendy")
        fetchAllProducts()
        fetchAllProductsDetergents("Powder & Liquid")
        
    },[])
    const classes = useStyles()
    return(
         
    <div className={classes.main}>
        <div className={classes.header}>
        <Header/>
        </div>
        <div className={classes.body}>
            <div className={classes.bannercomponent}>
                <BannerComponent images={banners}/>
            </div> 
            <div className={classes.trendyproductsbanner}>
                <TrendyProductsBanner category={category} title="Popular Categories"/>
            </div>
            <div className={classes.trendyproductsbanner}>
                <CategoryPopularProducts title="Powder & Liquid" products={productDetergents} />
            </div>
            <div className={classes.popular_products}>
                <PopularProducts product={product} />
            </div>
            <div className={classes.trendyproductsbanner}>
                <TrendyProductsBanner category={categoryTrendy} title="Trending Products"/>
            </div>
            <CustomDivider/>
            <div className={classes.footer}>
                <Footer/>
            </div>
        </div> 
    </div>
    )
}