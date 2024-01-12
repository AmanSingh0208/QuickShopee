import React from "react";
import { Grid,Paper,useMediaQuery,useTheme,Button } from "@mui/material";
import { serverURL } from "../../administrator/services/FetchNodeServices";
import { useStyles } from "./PopularProductsCss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import zIndex from "@mui/material/styles/zIndex";

export default function PopularProducts(props){
    const theme = useTheme()
    const lg = useMediaQuery(theme.breakpoints.down("lg"))
    const md = useMediaQuery(theme.breakpoints.down("md"))
    const sm = useMediaQuery(theme.breakpoints.down("sm"))
    const classes = useStyles()

    
    const popular_products_list=()=>{
        return props.product.map((item)=>{
            return(
                <Grid item xs={sm?6:md?4:lg?3:2} >
                            
                            <Paper elevation={0} sx={{padding:"5px",height:"16.5rem",margin:"5px"}} variant="outlined" square>
                            <div className={classes.category_product_main}>
                                    
                                        
                                        <div className={classes.category_product_img}><img src={`${serverURL}/images/${item.picture}`} width={sm?"60%":md?"80%":"100%"} heigth={sm?"60%":md?"80%":"100%"}/></div>
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
                            
                            
                    </Grid>
            )
        })
    }

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: sm?2:md?3:lg?4:6,
        // centerPadding:"200px",
        // row:3,
        variableWidth:"100px",
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2500,
        width:"2rem",
    
        
      };

    return(
        <div>
            <div className={classes.heading}>Popular Products</div>
            <div>
            {/* <Slider {...settings}> */}
            <Grid container spacing={2} >
                {popular_products_list()}
            </Grid>
            {/* </Slider> */}
            </div>
        </div>
    )
}