import { useState,useEffect } from "react";
import { useStyles } from "../products/ProductCss";
import {  Avatar,Grid,TextField,FormControl,Select,InputLabel,MenuItem, IconButton,Button  } from "@mui/material";
import { postData,getData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import PhotoCamera from "@mui/icons-material/PhotoCamera";



export default function ProductInterface()
{
   const classes=useStyles()
   const [categoryId,setCategoryId]=useState('')
   const [subCategoryId,setSubCategoryId]=useState('')
   const [description,setDescription]=useState("")
   const [product,setProduct]=useState('')
   const [status,setStatus]=useState('')
   const [icon,setIcon]=useState({file:"/assets/Icon.gif",bytes:''})
   const [categoryList,setCategoryList]=useState([])
   const [subCategoryList,setSubCategoryList]=useState([])
   const [error,setError]=useState({})


   useEffect(function(){
    fetchAllCategory()
   },[])

   const fetchAllCategory=async()=>{
    var result=await getData('category/category_list')
    setCategoryList(result.data)
   }

   const fillCategory=()=>{
    return categoryList.map((item)=>{
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
   }

   useEffect(function(){
    fetchAllSubCategory()
   },[])

   const fetchAllSubCategory=async(cid)=>{
    var result=await postData("subcategory/subcategory_list_by_categoryid",{categoryid:cid})
   setSubCategoryList(result.data)
   console.log(result.data)
    }

    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    }

    const fillSubCategory=()=>{
        return subCategoryList.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }


   const handlePicture=(event)=>{
    setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    handleError("icon",null)
   }

   const handleError=(input,value)=>{
    setError(prev=>({...prev,[input]:value}))
   }

   const validation=()=>{
    var isValid=true
    if(!categoryId){
        handleError("categoryId","Please select a category...")
        isValid=false
    }
    if(!subCategoryId){
        handleError("setSubCategoryId","Please select a subcategory...")
        isValid=false
    }
    if(!product){
        handleError("product","Please input product...")
        isValid=false
    }
    if(!description){
        handleError("description","Please select a category...")
        isValid=false
    }
    if(!status){
        handleError("status","Please select a category...")
        isValid=false
    }
    if(!icon.bytes){
        handleError("icon","Please select a category...")
        isValid=false
    }
    return isValid
   }

   const handleClick=async()=>{
    if(validation())
    {
        var formData = new FormData()
        formData.append("categoryid",categoryId)
        formData.append("subcategoryid",subCategoryId)
        formData.append("product",product)
        formData.append("description",description)
        formData.append("status",status)
        formData.append("icon",icon.bytes)
        var result=await postData("product/product_submit", formData)
        console.log(result)
    
    if(result.status){
        Swal.fire({
            icon:'success',
            title:result.message,
            showConfirmButton:false,
            timer:2000
        })
    }

    else{
        Swal.fire({
            icon:"error",
            title:result.message,
            showConfirmButton:false,
            timer:2000,
        })
         }
    
    }
}

   

   return(
    <div className={classes.container}>
        <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.font}>
                    Add New Product
                    </div>
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select labelId="demo-simple-sekect-lable" label="Category" value={categoryId} id="demo-simple-select" error={error.categoryId?true:false} onFocus={()=>handleError('categoryId',null)} onChange={handleCategoryChange}>    
                            {fillCategory()}                       
                        </Select>
                </FormControl>
                <div className={classes.errorText}>{error.categoryId}</div>
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
                        <Select labelId="demo-simple-sekect-lable" label="Subcategory" value={subCategoryId} id="demo-simple-select" error={error.subCategoryId?true:false} onFocus={()=>handleError('subCategoryId',null)} onChange={(event)=>{setSubCategoryId(event.target.value)}}>    
                            {fillSubCategory()}                       
                        </Select>
                </FormControl>
                <div className={classes.errorText}>{error.subCategoryId}</div>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Product" variant="outlined" helperText={error.product} error={error.product?true:false} onFocus={()=>handleError('product',null)} onChange={(event)=>{setProduct(event.target.value)}} fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Product Description" variant="outlined" error={error.description?true:false} helperText={error.description} onFocus={()=>handleError("description",null)} onChange={(event)=>{setDescription(event.target.value)}} fullWidth/>
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select labelId="demo-simple-sekect-lable" label="Status" id="demo-simple-select" error={error.status?true:false} onFocus={()=>handleError("status",null)} onChange={(event)=>{setStatus(event.target.value)}} >    
                            <MenuItem value="continue">Continue</MenuItem>
                            <MenuItem value="discontinue">Discontinue</MenuItem>
                            <MenuItem value="popular">Popular</MenuItem>
                            <MenuItem value="trendy">Trendy</MenuItem>                            
                        </Select>
                </FormControl>
                <div className={classes.errorText}>{error.status}</div>
                </Grid>
                <Grid item xs={4}>
                    <IconButton color="primary" aria-label="upload picture" component="label" sx={{width:55, height:55}} >
                    <input onChange={handlePicture} type="file" hidden accept="image/*"/>
                    <PhotoCamera/>
                    </IconButton>
                    <div className={classes.errorText}>{error.icon}</div>
                </Grid>
                <Grid item xs={3}>
                    <Avatar alt="Icon" src={icon.file} sx={{width:55,height:55}}/>
                </Grid>
                
                <Grid item xs={6}>
                    <Button variant="contained" fullWidth onClick={handleClick} className={classes.boton}>Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    
                    <Button variant="contained" fullWidth className={classes.boton}>Reset</Button>
                    

                </Grid>

            </Grid>
            
        </div>

    </div>
    
)
}