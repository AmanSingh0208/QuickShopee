import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core";
import { getData,serverURL,postData } from "../services/FetchNodeServices";
import { Avatar,Grid,TextField,FormControl,Select,InputLabel,MenuItem, IconButton,Button} from "@mui/material";
import { useStyles } from "./CategoryCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import  PhotoCamera  from "@mui/icons-material/PhotoCamera";

export default function DisplayAllCategory(){
  const navigate = useNavigate()
  const classes= useStyles()
    const [categoryList,setCategoryList]=useState([])
    const [open,setOpen]=useState(false)
    const [oldIcon,setOldIcon]=useState('')
    const [categoryId,setCategoryId] = useState('')
    const [status,setStatus]=useState('')
    const [icon,setIcon]=useState({file:'/assets/Icon.gif',bytes:''})
    const [categoryName,setCategoryName]=useState('')
    const [error,setError]=useState({})
    const [btnStatus,setBtnStatus]=useState(false)

    const handleError=(input,value)=>{
      setError(prev=>({...prev,[input]:value}))
    }

    const validation=()=>{
      var isValid=true

      if(!categoryName)
      {
        handleError('categoryName','Please input categoryname...')
        isValid=false
      }

      if(!status)
      {
        handleError('status','Please select status...')
        isValid=false
      }

      if(!icon.file)
      {
        handleError("icon","Please select an icon...")
        isValid=false
      }

      return isValid
    }

    const handleEdit=async()=>{
      
      setOpen(false)

      if(validation())
      {
        var body={categoryid:categoryId,categoryname:categoryName,status:status}
        var result=await postData("category/category_edit_data",body)
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
      }

      fetchCategoryList()
      
    }

    const showCategoryForm=()=>{
      return(
        
            <div className={classes.dialogbox}>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <div className={classes.font}>
                            Add New Category
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={categoryName} helperText={error.categoryName} error={error.categoryName?true:false} onFocus={()=>handleError('categoryName',null)} onChange={(event)=>{setCategoryName(event.target.value)}} label="Category" variant="outlined" fullWidth />
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
                            
                        <input hidden onChange={handlePicture} accept="image/*" type="file" />
                        
                        <PhotoCamera />
                        </IconButton>
                        <div className={classes.errorText}>{error.icon}</div>
                    </Grid>
                    <Grid item xs={3}>
                    <Avatar
                        alt="Icon"
                        src={icon.file} 
                        sx={{ width: 50, height: 50 }}
                    />
                    </Grid>
                    
                    <Grid item xs={5}>
                      {btnStatus?<>
                      <Button varient="contained" onClick={handleEditIcon}>Save</Button>
                      <Button varient="contained" onClick={handleCancle}>Cancle</Button></>:<></>}
                    </Grid>
                    <Grid item xs={6} >
                        <Button onClick={handleEdit} variant="contained" fullWidth className={classes.boton} >Edit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleDelete} variant="contained" fullWidth className={classes.boton} >Delete</Button>
                    </Grid>
                    
                </Grid>

            </div>

        
        
    )
    }
    const handleEditIcon=async()=>{
      var formData = new FormData()
      formData.append ("categoryid",categoryId)
      formData.append("icon",icon.bytes)
      var result=await postData('category/category_edit_icon',formData)
      
      if(result.status)
      {
        Swal.fire({
          icon:'success',
          title:result.message,
          showConfirmButton:true,
          
        })
      }
      else{
        Swal.fire({
          icon:'error',
          title:result.message,
          showConfirmButton:true
        })
      }
      fetchCategoryList()
      setOpen(false)
      setBtnStatus(false)
    }

    const handleDelete=async()=>{
      var body={categoryid:categoryId}
      var result=await postData('category/category_delete',body)
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
          timer:2000,
        })
      }
      setOpen(false)
      fetchCategoryList()
    }

    const handleCancle=()=>{
      setIcon({file:`${serverURL}/images/${oldIcon}`,bytes:""})
      setBtnStatus(false)
    }

    const handlePicture=(event)=>{
    
      setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      handleError('icon',null)
      setBtnStatus(true)
    }

    const fetchCategoryList=async()=>{
        var result=await getData('category/category_list')
        setCategoryList(result.data)
    }

    function showCategory(){
        return (
          <MaterialTable
            title="Categroy List"
            height="42%"
            columns={[
             {title:'Category Id',field:'categoryid'},
             {title:'Category Name',field:'categoryname'},
             {title:'Status',field:'status'},
             {title:'Icon',field:'icon',
              render:rowData=><Avatar src={`${serverURL}/images/${rowData.icon}`}  style={{width:60, height:60 }} varient="rounded" />}

            ]}
            data={ categoryList }    
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) =>handleOpen(rowData)
              },

              {
                icon: 'add',
                tooltip: 'Add User',
                isFreeAction: true,
                onClick: (event) => navigate("/dashboard/categoryinterface")
              }
      
            ]}
          />
        )
      }

    useEffect(function(){
        fetchCategoryList()
    },[])

    const handleClose=()=>{
      setOpen(false)
    }

    const handleOpen=(rowData)=>{ 
      
      setCategoryId(rowData.categoryid)
      setCategoryName(rowData.categoryname)
      setStatus(rowData.status)
      setIcon({file:`${serverURL}/images/${rowData.icon}`, bytes:''})
      setOldIcon(rowData.icon)
      setOpen(true)
    }

    const displayCategoryDialog=()=>{
      return(
        <Dialog
          open={open}
          onClose={handleClose}
        >
          

          <DialogContent>{showCategoryForm()}</DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>

       
      )
    }


    return(<div className={classes.displaycontainer}>
      <div className={classes.displaybox}>        
      {showCategory()}  
      </div>
      {displayCategoryDialog()}
    </div>)
}