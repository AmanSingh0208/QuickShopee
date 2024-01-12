import { useState } from "react";
import { AppBar,Toolbar,useMediaQuery } from "@mui/material";
import {useStyles} from '../header/HeaderCss';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import SearchBar from "../searchbar/SearchBar";
import Logo from "../logo/Logo";
import { useTheme } from "@mui/material/styles";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from '@mui/material';


export default function Header(props){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    const navigate = useNavigate()
    const classes = useStyles()
    var products = useSelector((state)=>state.products)
    var totalproducts = Object.keys(products)


    const handleClick = () =>{
        navigate("/cart")
    }

    
   return (
   
        <div className={classes.header}>
            <div style={{background:"linear-gradient(185deg, rgba(255, 255, 255, 1) 0%, #cedef0 93%)", width:"100rem"}}>
                <Toolbar >
                    <div className={classes.name}>
                    <div className={classes.logo}><Logo class_name={"header__logo"} /><SearchBar/></div>
                    <div className={classes.cart}>
                        <Badge badgeContent={totalproducts.length} color="secondary">
                        {/* <MailIcon color="action" /> */}
                        <ShoppingCartIcon onClick={handleClick} fontSize="large"/>
                        </Badge>
                    </div>
                    <div className={classes.user}><AccountCircleSharpIcon fontSize="large"/></div>
                    </div>
                </Toolbar>
            </div>


        </div>
        
    

    
    
    
    
    )

}

