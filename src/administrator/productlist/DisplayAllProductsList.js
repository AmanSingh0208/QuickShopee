import React from "react";
import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { getData, serverURL } from "../services/FetchNodeServices";
import { Grid, TextField,FormControl,InputLabel,Select,MenuItem, IconButton,Avatar, Button, } from "@mui/material";
import { useStyles } from "../productlist/ProductListCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { postData } from "../services/FetchNodeServices";
import  Swal  from "sweetalert2";
import { PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function DisplayAllProductsList(){
    const navigate = useNavigate()
    const classes = useStyles()
    const [productsList,setProductsList]=useState([])
    const [categoryId,setCategoryId]=useState("")
    const [subCategoryId,setSubCategoryId]=useState("")
    const [productId,setProductId]=useState("")
    const [productListId,setProductListId]=useState("")
    const [productListName,setProductListName]=useState("")
    const [description,setDescription]=useState("")
    const [rate,setRate]=useState("")
    const [offer,setOffer]=useState("")
    const [weight,setWeigth]=useState("")
    const [stock,setStock]=useState("")
    const [status,setStatus]=useState("")
    const [error,setError]=useState({})
    const [picture,setPicture]=useState({file:"/assets/Icon.gif",bytes:""})
    const [oldPicture,setOldPicture]=useState("")
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [productList,setProductList]=useState([])
    const [open,setOpen]=useState(false)
    const [btnStatus,setBtnStatus]=useState(false)

    /*Fetching category list*/
    
    useEffect(function(){
        fetchCategoryList()
    },[])

    const fetchCategoryList=async()=>{
        var result=await getData("category/category_list")
        setCategoryList(result.data)
    }

    const handleCategoryChange=(event)=>{
        fetchSubCategoryList(event.target.value)
        setCategoryId(event.target.value)
    }

    const fillCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    /*Fetching sub-category list*/

    const fetchSubCategoryList=async(categoryId)=>{
        var result=await postData("subcategory/subcategory_list_by_categoryid",{categoryid:categoryId})
        setSubCategoryList(result.data)
    }

    const fillSubCategory=()=>{
        return subCategoryList.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

    const handleSubCategoryChange=(event)=>{
        fetchProductList(event.target.value)
        setSubCategoryId(event.target.value)
    }

    /*Fetching Product List*/

    const fetchProductList=async(subCategoryId)=>{
        var result = await postData("product/product_list_by_subcategoryid",{subcategoryid:subCategoryId})
        setProductList(result.data)
    }

    const fillProduct=()=>{
        return productList.map((item)=>{
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }


    /*Getting product list field*/
    useEffect(function(){
        fetchProductsList()
    },[])

    const fetchProductsList=async()=>{
        var result=await getData("productlist/fetch_product_list")
        setProductsList(result.data)
    }

    /*Product List Edit DialogBox*/

    const editProductsList=()=>{
        return (
         
            
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={classes.font}>Edit Products List</div>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            label="Category"
                            onChange={handleCategoryChange}
                            error={error.categoryId?true:false}
                            onFocus={()=>handleError("categoryId",null)}
                            >
                            {fillCategory()}
                            </Select>
                            <div className={classes.errorText}>{error.categoryId}</div>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subCategoryId}
                            label="Sub-Category"
                            onChange={handleSubCategoryChange}
                            error={error.subCategoryId?true:false} onFocus={()=>handleError("subcategoryid",null)}
                            >
                            {fillSubCategory()}
                            </Select>
                            <div className={classes.errorText}>{error.subCategoryId}</div>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                    <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Product</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={productId}
                            label="Product"
                            onChange={(e)=>setProductId(e.target.value)}
                            error={error.productId?true:false} onFocus={()=>handleError("productId",null)}
                            >
                            {fillProduct()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField helperText={error.productListName} error={error.productListName?true:false} onFocus={()=>handleError("productListName",null)} onChange={(e)=>{setProductListName(e.target.value)}} value={productListName} label="Product List Name" fullWidth>Product List Name</TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField helperText={error.description} error={error.description?true:false} onFocus={()=>handleError("description",null)} onChange={(e)=>{setDescription(e.target.value)}} value={description} label="Description" fullWidth>Description</TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField helperText={error.rate} error={error.rate?true:false} onFocus={()=>handleError("rate",null)} onChange={(e)=>{setRate(e.target.value)}} value={rate} label="Rate" fullWidth>Rate</TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField helperText={error.offer} error={error.offer?true:false} onFocus={()=>handleError("offer",null)} onChange={(e)=>{setOffer(e.target.value)}} value={offer} label="Offer" fullWidth>Offer</TextField>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField value={weight}
                            label="Weight"
                            onChange={(e)=>{setWeigth(e.target.value)}} helperText={error.weight}
                            error={error.weight?true:false} onFocus={()=>handleError("weight",null)} fullWidth>Weight</TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField helperText={error.stock} error={error.stock?true:false} onFocus={()=>handleError("stock",null)} onChange={(e)=>{setStock(e.target.value)}} value={stock} label="Stock" fullWidth>Stock</TextField>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="status"
                            onChange={(e)=>{setStatus(e.target.value)}}
                            error={error.status?true:false} onFocus={()=>handleError("status",null)}
                            >
                            <MenuItem value="Continue">Continue</MenuItem>
                            <MenuItem value="Discontinue">Discontinue</MenuItem>
                            <MenuItem value="Trending">Trending</MenuItem>
                            <MenuItem value="Popular">Popular</MenuItem>
                            </Select>
                            </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                            <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden onChange={handlePicture} accept="image/*" type="file" />
                            <PhotoCamera />
                            </IconButton> 
                            <div className={classes.errorText}>{error.picture}</div>
                            </Grid>
                            <Grid item xs={3}>
                            <Avatar
                            alt="picture"
                            src={picture.file}
                            sx={{ width: 56, height: 56 }}
                            />
                    </Grid>
                    <Grid item xs={5}>
                        {btnStatus?<>
                        <Button varient='contained' onClick={handleEditPicture}>Save</Button>
                        <Button varient='contained' onClick={handleCancle}>Cancle</Button></>:<></>}
                    </Grid>
                    <Grid item xs={6}>
                                <Button fullWidth onClick={handleEdit}  variant="contained" color="success">Edit</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth onClick={handleDelete} variant="contained" color="error">Delete</Button>
                            </Grid>
                </Grid>
            
        
        )
    }

    /*Edit picture*/

    const handleEditPicture=async()=>{
        var formData=new FormData()
        formData.append("productlistid",productListId)
        formData.append("picture",picture.bytes)
        var result=await postData("productlist/edit_picture",formData)
       
    }

    const handleCancle=()=>{
        setPicture({file:`${serverURL}/images/${oldPicture}`,bytes:""})
        setBtnStatus(false)
    }

    /*Validation*/

    const validation=()=>{
       var isValid=true

       if(!categoryId){
        handleError("categoryId","Please input category")
        isValid=false
    }
    if(!subCategoryId){
        handleError("subCategoryId","Please input sub-category")
        isValid=false
    }
    if(!productId){
        handleError("productId","Please input categoryid")
        isValid=false
    }
    if(!productListName){
        handleError("productListName","Please input product list name")
        isValid=false
    }
    if(!description){
        handleError("description","Please input description")
        isValid=false
    }
    if(!rate){
        handleError("rate","Please input rate")
        isValid=false
    }
    if(!offer){
        handleError("offer","Please input offer")
        isValid=false
    }
    if(!weight){
        handleError("weight","Please input weight")
        isValid=false
    }
    if(!stock){
        handleError("stock","Please input stock")
        isValid=false
    }
    if(!status){
        handleError("status","Please input status")
        isValid=false
    }
    /*if(!picture.bytes){
        handleError("picture","Please input picture")
        isValid=false
    }*/
    return isValid

       
    }

    /*Handle Error*/

    const handleError=(input,value)=>{
        setError((prev)=>({...prev,[input]:value}))
        setBtnStatus(true)
    }

    /*Handle Editing*/

    const handleEdit=async()=>{
        
        /*var formData = new FormData()
        formData.append("productlistid",productListId)
        formData.append("categoryid",categoryId)
        formData.append("subcategoryid",subCategoryId)
        formData.append("productid",productId)
        formData.append('productlistname',productListName)
        formData.append("description",description)
        formData.append("rate",rate)
        formData.append("offer",offer)
        formData.append("weight",weight)
        formData.append("stock",stock)
        formData.append("status",status)
        formData.append("picture",picture.bytes)*/
        if(validation()){
        var body={productlistid:productListId,categoryid:categoryId,subcategoryid:subCategoryId,productid:productId,productlistname:productListName,description:description,rate:rate,offer:offer,weight:weight,stock:stock,status:status}
        var result=await postData("productlist/edit_productlist",body)
        if (result.status)
        {
          Swal.fire
          ({
            icon:"success",
            title: result.message,
            showConfirmButton: true,
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

        setOpen(false)
        fetchProductsList()
    }
    
    
    }

    /*Handle Delete Product List*/

    
    const handleDelete=async()=>{
        var body={productlistid:productListId}
        var result=await postData("productlist/delete_productlist",body)
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
        fetchProductsList()
    }

    /*Handling picture*/

    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        handleError("picture",null)
    }

    /*Product List Display*/

    function showProductsList(){
        return (
            <MaterialTable
            title="All Products List"
            columns={[
                {title:"Product List Id",field:"productlistid"},
                {title:"Category Name",field:"categoryname",
                render:rowData=><div><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div></div>},
                
                {title:"Product Name",field:"productname",
                render:rowData=><div><div>{rowData.productname}</div><div>{rowData.productlistname}</div></div>},
                {title:"Description",field:"description"},
                {title:"Rate/Offer", field:"rate",
                render:rowData=><div><div><s>{rowData.rate}</s></div><div>{rowData.offer}</div></div>},
                {title:"Weight",field:"weight"},
                {title:"Stock/Status",field:"stock",
                render:rowData=><div><div>{rowData.stock}</div><div>{rowData.status}</div></div>},
                {title:"Picture",field:"picture",
                  render:rowData=><Avatar src={`${serverURL}/images/${rowData.picture}`} style={{height:70,width:70}} variant="rounded"/>}
            ]}
            data={productsList}
            actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Icon',
                  onClick:(event,rowData)=>handleOpen(rowData)
                },
                {
                    icon: 'add',
                    tooltip: 'Add User',
                    isFreeAction: true,
                    onClick: (event) => navigate("/dashboard/productslist")
                  }
            ]}
            />
        )
    }



    /*Open DialogBox*/

    const handleOpen=(rowData)=>{

        fetchSubCategoryList(rowData.categoryid)
        fetchProductList(rowData.subcategoryid)

        setProductListId(rowData.productlistid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setProductId(rowData.productid)
        setProductListName(rowData.productlistname)
        setDescription(rowData.description)
        setRate(rowData.rate)
        setOffer(rowData.offer)
        setWeigth(rowData.weight)
        setStock(rowData.stock)
        setStatus(rowData.status)
        setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setOldPicture(rowData.picture)
        setOpen(true)
        setBtnStatus(false)

    }

    /*Close DialogBox*/

    const handleClose=()=>{
        setOpen(false)
    }

    const showDialogBox=()=>{
        return(
            <Dialog
                open={open}
                onClose={handleClose}
                
            >
                <DialogContent>
                   {editProductsList()}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>)
            }
    

    return (<div className={classes.displaycontainer}>
        <div className={classes.displaybox}>{showProductsList()}</div>
        
        
        
        {showDialogBox()}
        
    </div>)
}