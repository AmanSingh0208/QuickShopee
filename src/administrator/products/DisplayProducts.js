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

export default function DisplayProducts(){
  const navigate = useNavigate()
    const classes = useStyles()
    const [productList,setProductList]=useState([])
    const [productId,setProductId]=useState("")
    const [categoryId,setCategoryId]=useState("")
    const [subCategoryId,setSubCategoryId]=useState('')
    const [product,setProduct]=useState('')
    const [description,setDescription]=useState('')
    const [status,setStatus]=useState('')
    const [icon,setIcon]=useState({file:"/assests/Icon.gif",bytes:""})
    const [oldIcon,setOldIcon]=useState('')
    const [btnStatus,setBtnStatus]=useState(false)
    const [open,setOpen]=useState(false)
    const [error,setError]=useState({})
    const [categoryList,setCategoryList]=([])
    const [subCategoryList,setSubCategoryList]=([])

    /*Category Dropdown Filling*/

    useEffect(function(){
        fetchAllCategory()
    },[])

    const fetchAllCategory=async()=>{
        var result=await getData("category/category_list")
        setCategoryList(result.data)
        
    }

    const fillCategory=()=>{
         return categoryList && categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
         })
        
    }

    /*Filling subcategory dropdown*/

    const fetchAllSubCategory=async(categoryId)=>{
      var result=await postData('subcategory/subcategory_list_by_categoryid',{categoryid:categoryId})
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
  


    /*Fetching Data before rendering the page*/
    useEffect(function(){
        fetchProductList()
    },[])


    /*Fetching all products*/
    const fetchProductList=async()=>{
        var result=await getData("product/product_list")
        setProductList(result.data)
        
    }

     /*Product Table*/
     function showProducts(){
        return (
            <MaterialTable title="Products List"
            columns={[
                {title:"Product Id",field:"productid"},
                {title:"Category",field:"categoryname"},
                {title:"Sub-Category",field:"subcategoryname"},
                {title:"Product",field:"productname"},
                {title:"Description",field:"description"},
                {title:"Status",field:"status"},
                {title:"Picture",field:"icon",
            render:rowData=><Avatar src={`${serverURL}/images/${rowData.icon}`} style={{width:75,height:75}} varient="rounded"/>}
            ]}
            data={ productList }
            actions={[
                {
                    icon:"edit",
                    tooltip:"Edit Product",
                    onClick:(event,rowData)=>handleOpen(rowData)
                }
            ]}
            />
        )
    }

    /*Dialogbox Open*/

    const handleOpen=(rowData)=>{

        fetchAllSubCategory(rowData.categoryid)

        setProductId(rowData.productid)
        setCategoryId(rowData.categoryid)
        setDescription(rowData.description)
        setSubCategoryId(rowData.subcategoryid)
        setProduct(rowData.productname)
        setStatus(rowData.status)
        setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
        setOldIcon(rowData.icon)
        setOpen(true)
      }

      /*Error Handling*/

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
            handleError("description","Please specify description...")
            isValid=false
        }
        if(!status){
            handleError("status","Please select a status...")
            isValid=false
        }
        if(!icon.bytes){
            handleError("icon","Please select icon...")
            isValid=false
        }
        return isValid
       }

       /*To edit product details*/

       const handleEdit=async()=>{
        
        if(validation())
        {
        var body={subcategoryid:subCategoryId,categoryid:categoryId,status:status,product:product,description:description,productid:productId}
        var result=await postData("product/edit_product",body)
  
        if(result.status)
        {
          Swal.fire({
            icon:"success",
            title: result.message,
            showConfirmButton: true,
  
          })
          setOpen(false)
        }
      }
  
        else{
          Swal.fire({
            icon:error,
            title:result.message,
            showConfirmButton:false,
            timer:2000,
          })
        }
        fetchProductList()
      }

      /*To delete product from list*/

      const handleDelete=async()=>{
    
        var body={productid:productId}
        var result=await postData('product/product_delete',body)
        if (result.status)
        {
          Swal.fire({
            icon:"success",
            title:result.message,
            showConfirmButton:true,
  
          })
        }
        else{
          Swal.fire({
            icon:'error',
            title:result.message,
            showConfirmButton:false,
            timer:2000
          })
        }
        setOpen(false)
        fetchProductList()
      }

      /*Picture Handling*/
    
      const handlePicture=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        handleError("icon",null)
        setBtnStatus(true)
       }

       /*Edit icon*/

    const handleEditIcon=async()=>{

        var formData=new FormData()
        formData.append('productid',productId)
        formData.append('icon',icon.bytes)
        var result=await postData('product/product_edit_icon',formData)
        if(result.status){
          Swal.fire({
            icon:"success",
            title:result.message,
            showConfirmButton:true
          })
        }
        else{
          Swal.fire({
            icon:"error",
            title:result.message,
            showConfirmButton:false,
            timer:2000
          })
        }
        fetchProductList()
        setOpen(false)

      }

      /*Cancle change icon*/

      const handleCancle=()=>{
        setIcon({file:`${serverURL}/images/${oldIcon}`,bytes:""})
        setBtnStatus(false)
        
      }

      /*Product Edit Form Design*/
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
        <TextField value={product} fullWidth variant="outlined" label="Product Name" error={error.product?true:false} helperText={error.product} onFocus={()=>handleError('product',null)} onChange={(event)=>{setProduct(event.target.value)}}>Product Name</TextField>
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
        <input  onChange={handlePicture} hidden accept="image/*" type="file" />
        <PhotoCamera />
        </IconButton> 
        <div className={classes.errorText}>{error.picture}</div>  
        </Grid>
        <Grid item xs={3}>
        <Avatar
        alt="picture"
        src={icon.file}
        sx={{ width: 56, height: 56 }}
        />
        </Grid>
        <Grid item xs={5}>
        {btnStatus?<>
        <Button varient="contained" onClick={handleEditIcon}>Save</Button>
        <Button varient="contained" onClick={handleCancle}>Cancle</Button></>:<></>}
        </Grid>
                    
        <Grid item xs={6}>
            <Button onClick={handleEdit} fullWidth variant="contained" color="success">Edit</Button>
        </Grid>
        <Grid item xs={6}>
            <Button fullWidth onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </Grid>
        </Grid>
        
        </div>)}
    


    /*Dialogbox Closing Button*/

    const handleClose=()=>{
        setOpen(false)
      }

    /*Product Edit Dialogbox*/
    const displayProductDialog=()=>{
        return(
            <Dialog
            open={open}
            >
                <DialogContent>{showProductForm()}</DialogContent>
                <DialogActions><Button variant="contained" onClick={handleClose}>Close</Button></DialogActions>
            </Dialog>
        )
    }

    return <div className={classes.displaycontainer}>
    <div className={classes.displaybox}>
        
        {showProducts()}
    </div>
    {displayProductDialog()}
</div>
}