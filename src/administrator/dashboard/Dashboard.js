import { useState } from "react";
import { Grid,AppBar,Toolbar,Paper,Avatar } from "@mui/material";
import { serverURL } from "../services/FetchNodeServices";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import { Navigate, useNavigate } from "react-router-dom";
import { Routes,Route } from "react-router-dom";
import CategoryInterface from "../categories/CategoryInterface";
import DisplayAllCategory from "../categories/DisplayAllCategory";
import SubcategoryInterface from "../subcategories/SubcategoryInteraface";
import DisplayAllSubcategory from "../subcategories/DisplayAllSubcategory";
import ProductInterface from "../products/ProductInterface";
import DisplayAllProducts from "../products/DisplayAllProducts";
import DisplayProducts from "../products/DisplayProducts";
import ProductsList from "../productlist/ProductsList";
import DisplayAllProductsList from "../productlist/DisplayAllProductsList";
import BannersInterface from "../banners/BannersInterface";
import ProductPictures from "../productpictures/ProductPictures";


export default function Dashboard(){
    var admin = JSON.parse(localStorage.getItem("ADMIN"))
    console.log("ADMINNN",admin)
    const navigate = useNavigate()
    return(<div>

        <AppBar >
            <Toolbar style={{background:"radial-gradient(ellipse at 7% 23%, rgba(169, 222, 218, 1) 0%, rgba(252, 236, 255, 1) 100%)"}}>
                <div  style={{color:"#000",fontFamily:"Pacifico"  , fontSize:33, letterSpacing:2.5, padding:5, }}>
                    QuickShopee
                </div>
            </Toolbar>
            
        </AppBar>
        <div style={{marginTop:'5%'}}>
                    <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper elevation={3} style={{display:"flex",flexDirection:"column",margin:5,padding:5,marginBottom:10}}>
                        <div style={{justifyContent:"center",paddingLeft:10,paddingTop:10}}>
                        <Paper elevation={5} style={{width:"92%",height:150,padding:"10px 0px 10px 10px", display:'flex',flexDirection:"column",alignItems:"center",justifyContent:"center",background:"radial-gradient(ellipse at 7% 23%, rgba(169, 222, 218, 1) 0%, rgba(252, 236, 255, 1) 100%)"}}>
                            
                            <div style={{padding:5}}><Avatar src={`${serverURL}/images/${admin.picture}`} style={{width:70,height:70 }}/></div>
                            <div style={{fontFamily:"Poppins",fontWeight:'700',padding:5}}>
                            {admin.adminname}
                            </div>
                            
                            <div style={{fontFamily:"Poppins",fontWeight:'550'}}>{admin.emailid}</div>
                        </Paper>
                        
                        </div>
                        
                        
                        <List >
                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate("/dashboard/displayallcategory")}>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={<div style={{fontFamily:"Poppins",fontWeight:700}}>Category</div>} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate("/dashboard/displayallsubcategory")}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={<div style={{fontFamily:"Poppins",fontWeight:700}}>Sub-Category</div>} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate("/dashboard/displayallproducts")}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={<div style={{fontFamily:"Poppins",fontWeight:700}}>Product</div>} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate("/dashboard/displayallproductslist")}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={<div style={{fontFamily:"Poppins",fontWeight:700}}>Products List</div>} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate("/dashboard/productpictures")}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={<div style={{fontFamily:"Poppins",fontWeight:700}}>Product Pictures</div>} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate("/dashboard/bannerinterface")}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={<div style={{fontFamily:"Poppins",fontWeight:700}}>Banner</div>} />
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                            <ListItem disablePadding>
                                <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={<div style={{fontFamily:"Poppins",fontWeight:700}}>Logout</div>} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Paper>

                </Grid>
                <Grid item xs={9} >
                    <Routes>
                        <Route element={<CategoryInterface/>} path="/categoryinterface" />
                        <Route element={<DisplayAllCategory/>} path="/displayallcategory" />
                        <Route element={<SubcategoryInterface/>} path="/subcategoryinterface" />
                        <Route element={<DisplayAllSubcategory/>} path="/displayallsubcategory" />
                        <Route element={<ProductInterface/>} path="/productinterface" />
                        <Route element={<DisplayAllProducts/>} path="/displayallproducts" />
                        <Route element={<ProductsList/>} path="/productslist" />
                        <Route element={<DisplayProducts/>} path="/displayproductslist" />
                        <Route element={<DisplayAllProductsList/>} path="/displayallproductslist" />
                        <Route element={<BannersInterface/>} path="/bannerinterface" />
                        <Route element={<ProductPictures/>} path="/productpictures" />
                    </Routes>
                </Grid>
            </Grid>
            </div>


        </div>
    )
}

