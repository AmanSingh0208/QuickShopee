import React from "react";
import "./logo.css"
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function Logo(props) {
    const classes = props.class_name
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'))
    const navigate = useNavigate()
    const handleHome = () =>{
        navigate("/home")
    }

    return(<div className={classes} onClick={handleHome}>{matches?`QuickShopee`:`QS`}</div>)

}