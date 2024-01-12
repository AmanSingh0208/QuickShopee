import { useState } from "react";
import { useStyles } from "./CategoryCss";
import { Avatar,Grid,TextField,FormControl,Select,InputLabel,MenuItem, IconButton,Button } from "@mui/material";
import  PhotoCamera  from "@mui/icons-material/PhotoCamera";
import Swal from "sweetalert2";


import {postData} from "../services/FetchNodeServices";

import { makeStyles } from "@mui/styles";






export default function CategoryInterface()
{const classes = useStyles()
 const [status,setStatus]=useState('')
 const [icon,setIcon]=useState({file:'/assets/Icon.gif',bytes:''})
 const [categoryName,setCategoryName]=useState('')
 const [error,setError]=useState({})
 const handlePicture=(event)=>{
    setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    handleError("icon",null)
}

 const handleError=(input,value)=>{
    setError(prev=>({...prev,[input]:value})) 
    
 }

 const validation=()=>{
    var isValid=true
    if(!categoryName)
    { handleError('categoryName',"Please input category name...")
        isValid=false
    }

    if(!status)
    {
        handleError('status','Please input status...')
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
       formData.append('categoryname',categoryName)
       formData.append('status',status)
       formData.append('icon',icon.bytes)
       var result=await postData("category/categorysubmit",formData)
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
    
 }

    return(
        <div className={classes.container}>
            <div className={classes.box}>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <div className={classes.font}>
                            Add New Category
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField helperText={error.categoryName} error={error.categoryName?true:false} onFocus={()=>handleError('categoryName',null)} onChange={(event)=>{setCategoryName(event.target.value)}} label="Category" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Status"
                        value={status}
                        onChange={(event)=>{setStatus(event.target.value)}}
                        onFocus={()=>handleError('status',null)}
                        error={error.status?true:false}
                        >
                        <MenuItem value='continue'>Continue</MenuItem>
                        <MenuItem value="discontinue">Discontinue</MenuItem>
                        <MenuItem value="trendy">Trendy</MenuItem>
                        </Select>
                        </FormControl>
                        <div className={classes.errorText}>{error.status}</div>
                    </Grid>

                    
                   
                    <Grid item xs={4}>
                        <IconButton  color="primary" aria-label="upload picture" component="label" sx={{ width: 48, height: 48 }}>
                            
                        <input onChange={handlePicture} hidden accept="image/*" type="file" />
                        
                        <PhotoCamera />
                        </IconButton>
                        <div className={classes.errorText}>{error.icon}</div>
                    </Grid>
                    <Grid item xs={8}>
                    <Avatar
                        alt="Icon"
                        src={icon.file} 
                        sx={{ width: 50, height: 50 }}
                    />
                    </Grid>
                    <Grid item xs={6} >
                        <Button onClick={handleClick} variant="contained" fullWidth className={classes.boton} >Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth className={classes.boton} >Reset</Button>
                    </Grid>
                    
                </Grid>

            </div>

        </div>
        
    )
}
