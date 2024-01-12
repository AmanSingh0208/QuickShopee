import TimerIcon from '@mui/icons-material/Timer';
import { Button,Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductName({product,subcategoryname,productWeight}) {
   
   var navigate=useNavigate()

   const handleClick=()=>{
    navigate(-1)
   }

   var subcategoryname = ["Tide Detergent"]

const [weight,setWeight]=useState(product.weight)

// useEffect(function(){

//     if (productWeight)
//     setWeight(productWeight)

// },[productWeight,weight])
   
   

    const ShowProductName = () => {
            return (
                <div>
                    <div style={{ width: '99%' }}>
                        <div style={{ display: 'flex', width: '99%', padding: 5,  marginTop: '10%', fontFamily: 'Poppins', }}>
                            <div style={{ fontWeight: 'bold', fontSize: 13 }}>
                           
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="home"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
         Home
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center',cursor:'pointer ' }}
          color="inherit"
          onClick={handleClick}
>
          <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {product.subcategoryname || subcategoryname}
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
           <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {product.productlistname}
        </Typography>
      </Breadcrumbs>
  
                            </div>

                        </div>

                        <div style={{ width: '98%', padding: 5, fontFamily: 'Poppins', fontWeight: 'bold', fontSize: 25 }}>
                        {product.productlistname} {weight}
                        </div>

                        <div style={{ display: 'flex', width: '18%',background: '#dfe6e9',padding: 5 }}>
                            <div>
                                <TimerIcon style={{ fontSize: 'medium' }} />
                            </div>

                            <div style={{ fontSize: 14, fontWeight: 'bold',marginLeft: '6%' }}>
                                15-20 min.
                            </div>
                        </div>

                        <div onClick={handleClick} style={{ fontSize: 18,cursor:'pointer', fontWeight: 'bold', color: 'green', fontFamily: 'Poppins',padding: 5 ,marginTop:8,display:'flex',alignItems:'center'}}>
                            View all by  {product.subcategoryname || subcategoryname}<ArrowRightIcon style={{color:'green',fontSize:30}}/>
                        </div>

                    </div>
                </div>
            )
       
    }

    return (
        <div>
            {ShowProductName()}
        </div>

    )
}