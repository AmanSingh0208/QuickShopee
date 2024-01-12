import React, { useEffect, useState } from "react";
import { useStyles } from "./ExploreByCategoryCss";
import Header from "../header/Header"
import { serverURL } from "../../administrator/services/FetchNodeServices";
import { Grid,List,ListItem,ListItemButton,Paper,useMediaQuery,ListSubheader,Divider, Button } from "@mui/material";
import Footer from "../footer/Footer";
import CustomDivider from "../divider/CustomDivider";
import {useTheme} from "@mui/material";
import { getData,postData } from "../../administrator/services/FetchNodeServices";
import { useNavigate,useLocation } from "react-router-dom";

export default function TypeList({data,getSubcategoryId}){
    const theme = useTheme()
    const lg = useMediaQuery(theme.breakpoints.down("lg"))
    const md = useMediaQuery(theme.breakpoints.down("md"))
    const classes = useStyles()
    const [subcategory,setSubcategory] = useState([])
    const [subcategoryName,setSubcategoryName] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    

    // const fetchAllSubCategories=async()=>{
    //     var result = await postData('userinterface/fetch_all_subcategory',{categoryid:location.state.categoryid})
       
    //     setSubcategory(result.data)
    // }

    // const listView = () =>{
    //     return data.map
    // }

    const handleClick=(item)=>{
        getSubcategoryId(item.subcategoryid,item.subcategoryname)
        // getSubcategoryName(item.subcategoryname)
    }

    

    const subcategoryList = ()=>{
        return data.map((item)=>{
            return(
                <div>
                    {/* <div className={classes.category_list}> */}
                    <ListItem  disablePadding>
                    
                    <ListItemButton sx={{background:"#FFFFFF"}} onClick={()=>{handleClick(item)}} > <div className={classes.category_img}><img src={`${serverURL}/images/${item.icon}`} width="34rem" height="40rem"/></div><div className={classes.category_name}>{item.subcategoryname}</div> </ListItemButton>
                    
                    </ListItem>
                    {/* </div> */}
                    
                </div>
                
            )
        })
    }

    return(
        <div>
            
            
                
                
                    
                        
                        <Paper elevation={1} sx={{padding:"5px"}} square>
                        <div  className={classes.category_heading}>Sub-Categories</div>
                        <Divider/>
                        <List 
                          sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: '#F0FFFF',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 550,
                            
                            '& ul': { padding: 0 },
                          }}
                          
                        >
                             <div className={classes.container_body}>{subcategoryList()}</div>
        
                        </List>
                        
                        </Paper>
                
                    
                    
                
                </div>
                
            
            
        
    )
}