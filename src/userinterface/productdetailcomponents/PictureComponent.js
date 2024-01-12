import React, { createRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { postData, serverURL } from "../../administrator/services/FetchNodeServices";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery,Box } from "@mui/material";

export default function PictureComponent({product}){
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const xs = useMediaQuery(theme.breakpoints.up('xs'));
    var slider = createRef()
    const [img,setImg] = useState()
    const [clr,setClr] = useState()
    const [images,setImages] = useState([])
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZ",product)
    // var images = ["d1.png","d2.png","d3.png","d4.png","d5.png","d6.png","d7.png","d8.png","d9.png","d10.png"]

    function PlayImages() {
        return images.map((item, i) => {
            return (
                // <div ><img src={`${serverURL}/images/${item}`} style={{ width: '40%', height: '40%', marginLeft: sm?95:md?120:lg?160:180, marginTop: sm?40:md?80:lg?100:120 }} /></div>
                <div> <div onClick={() => {
                    setImg(item)
                    setClr(i)
                }} style={{ width: 70, height: 70,margin:5, borderRadius: 5, border: (clr == i) ? 'solid 2px blue' : 'solid 0.5px lightgrey', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <img src={`${serverURL}/images/${item}`} style={{ width: '80%', height: '80%' }} />
                </div></div>
            )
        })
    }

    const fetchProductPictures=async()=>{
        
        var result = await postData("userinterface/fetch_productpicture_by_productlistid",{productlistid:product.productlistid})
        // console.log("xxxxxxxxxxxxxxxxxx",result.data)
       var pic = result.data[0].pictures.split(",")
        setImg(pic[0])
        setImages(pic)
             
    }

    useEffect(function(){
        fetchProductPictures() 
    },[])

    function handleLeftClick() {
        slider.current.slickPrev()
    }
    function handleRightClick() {
        slider.current.slickNext()
    }

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: md ? 6 : sm ? 3 : xs ? 3 : 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 4000,
        arrow: false
    };

    return(
        <div>
                  <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', marginTop: 25}}>
                    <div style={{ width: '80%' }}>
                    <Box sx={{ width: !sm?400:500, height: !sm?300: 350, alignSelf: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    
                                
                                  
                                    <img src={`${serverURL}/images/${img}`} style={{ width: '65%',height:'85%' }} /> 
                                </Box>
                                <div style={{ cursor:'pointer', position: 'relative',marginLeft: sm?'':'9%', border: 'none', width:  !sm?'90%':'100%', alignSelf: 'center', marginBottom: 15 }}>
                                    <div style={{ background: '#fff', width: 25, height: 25, borderRadius: 15,justifyContent:'center', display: 'flex', alignItems: 'center', position: 'absolute', zIndex: 1, left: '-8%', top: '35%', opacity: 0.6, boxShadow: '0 0 10px rgba(0,0,0,.5)' }}>
                                        <NavigateBeforeIcon onClick={handleLeftClick} fontSize="large" />
                                    </div>
    
                                    <Slider ref={slider} {...settings} >
                                        {PlayImages()}
                                    </Slider>
    
                                    <div style={{ background: '#fff', width: 25, height: 25, borderRadius: 15, display: 'flex',justifyContent:'center', alignItems: 'center', position: 'absolute', zIndex: 1, right: '-8%', top: '35%', opacity: 0.6, boxShadow: '0 0 10px rgba(0,0,0,.5)' }}>
                                        <NavigateNextIcon onClick={handleRightClick} fontSize="large" />
                                    </div>
                                </div>
                                </div>
                               
                                </div>
                               
                        
        </div>
    )
}