import React, { useState,useEffect } from "react";
import { useStyles } from "./AddressDetailsCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from "@mui/material/DialogTitle";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Grid, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { postData } from "../../administrator/services/FetchNodeServices";


export default function AddressDetails(props){
    const [open,setOpen] = useState(props.addStatus)
    const classes = useStyles()
    // const [mobileno, setMobileno] = useState(props.mobileno)
    const [title,setTitle] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [alternateNo,setAlternateNo] = useState('')
    const [addressOne,setAddressOne] = useState('')
    const [addressTwo,setAddressTwo] = useState('')
    const [city,setCity] = useState('')
    const [state,setState] = useState('')
    const [zip,setZip] = useState('')
    const [addressPlace,setAddressPlace] = useState('')

    var allstates = [
      "Andaman and Nicobar Islands",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Ladakh",
      "Lakshadweep",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Puducherry",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal"
    ]

    function fetchStates(){
      return allstates.map((item)=>{
        return(
          <MenuItem value={item}>{item}</MenuItem>
        )

      })
    }

    useEffect(function(){
      setOpen(props.addStatus)
    },[props.addStatus])

    const handleClick = () => {
      setOpen(false)
    }

    const handleClose=()=>{
        setOpen(false)
        handleSubmit()
        // alert(title)
        // alert(name)
        // alert(email)
        // alert(alternateNo)
        // alert(addressOne)
        // alert(addressTwo)
        // alert(city)
        // alert(state)
        // alert(zip)
        // alert(addressPlace)
        
        
    }

    const handleSubmit = async() => {
      var body = {name:title+" "+name,email:email, mobileno:props.mobileno,alternateno:alternateNo,addressone:addressOne,addresstwo:addressTwo,city:city,state:state,zip:zip,status:addressPlace}
      var result = await postData("userinterface/add_address",body)
      if(result.status)
      {alert("Address Saved")}
    }

    const showInput=()=>{
        return(
        <div className={classes.dialog_box}>
            <div className={classes.head}>{"This allow us to find you easily and give you timely delivery experience"}</div>
            <Grid container spacing={1.5} >
                <Grid item xs={3}><FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Title</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={title}
                      label="Status"
                      onChange={(e)=>setTitle(e.target.value)}
                      
                      // style={{borderRadius:8}}
                    >
                      <MenuItem value={"Mr."}>Mr.</MenuItem>
                      <MenuItem value={"Ms."}>Ms.</MenuItem>
                      <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
              <Grid item xs={9}><TextField  size="medium" id="name" onChange={(e)=>setName(e.target.value)} label="Receiver's Name" fullWidth></TextField></Grid>
              <Grid item xs={6}><TextField  size="medium" id="email" onChange={(e)=>setEmail(e.target.value)}  label="E-mail" fullWidth></TextField></Grid>
              <Grid item xs={6}><TextField  size="medium" id="alternateno." onChange={(e)=>setAlternateNo(e.target.value)}  label="Alternate No. (Optional)" fullWidth></TextField></Grid>
              <Grid item xs={12}><TextField size="medium"  id="adddressone" onChange={(e)=>setAddressOne(e.target.value)}  label="Flat / House / Office No." fullWidth></TextField></Grid>
              <Grid item xs={12}><TextField size="medium"  id="addresstwo" onChange={(e)=>setAddressTwo(e.target.value)}  label="Street / Society / Office Name" fullWidth></TextField></Grid>
              <Grid item xs={6}><TextField  size="medium" id="city" onChange={(e)=>setCity(e.target.value)}  label="City" fullWidth></TextField></Grid>
              <Grid item xs={6}><FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={state}
                      label="States"
                      onChange={(e)=>setState(e.target.value)}
                      
                      // style={{borderRadius:8}}
                    >
                     {fetchStates()}
                    </Select>
                    </FormControl></Grid>
              <Grid item xs={6}><TextField id="zip" onChange={(e)=>setZip(e.target.value)} label="ZIP Code"></TextField></Grid>
              <Grid item xs={6}>
                <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginTop:"-10px",
                      marginLeft:"-2px",
                      
                      '& > *': {
                        m: 1,
                      },
                    }}
                >
                  <div className={classes.address}>{"Save address as "}<div style={{color:"rgb(46,125,50)",fontWeight:700,marginLeft:"5px"}}>{addressPlace}</div></div>
                    <ButtonGroup style={{margin:"1px 2px"}} id='addressPlace' value={addressPlace} size="small" aria-label="small button group">
                      <Button variant="contained" style={{background:"rgb(46, 125, 50"}} onClick={(e)=>setAddressPlace(e.target.value)} value={"Home"} key="home" >Home</Button>
                      <Button variant="contained" style={{background:"rgb(46, 125, 50"}} onClick={(e)=>setAddressPlace(e.target.value)} value={"Work"} key="work">Work</Button>
                      <Button variant="contained" style={{background:"rgb(46, 125, 50"}} onClick={(e)=>setAddressPlace(e.target.value)} value={"Other"}  key="other">Other</Button>
                    </ButtonGroup>
                </Box>
              </Grid>
            </Grid>
            
        </div>
        )
    }

    const showDialog=()=>{
        return(
            <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          PaperProps={{
            sx: {
              width:"90%"
              
              
            }
          }}
          scroll="body"
        >
          

        <Grid container spacing={0}>

            <Grid item xs={5}>
                <img src="../../assets/LocationMap.png" width="100%" height="99%" />
            </Grid>
          <Grid item xs={7}>
          <DialogTitle style={{display:"flex",background:"#fff",margin:"1rem 1rem 0 0rem"}}><div className={classes.title}>{"Enter complete address"}</div>
          <IconButton
          aria-label="close"
          onClick={handleClick}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: (theme) => theme.palette.grey[500],
            
          }}
        >
          <CloseIcon onClick={handleClick} />
        </IconButton></DialogTitle>
          <DialogContent style={{margin:"0rem 1rem 0 0rem"}}>{showInput()}</DialogContent>
          <DialogActions >
            <Button variant="contained" color="success" fullWidth style={{margin:"1.5rem 2rem 1rem 1rem"}} onClick={handleClose}>Save Address</Button>
            
          </DialogActions>
          </Grid>
        </Grid>
        </Dialog>
        )
    }
    
    return(
        <div>
            {showDialog()}
        </div>
    )
}