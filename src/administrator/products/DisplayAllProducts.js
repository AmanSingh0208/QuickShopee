import React from "react";
import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { getData, serverURL } from "../services/FetchNodeServices";
import { Grid, TextField,FormControl,InputLabel,Select,MenuItem, IconButton,Avatar, Button } from "@mui/material";
import { useStyles } from "../products/ProductCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { postData } from "../services/FetchNodeServices";
import { Swal } from "sweetalert2";
import { PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function DisplayAllProducts(){
    const navigate = useNavigate()
const classes=useStyles()
const [productList,setProductList]=useState([])
const [open,setOpen]=useState(false)
const [categoryId,setCategoryId]=useState('')
const [subCategoryId,setSubCategoryId]=useState('')
const [productName,setProductName]=useState('')
const [description,setDescription]=useState('')
const [status,setStatus]=useState('')
const [picture,setPicture]=useState({file:'/assets/shopping-basket.png',bytes:''})
const [error,setError]=useState({})
const [categoryList,setCategoryList]=useState([])
const [subCategoryList,setSubCategoryList]=useState([])
const [productId,setProductId]=useState('')
////////////////////////////////////////////////////////
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

const fetchAllSubCategory=async(cid)=>{
    var result=await postData('category/subcategory_list_by_categoryid',{categoryid:cid})
    setSubCategoryList(result.data)
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


//////////////////////////////////////////////////////////
/*handle the error */
const handleError=(input,value)=>{
    setError((prev)=>({...prev,[input]:value}))    
        }
/*check all the field   fill or not */
const validation=()=>{
    var isValid=true
    if(!categoryId)
    {
        handleError('categoryid','Plss input category name for product....')
        isValid=false
    }
    if(!subCategoryId)
    {
        handleError('subcategoryid','Plss input sub category name for product....')
        isValid=false
    }
    if(!productName)
    {
        handleError('productname','Plss input product name....')
        isValid=false
    }
    if(!description)
    {
        handleError('description','Plss input description for product....')
        isValid=false
    }
    if(!status)
        {
        handleError('status','Plss input status for product....')
        isValid=false
        }
    if(!picture.bytes)
    {
        handleError('picture','Plss input picture for product....')
        isValid=false
    }
    
    return isValid
    }

/*Submit data in the database */
const handleSubmit=async()=>{
    if(validation())
    {
        var formData= new FormData()
        formData.append('productname',productName)
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('description',description)
        formData.append('status',status)
        formData.append('picture',picture.bytes)
        var result=await postData('category/productsubmit',formData)
    
        if(result.status)
        {
            Swal.fire({
            icon: 'success',
            title: result.message,
            showConfirmButton: true,
            })
        }
        else
        {
            Swal.fire({
            icon: 'error',
            title: result.message,
            showConfirmButton: true,
            })
        }
    }
    }

/*show form in edit delete button */
const showProductForm=()=>{
    return(
    <div className={classes.box} style={{width:'30vw',
    height:'auto',
    padding:15,
    background:'#fff'}}>
    <Grid container spacing={2}>
    <Grid item xs={12}>
    <div className={classes.headingStyle}>Add New Product</div>
    </Grid>
    <Grid item xs={12}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Categories</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={categoryId}
    label="Categories"
    onChange={handleCategoryChange}
    onFocus={()=>handleError('categoryid',null)}
    error={error.categoryid?true:false}
    >
        <MenuItem>Select Category</MenuItem>
        {fillCategory()}
    </Select>
    </FormControl>
    <div className={classes.errorText}>{error.categoryid}</div>  
    </Grid>
    <Grid item xs={12}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Sub Categories</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={subCategoryId}
    label="SubCategories"
    onChange={(event)=>{setSubCategoryId(event.target.value)}}
    onFocus={()=>handleError('subcategoryid',null)}
    error={error.subcategoryid?true:false}
    >
        <MenuItem>Select Sub Category</MenuItem>
        {fillSubCategory()}
    </Select>
    </FormControl>
    <div className={classes.errorText}>{error.subcategoryid}</div>  
    </Grid>
    <Grid item xs={12}>
    <TextField value={productName} fullWidth variant="outlined" label="Product Name" error={error.productname?true:false} helperText={error.productname} onFocus={()=>handleError('productname',null)} onChange={(event)=>{setProductName(event.target.value)}}>Product Name</TextField>
    </Grid>
    <Grid item xs={12}>
    <TextField value={description} fullWidth variant="outlined" label="Description" error={error.description?true:false} helperText={error.description} onFocus={()=>handleError('description',null)} onChange={(event)=>{setDescription(event.target.value)}}>Description</TextField>
    </Grid>
    <Grid item xs={12}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Status</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={status}
    label="status"
    onChange={(event)=>{setStatus(event.target.value)}}
    onFocus={()=>handleError('status',null)}
    error={error.status?true:false}
    >
    <MenuItem value="-Select Status-">-Select Status-</MenuItem>
    <MenuItem value="Continue">Continue</MenuItem>
    <MenuItem value="Discontinue">Discontinue</MenuItem>
    <MenuItem value="Trending">Trending</MenuItem>
    <MenuItem value="Popular">Popular</MenuItem>
    </Select>
    </FormControl>
    <div className={classes.errorText}>{error.status}</div>
    </Grid>
    <Grid item xs={4}>
    <IconButton color="primary" aria-label="upload picture" component="label">
    <input  /*onChange={handlePicture}*/ hidden accept="image/*" type="file" />
    <PhotoCamera />
    </IconButton> 
    <div className={classes.errorText}>{error.picture}</div>  
    </Grid>
    <Grid item xs={8}>
    <Avatar
    alt="picture"
    src={picture.file}
    sx={{ width: 56, height: 56 }}
    />
    </Grid>
    <Grid item xs={6}>
        <Button onClick={handleSubmit} fullWidth variant="contained" color="success">Edit</Button>
    </Grid>
    <Grid item xs={6}>
        <Button fullWidth variant="contained" color="error">Delete</Button>
    </Grid>
    </Grid>
    
    </div>)}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*fetch product data */
const fetchProductList=async()=>{
var result=await getData('product/product_list')
setProductList(result.data)
}

/*Data is fill before rendering the page */
useEffect(function(){
    fetchProductList()
},[])

/*Open dailog box to edit the data */
const displayProductDialog=()=>{
return(
<Dialog
    open={open}
    onClose={handleClose}
>
    <DialogContent>
        {showProductForm()}
    </DialogContent>
    <DialogActions>
    <Button onClick={handleClose}>Close</Button>
    </DialogActions>
</Dialog>)
}

/*use to close the dailog box */
const handleClose=()=>{
    setOpen(false)
}
/*use to close the dailog box */
const handleOpen=(rowData)=>{
    fetchAllSubCategory(rowData.subcategoryid)
    setProductId(rowData.productid)
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setProductName(rowData.productname)
    setDescription(rowData.description)
    setStatus(rowData.status)
    setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
    
    setOpen(true)
}

/*Products shows in table */
function showProducts(){
    return (
      <MaterialTable
        title="Product List"
        columns={[
          { title: 'Product Id', field: 'productid' },
          { title: 'Category Name', field: 'categoryname' },
          { title: 'Sub Category Name', field:'subcategoryname'},
          { title: 'Product Name', field:'productname'},
          { title: 'Description', field:'description'},
          { title: 'Status', field: 'status' },
          { title: 'Picture', field: 'picture',
            render:rowData=><Avatar src={`${serverURL}/images/${rowData.picture}`} style={{width:75}} variant="rounded"/>}
         
        ]}
        data={productList}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Icon',
            onClick: (event, rowData) => handleOpen(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event) => navigate("/dashboard/productinterface")
          }
        ]}
      />
    )
      }
  
     return(<div className={classes.displaycontainer}>
    <div className={classes.displaybox}>
    {showProducts()}
    </div>
    {displayProductDialog()}
        </div>)
}