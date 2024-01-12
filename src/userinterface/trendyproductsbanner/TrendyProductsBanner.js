import React,{createRef} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {serverURL} from "../../administrator/services/FetchNodeServices"
import {useStyles} from "./TrendyProductsBannerCss"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

export default function TrendyProductsBanner(props){
  var color = ["#ff9ff3","#feca57","#48dbfb","#54a0ff","#c8d6e5","#686de0","#dff9fb","#BDC581","#D6A2E8","#3B3B98","#FEA47F"]
    const navigate = useNavigate()
    const theme = useTheme()
    const lg = useMediaQuery(theme.breakpoints.down("lg"));
    const md = useMediaQuery(theme.breakpoints.down("md"));
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    const xs = useMediaQuery(theme.breakpoints.down("xs"));
    

    var sliderRef = createRef()
    const classes = useStyles()
    const showImages = ()=>{
        return props.category.map((item)=>{
            return(<div className={classes.circle_component_main} onClick={()=>handleClick(item)}>
            <div style={{width:"100%",justifyContent:"center",}}>
              <div className={classes.circle_component_image} style={{background:color[parseInt(Math.random()*(color.length-1))],width:sm?"4rem":"8.5rem",height:sm?"4rem":"8.5rem",margin:sm?"0rem 1rem":"0rem 2rem"}}>
                  <img src={`${serverURL}/images/${item.icon}`} width="70%" height="75%"/>              
              </div>
            </div>
            <div className={classes.circle_component_name}>{item.categoryname}</div>
            </div>)

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

   
      const handleBackClick=()=>{
        sliderRef.current.slickPrev()
      }

      const handleForwardClick=()=>{
        sliderRef.current.slickNext()
      }

      const handleClick=(item)=>{
        navigate('/productbysubcategory',{state:{categoryid:item.categoryid}})
      }

      return (
        <div className={classes.images} >
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