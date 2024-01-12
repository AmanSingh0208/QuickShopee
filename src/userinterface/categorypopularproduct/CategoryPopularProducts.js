import React,{createRef} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {serverURL} from "../../administrator/services/FetchNodeServices"
import {useStyles} from "./CategoryPopularProductsCss"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {Paper,Button} from '@mui/material';
import { Height } from '@mui/icons-material';


export default function CategoryPopularProducts(props){
//   var color = ["#ff9ff3","#feca57","#48dbfb","#54a0ff","#c8d6e5","#686de0","#dff9fb","#BDC581","#D6A2E8","#3B3B98","#FEA47F"]
  
    const theme = useTheme()
    const lg = useMediaQuery(theme.breakpoints.down("lg"));
    const md = useMediaQuery(theme.breakpoints.down("md"));
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    const xs = useMediaQuery(theme.breakpoints.down("xs"));
    

    var sliderRef = createRef()
    const classes = useStyles()
    const showImages = ()=>{
      
        return props.products.map((item)=>{
            return(
              <Paper elevation={0} sx={{margin:"10px 105px",padding:"5px",height:"16.5rem"}}  variant="outlined" square>
            <div style={{width:"100%"}}>
            <div className={classes.category_product_img}><img src={`${serverURL}/images/${item.picture}`} width="120" height="130"/></div>
                                        <div className={classes.category_product_name}>{item.productlistname}</div>
                                        <div className={classes.category_product_description}>{item.weight}</div>
                                        <div className={classes.price_button}>
                                            <div className={classes.category_product_price}>
                                            <div className={classes.category_product_rate}><s>₹{item.rate}</s></div>
                                            <div className={classes.category_product_offer}>₹{item.offer}</div>
                                            </div>
                                            <div className={classes.category_product_button}><Button variant="outlined" sx={{color:"#ff4d4d", borderBlockColor:"#ff4d4d"}}>ADD</Button></div>
                                        </div>
            </div>
            {/* <div className={classes.circle_component_name}>{item.name}</div> */}
            </Paper>)

        })

    }

   


    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: sm?3:md?3:lg?4:6,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2500,
        width:"100%"
        
      };

    // var images = [
        
    //         {id:1,images:"d1.png",name:"Tide Powder ",rate:"150",offer:"120",description:"1Kg Pack"},
    //         {id:2,images:"d2.png",name:"Tide Liquid ",rate:"200",offer:"180",description:"1Ltr Bottle"},
    //         {id:3,images:"d3.png",name:"Ariel Powder",rate:"160",offer:"144",description:"1Kg Pack"},
    //         {id:4,images:"d4.png",name:"Surf Excel Powder ",rate:"180",offer:"153",description:"1Kg Pack"},
    //         {id:5,images:"d5.png",name:"OMO Powder ",rate:"110",offer:"99",description:"1Kg Pack"},
    //         {id:6,images:"d6.png",name:"Persil Powder ",rate:"120",offer:"90",description:"1Kg Pack"},
    //         {id:7,images:"d7.png",name:"Rinso Powder",rate:"100",offer:"79",description:"1Kg Pack"},
    //         {id:8,images:"d8.png",name:"Ariel Active Powder",rate:"250",offer:"200",description:"1Kg Box"},
    //         {id:9,images:"d9.png",name:"Oxi Clean Liquid ",rate:"140",offer:"119",description:"1Ltr Bottle"},
    //         {id:10,images:"d10.png",name:"Comfort Fabric Softner",rate:"299",offer:"249",description:"1Ltr Bottle"},
    //         {id:11,images:"d1.png",name:"Tide Powder ",rate:"150",offer:"120",description:"1Kg Pack"},
    //         {id:12,images:"d2.png",name:"Tide Liquid ",rate:"200",offer:"180",description:"1Ltr Bottle"},
    //         {id:13,images:"d3.png",name:"Ariel Powder",rate:"160",offer:"144",description:"1Kg Pack"},
    //         {id:14,images:"d4.png",name:"Surf Excel Powder ",rate:"180",offer:"153",description:"1Kg Pack"},
    //         {id:15,images:"d5.png",name:"OMO Powder",rate:"110",offer:"99",description:"1Kg Pack"},
    //         {id:16,images:"d6.png",name:"Persil Powder",rate:"120",offer:"90",description:"1Kg Pack"},
    //         {id:17,images:"d7.png",name:"Rinso Powder",rate:"100",offer:"79",description:"1Kg Pack"},
    //         {id:18,images:"d8.png",name:"Ariel Active Powder",rate:"250",offer:"200",description:"1Kg Box"},
    //         {id:19,images:"d9.png",name:"Oxi Clean Liquid",rate:"140",offer:"119",description:"1Ltr Bottle"},
    //         {id:20,images:"d10.png",name:"Comfort Fabric Softner",rate:"299",offer:"249",description:"1Ltr Bottle"},
    //     ]
        



      const handleBackClick=()=>{
        sliderRef.current.slickPrev()
      }

      const handleForwardClick=()=>{
        sliderRef.current.slickNext()
      }

      return (
        <div className={classes.images}>
          <div className={classes.heading}>
            <div className={classes.heading_text}>{props.title}</div>
          <div className={classes.arrows}>
            {md?<></>:<><div className={classes.leftarrow}>
          <ChevronLeftIcon fontSize="large" onClick={handleBackClick} />
          </div>
          <div className={classes.rightarrow}>
          <ChevronRightIcon fontSize="large" onClick={handleForwardClick} />
          </div></>}
          </div>
          </div>
          <div className={classes.slider}>
            <Slider {...settings} ref={sliderRef}>
            
              {showImages()}
          
            </Slider>
            </div>
        </div>
    )
}