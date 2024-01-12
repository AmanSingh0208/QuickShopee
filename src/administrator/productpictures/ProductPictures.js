import { useState,useEffect } from "react";
import { postData ,getData} from "../services/FetchNodeServices";
import { Grid,FormControl,InputLabel,Select,MenuItem,Button, } from "@mui/material";
import { useStyles } from "../productpictures/ProductPicturesCss";
import { DropzoneArea } from "material-ui-dropzone";
import Swal from "sweetalert2";

export default function ProductPictures(){
    const classes=useStyles()
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [productId,setProductId]=useState('')
    const [productsListId,setProductsListId]=useState('')
    const [banners,setBanners]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [productList,setProductList]=useState([])
    const [productsList,setProductsList]=useState([])
    
    /*Category filling*/
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

    const handleCategoryChange=(event)=>{
        fetchSubCategoryList(event.target.value)
        setCategoryId(event.target.value)
    }

    /*Filling Sub-category list*/

    const fetchSubCategoryList=async(categoryId)=>{
        var result=await postData('subcategory/subcategory_list_by_categoryid',{categoryid:categoryId})
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

    /*Filling products*/

    const fetchProductList=async(subCategoryId)=>{
        var result=await postData('product/product_list_by_subcategoryid',{subcategoryid:subCategoryId})
        setProductList(result.data)
    }

    const fillProduct=()=>{
        return productList.map((item)=>{
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }

    const handleProductChange=(event)=>{
        setProductId(event.target.value)
        fetchAllProductsList(event.target.value)
        
    }

    /*Filling Products List*/

    const fetchAllProductsList=async(productId)=>{
        var result=await postData('productlist/fetch_productslist_by_productid',{productid:productId})
        setProductsList(result.data)
        
    
    }

    const fillProductsList=()=>{
        return productsList.map((item)=>{
            return <MenuItem value={item.productlistid}>{item.productlistname} {item.weight}</MenuItem>
        })
    }

    /*Submiting data*/

    const handleSubmit=async()=>{
        var formData=new FormData()
        formData.append("categoryid",categoryId)
        formData.append("subcategoryid",subCategoryId)
        formData.append("productid",productId)
        formData.append("productslistid",productsListId)
        banners.map((item,index)=>{
            formData.append("picture"+index,item)
        })

        var result=await postData("productlist/submit_all_pictures",formData)
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
             showConfirmButton: false,
             timer: 2000
           })
        }
    }

    /*Input form*/

    const showProductPictures=()=>{
        return(
            
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={classes.font}>
                            Product Pictures
                        </div>
                        </Grid>
                        <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            label="Category"
                            onChange={handleCategoryChange}
                            
                            >
                            {fillCategory()}
                            </Select>
                            
                        </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subCategoryId}
                            label="Sub-Category"
                            onChange={handleSubCategoryChange}
                            
                            >
                            {fillSubCategory()}
                            </Select>
                            
                        </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Product</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={productId}
                            label="Product"
                            onChange={handleProductChange}
                            
                            >
                            {fillProduct()}
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Product List Name</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={productsListId}
                            label="Product List Name"
                            onChange={(e)=>setProductsListId(e.target.value)}
                            
                            >
                            {fillProductsList()}
                            </Select>
                        </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                        <DropzoneArea
                        acceptedFiles={['image/*']} filesLimit={6}
                        dropzoneText={"Drag and drop product images here or click"}
                        onChange={(files)=>setBanners(files)}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <Button variant="contained" onClick={handleSubmit} fullWidth>Submit</Button>                    
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" fullWidth>Reset</Button>
                        </Grid>
                    
                </Grid>
                
        )
    }

    return (
        <div className={classes.container}>
            <div className={classes.displaybox}>
        {showProductPictures()}
        </div>
        </div>
    )
}