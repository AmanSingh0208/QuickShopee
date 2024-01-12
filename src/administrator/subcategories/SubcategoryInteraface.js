import {useState,useEffect} from "react";

import { Avatar,Grid,TextField,FormControl,Select,InputLabel,MenuItem,IconButton,Button} from '@mui/material';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Swal from "sweetalert2";
import { getData, postData } from "../services/FetchNodeServices";
import { useStyles } from "../subcategories/SubcategoryCss";





   

export default function SubcategoryInterface()
{
    const classes=useStyles()
    const [status,setStatus]=useState('')
    const [icon,setIcon]=useState({file:'/assets/Icon.gif',bytes:''})
    const [categoryId,setCategoryId]=useState('')
    const [subcategoryName,setSubcategoryName]=useState('')
    const [error,setError]=useState({})
    const [categoryList,setCategoryList]=useState([])

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

    const handlePicture=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        handleError("icon",null)
    }

    const handleError=(input,value)=>{
        setError(prev=>({...prev,[input]:value}))

    }

    const validation=()=>{
        var isValid=true
        if(!categoryId)
        {
            handleError("categoryId","Please input category name...")
            isValid=false
        }

        if(!subcategoryName)
        {
            handleError("subcategoryName","Please input subcategory name...")
           isValid=false
        }

        if(!status)
        {
            handleError("status","Please select status...")
            isValid=false
        }

        if(!icon.bytes)
        {
            handleError("icon","Please select an icon...")
            isValid=false
        }

        return isValid
    }

    const handleClick=async()=>{
        if(validation())
        {
            var formData = new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryname',subcategoryName)
            formData.append('status',status)
            formData.append('icon',icon.bytes)
            var result=await postData('subcategory/subcategorysubmit', formData)

            if(result.status)
            {
                Swal.fire({
                    icon:'success',
                    title: result.message,
                    showConfirmButton:true,
                })
            }
            else
            {
                Swal.fire({
                    icon:'error',
                    title: result.message,
                    showConfirmButton:false,
                    timer:2000
                })
            }
        }
        
    }
    
    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={classes.font}>
                            Add New Subcategory
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                            <Select labelId="demo-simple-sekect-lable" label="Categories" id="demo-simple-select" value={categoryId} onChange={(event)=>{setCategoryId(event.target.value)}} onFocus={()=>handleError('categoryid',null)} error={error.categoryId?true:false}>
                        
                                {fillCategory()}                            
                            </Select>
                        </FormControl>
                        <div className={classes.errorText}>{error.categoryId}</div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField helperText={error.subcategoryName} error={error.subcategoryName?true:false} onFocus={()=>handleError('subcategoryName',null)} onChange={(event)=>{setSubcategoryName(event.target.value)}} label="Subcategroy Name" variant="outlined" fullWidth />                    
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select labelId="demo-simple-sekect-lable" label="Status" id="demo-simple-select" value={status} onChange={(event)=>{setStatus(event.target.value)}} onFocus={()=>handleError('status',null)} error={error.status?true:false}>
                            
                                <MenuItem value="continue">Continue</MenuItem>
                                <MenuItem value="discontinue">Discontinue</MenuItem>
                                <MenuItem value="popular">Popular</MenuItem>
                                <MenuItem value="trendy">Trendy</MenuItem>                            
                            </Select>
                        </FormControl>
                        <div className={classes.errorText}>{error.status}</div>
                    </Grid>
                    <Grid item xs={4}>
                        <IconButton color="primary" aria-label="upload picture" component="label" sx={{width:48, height:48}} >
                        <input onChange={handlePicture} type="file" hidden accept="image/*"/>
                        <PhotoCamera/>
                        </IconButton>
                        <div className={classes.errorText}>{error.icon}</div>
                    </Grid>
                    <Grid item xs={8}>
                        <Avatar alt="Icon" src={icon.file} sx={{width:48,height:48}}/>
                        
                    </Grid>
                    
                    <Grid item xs={6}>

                        <Button onClick={handleClick}  variant="contained" fullWidth>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>


    )

}

