import React from "react";
import { useState,useEffect } from "react";
import { getData } from "../services/FetchNodeServices";
import { Grid, TextField,FormControl,InputLabel,Select,MenuItem, IconButton,Avatar, Button } from "@mui/material";
import { useStyles } from "../productlist/ProductListCss";
import { postData } from "../services/FetchNodeServices";
import  Swal  from "sweetalert2";
import { PhotoCamera } from "@mui/icons-material";



export default function ProductsList(){
    const classes=useStyles()
    const [categoryId,setCategoryId]=useState("")
    const [subCategoryId,setSubCategoryId]=useState("")
    const [productId,setProductId]=useState("")
    const [productListName,setProductListName]=useState("")
    const [description,setDescription]=useState("")
    const [rate,setRate]=useState("")
    const [offer,setOffer]=useState("")
    const [weight,setWeigth]=useState("")
    const [type,setType]=useState('')
    const [stock,setStock]=useState("")
    const [status,setStatus]=useState("")
    const [error,setError]=useState({})
    const [picture,setPicture]=useState({file:"/assets/Icon.gif",bytes:""})
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [productList,setProductList]=useState([])

    /*Filling Category Dropdown*/

    useEffect(function(){
        fetchAllCategory()
    },[])

    const fetchAllCategory=async()=>{
        var result=await getData("category/category_list")
        setCategoryList(result.data)
    }

    const fillCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    }

    /*Filling Subcategory Dropdown*/

    const fetchAllSubCategory=async(categoryId)=>{
        var result=await postData("subcategory/subcategory_list_by_categoryid",{categoryid:categoryId})
        setSubCategoryList(result.data)
    }

    const fillSubCategory=()=>{
        return subCategoryList.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

    const handleSubCategoryChange=(event)=>{
        setSubCategoryId(event.target.value)
        fetchAllProduct(event.target.value)
    }

    /*Filling Product Dropdown*/

    const fetchAllProduct=async(subCategoryId)=>{
        var result=await postData("product/product_list_by_subcategoryid",{subcategoryid:subCategoryId})
    
        setProductList(result.data)
        
    }

    const fillProduct=()=>{
        return productList.map((item)=>{
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }

    /*Picture Submit*/

    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        handleError("picture",null)
    }

     /*Error Handling*/

     const handleError=(input,value)=>{
        setError(prev=>({...prev,[input]:value}))

    }

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
        if(!type){
            handleError("type","Please select weight type")
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
        if(!picture.bytes){
            handleError("picture","Please input picture")
            isValid=false
        }
        return isValid
    }

    /*Product List Submit*/

    const handleSubmit=async()=>{

        if(validation())
        {

        var formData=new FormData()

        formData.append("categoryid",categoryId)
        formData.append("subcategoryid",subCategoryId)
        formData.append("productid",productId)
        formData.append("productlistname",productListName)
        formData.append("description",description)
        formData.append("rate",rate)
        formData.append("offer",offer)
        formData.append("weight",weight+" "+type)
        formData.append("stock",stock)
        formData.append("status",status)
        formData.append("picture",picture.bytes)

        var result=await postData("productlist/submit_productlist",formData)

        if(result.data){
            Swal.fire({
                icon:"error",
                title:result.message,
                showConfirmButton:true
            })
        }

        else{
            Swal.fire({
                icon:"success",
                title:result.message,
                showConfirmButton:false,
                timer:1500
            })
        }

    }
    }

   


   
    /*Form Design*/
    
    const showProductsList=()=>{
        return(
            <div className={classes.container}>
                <div className={classes.box}>
                    <Grid container spacing={1.5}>
                        <Grid item xs={12}>
                            <div className={classes.font}> Add ProductList</div>
                        </Grid>
                        <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            label="Categories"
                            onChange={handleCategoryChange}
                            error={error.categoryId?true:false}
                            onFocus={()=>handleError("categoryId",null)}
                            
                            >
                            <MenuItem>Select Category</MenuItem>
                            {fillCategory()}
                            </Select>
                        </FormControl>
                        <div className={classes.errorText}>{error.categoryId}</div>
                        </Grid>
                        <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sub-Categories</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subCategoryId}
                            label="Sub-Categories"
                            onChange={handleSubCategoryChange}
                            error={error.subCategoryId?true:false}
                            onFocus={()=>handleError("subCategoryId",null)}
                            
                            >
                            <MenuItem>Select Sub-Category</MenuItem>
                            {fillSubCategory()}
                            </Select>
                        </FormControl>
                        <div className={classes.errorText}>{error.subCategoryId}</div>
                        </Grid>
                        <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Products</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={productId}
                            label="Products"
                           onChange={(event)=>{setProductId(event.target.value)}}
                           error={error.productId?true:false}
                            onFocus={()=>handleError("productId",null)}
                            
                            >
                            <MenuItem>Select Product</MenuItem>
                            {fillProduct()}
                            </Select>
                        </FormControl>
                        <div className={classes.errorText}>{error.productId}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField error={error.productListName?true:false} helperText={error.productListName}
                            onFocus={()=>handleError("productListName",null)}
                             label="Product List Name" value={productListName} onChange={(event)=>{setProductListName(event.target.value)}} fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField error={error.description?true:false} helperText={error.description}
                            onFocus={()=>handleError("description",null)}
                             label="Description" value={description} onChange={(event)=>{setDescription(event.target.value)}} fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            error={error.rate?true:false} helperText={error.rate}
                            onFocus={()=>handleError("rate",null)}
                             label="Rate" value={rate} onChange={(event)=>{setRate(event.target.value)}} fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField helperText={error.offer}
                            error={error.offer?true:false}
                            onFocus={()=>handleError("offer",null)}
                             label="Offer" value={offer} onChange={(event)=>{setOffer(event.target.value)}} fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Weight" error={error.weight?true:false} helperText={error.weight} value={weight} onFocus={()=>handleError("weight",null)} onChange={(event)=>setWeigth(event.target.value)} fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type"
                           onChange={(event)=>{setType(event.target.value)}}
                           error={error.type?true:false}
                            onFocus={()=>handleError("type",null)}
                            
                            >
                            
                            <MenuItem value="ltr">Liters</MenuItem>
                            <MenuItem value="ml">Mili-liters</MenuItem>
                            <MenuItem value="kg">Kilograms</MenuItem>
                            <MenuItem value="g">Grams</MenuItem>
                            <MenuItem value="pcs">Pieces</MenuItem>
                            
                            </Select>
                        </FormControl>
                        <div className={classes.errorText}>{error.type}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField error={error.stock?true:false} helperText={error.stock}
                            onFocus={()=>handleError("stock",null)}
                             label="Stock" value={stock} onChange={(event)=>{setStock(event.target.value)}} fullWidth>Stock</TextField>
                        </Grid>
                        
                            <Grid item xs={6}>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="status"
                            onChange={(event)=>{setStatus(event.target.value)}}
                            error={error.status?true:false}
                            onFocus={()=>handleError("status",null)}
                            
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
                            <input onChange={handlePicture} hidden accept="image/*" type="file" />
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
                                <Button fullWidth onClick={handleSubmit}  variant="contained" color="success">Submit</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth variant="contained" color="error">Reset</Button>
                            </Grid>
        
                    </Grid>
                </div>
            </div>
        )
    }

    return <div className="classes.container">
        
        {showProductsList()}
    </div>
}