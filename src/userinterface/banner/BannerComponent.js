import React, { createRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {serverURL} from "../../administrator/services/FetchNodeServices"
import {useStyles} from "./BannerComponentCss"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";



export default function BannerComponent(props){
    var sliderRef = createRef()
    const theme = useTheme()
    const classes = useStyles()
    const md = useMediaQuery(theme.breakpoints.up("md"));
    const showImages = ()=>{
        return props.images.map((item)=>{
            return(
            <div>
                <img src={`${serverURL}/images/${item}`} width="100%"/>
            </div>)

        })

    }

   


    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2500
        
      };

    // var images = [
    //     {id:2,images:"b2.gif"},
    //     {id:3,images:"b3.gif"},
    //     {id:4,images:"b4.gif"},
    //     // {id:5,images:"b5.gif"},
    //     ]



      const handleBackClick=()=>{
        sliderRef.current.slickPrev()
      }

      const handleForwardClick=()=>{
        sliderRef.current.slickNext()
      }

      return (
        <div className={classes.images}>
          {md?<><div className={classes.leftarrow}>
          <ChevronLeftIcon fontSize="large" onClick={handleBackClick} />
          </div>
          <div className={classes.rightarrow}>
          <ChevronRightIcon fontSize="large" onClick={handleForwardClick} />
          </div></>:<></>}
            <Slider {...settings} ref={sliderRef}>
            
              {showImages()}
          
            </Slider>
          
        </div>
        );
    
}