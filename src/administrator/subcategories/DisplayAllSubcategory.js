import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core"; 
import { Avatar,Grid,TextField,FormControl,Select,InputLabel,MenuItem, IconButton,Button } from "@mui/material";
import { getData,serverURL,postData } from "../services/FetchNodeServices";
import { useStyles } from "../subcategories/SubcategoryCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import  PhotoCamera  from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";


export default function DisplayAllSubcategory(){
  const navigate = useNavigate()
  const classes=useStyles()
    const [subcategoryList,setSubcategoryList] = useState([])

    const [status,setStatus]=useState('')
    const [categoryId,setCategoryId]=useState('')
    
    const [subcategoryName,setSubcategoryName]=useState('')
    const [subcategoryid,setSubcategoryId]=useState('')
    const [icon,setIcon]=useState({file:'/assests/Icon.gif',bytes:''})
    const [open,setOpen]=useState(false)
    const [error,setError]=useState({})
    const [oldIcon,setOldIcon]=useState('')
    const [btnStatus,setBtnStatus]=useState(false)
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


    const fetchSubcategoryList = async()=>{
        var result= await getData('subcategory/subcategory_list')
        setSubcategoryList(result.data)
        
    }

    const handleError=(input,value)=>{
      setError(prev=>({...prev,[input]:value}))
    }

    const validation=()=>{
      var isValid=true

      if(!categoryId)
      {
        handleError('categoryId',"Please input category name...")
        isValid=false
      }

      if(!subcategoryName)
      {
        handleError('subcategoryName','Please input subcategory name...')
        isValid=false
      }

      if(!status)
      {
        handleError('status',"Please select status...")
        isValid=false
      }
      return isValid
    }

    const handleEdit=async()=>{
      setOpen(false)

      if(validation())
      {
      var body={subcategoryid:subcategoryid,categoryid:categoryId,status:status,subcategoryname:subcategoryName}
      var result=await postData("subcategory/edit_sub",body)

      if(result.status)
      {
        Swal.fire({
          icon:"success",
          title: result.message,
          showConfirmButton: true,

        })
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
      fetchSubcategoryList()
    }

    const showSubcategoryForm=()=>{
      return (
        
            <div className={classes.dialogbox}>
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
                        <TextField value={subcategoryName} helperText={error.subcategoryName} error={error.subcategoryName?true:false} onFocus={()=>handleError('subcategoryName',null)} onChange={(event)=>{setSubcategoryName(event.target.value)}} label="Subcategroy Name" variant="outlined" fullWidth />                    
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
                    <Grid item xs={3}>
                        <Avatar alt="Icon" src={icon.file} sx={{width:48,height:48}}/>
                        
                    </Grid>
                    
                    <Grid item xs={5}>
                      {btnStatus?<>
                      <Button varient='contained' onClick={handleEditIcon}>Save</Button>
                      <Button varient='contained' onClick={handleCancle}>Cancle</Button></>:<></>}
                    </Grid>
                    <Grid item xs={6}>

                        <Button onClick={handleEdit}  variant="contained" fullWidth>Edit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleDelete} variant="contained" fullWidth>Delete</Button>
                    </Grid>
                </Grid>
            </div>
        


    )
    }
  const handleDelete=async()=>{
      
        var body={subcategoryid:subcategoryid}
        var result=await postData('subcategory/subcategory_delete',body)
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
        fetchSubcategoryList()
      }


    
    const handlePicture=(event)=>{
    
      setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      handleError('icon',null)
      setBtnStatus(true)
    }


    

    function showSubcategory(){
        return (
            <MaterialTable
              title="Subcategroy List"
              columns={[
               {title:'Subcategory Id',field:'subcategoryid'},
               {title:'Category', field:'categoryname'},
               {title:'Subcategory',field:'subcategoryname'},
               {title:'Status',field:'status'},
               {title:'Icon',field:'icon',
               render:rowData=><Avatar src={`${serverURL}/images/${rowData.icon}`} style={{width:75, height:75}} varient="rounded" />}
              ]}
              data={ subcategoryList }    
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Subcategory',
                  onClick: (event, rowData) => handleOpen(rowData)
                },
                {
                  icon: 'add',
                  tooltip: 'Add User',
                  isFreeAction: true,
                  onClick: (event) => navigate("/dashboard/subcategoryinterface")
                }
              ]}
            />
          )
        }

        const handleCancle=()=>{
          setIcon({file:`${serverURL}/images/${oldIcon}`,bytes:""})
          setBtnStatus(false)
          
        }

        const handleEditIcon=async()=>{

          var formData=new FormData()
          formData.append('subcategoryid',subcategoryid)
          formData.append('icon',icon.bytes)
          var result=await postData('subcategory/subcategory_edit_icon',formData)
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
          fetchSubcategoryList()
          setOpen(false)

        }

        

        useEffect(function(){
            fetchSubcategoryList()
        },[])

        const handleClose=()=>{
          setOpen(false)
        }

        const handleOpen=(rowData)=>{
          setCategoryId(rowData.categoryid)
          
          setSubcategoryId(rowData.subcategoryid)
          setSubcategoryName(rowData.subcategoryname)
          setStatus(rowData.status)
          setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
          setOldIcon(rowData.icon)
          setOpen(true)
        }

        const displaySubcategoryDialog=()=>{
          return(
          <Dialog
          open={open}
          onClose={handleClose}>
            <DialogContent>{showSubcategoryForm()}</DialogContent>
           <DialogActions ><Button onClick={handleClose} variant="contained">Close</Button></DialogActions>
          </Dialog>
          )
        }
        return <div className={classes.displaycontainer}>
          <div className={classes.displaybox}>
            {showSubcategory()}
          </div>
        {displaySubcategoryDialog()}
        </div>
    }
