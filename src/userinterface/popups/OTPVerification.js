import React, { useState,useEffect } from "react";
import { useStyles } from "./OTPVerificationCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddressDetails from "./AddressDetails";
import {postData} from "../../administrator/services/FetchNodeServices";
import { useDispatch } from "react-redux";

export default function OTPVerification(props){
    const [open,setOpen] = useState(props.otp)
    const classes = useStyles()
    const [getInputOTP, setInputOTP] = useState('')
    const [addStatus,setAddStatus] = useState(false)
    var dispatch=useDispatch()
    useEffect(function(){
      setOpen(props.otp)
      
  },[props.otp])

  const handleClick = () => {
    setOpen(false)
    
    // alert(addStatus)
  }

    const handleClose=async()=>{
        
        if(parseInt(props.genOTP)==parseInt(getInputOTP))
        { var mobilenostatus = await postData("userinterface/check_mobile_no",{mobileno:props.mobileno})
          if(mobilenostatus.status)
            { var addressStatus = await postData("userinterface/check_address_by_mobile_no",{mobileno:props.mobileno})
              if(addressStatus.status)  
              {
                setOpen(false)
                props.setBtnTitle("Proceed To Payment")
                props.setIconTitle("Your Delivery Address")
                props.setAddress(addressStatus.data)
                dispatch({type:'ADD_USER',payload:[addressStatus.data[0]]})
              }
              else
              {
                setOpen(false)
                setAddStatus(true)
              }
            
            }
            else
            {
              setOpen(false)
              setAddStatus(true)
            }
        }
        else
        {
          alert("Invalid OTP")
        }
    }

    

    const checkRandomOTP=(event)=>{
      var inputOTP=""
      if((document.getElementById("first").value).length==1)
      {
        document.getElementById("second").focus()
        inputOTP+=document.getElementById("first").value
      }
      if((document.getElementById("second").value).length==1)
      {
        document.getElementById("third").focus()
        inputOTP+=document.getElementById("second").value
      }
      if((document.getElementById("third").value).length==1)
      {
        document.getElementById("fourth").focus()
        inputOTP+=document.getElementById("third").value
      }
      if((document.getElementById("fourth").value).length==1)
      {
        inputOTP+=document.getElementById("fourth").value
        setInputOTP(inputOTP)
      }
    }

    const showInput=()=>{
        return(
        <div className={classes.dialog_box}>
            <div className={classes.head}>{"Enter 4 digit code sent to your phone +91xxxxxx"}{props.mobileno.substring(6)}</div>
            <div>
              <TextField onChange={(event)=>checkRandomOTP(event)} id="first" size='small' sx={{ m: 1, width:"4ch"}}  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} ></TextField>
              <TextField onChange={(event)=>checkRandomOTP(event)} id="second" size='small' sx={{ m: 1, width:"4ch"}} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  ></TextField>
              <TextField onChange={(event)=>checkRandomOTP(event)} id="third" size='small' sx={{ m: 1, width:"4ch"}}  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} ></TextField>
              <TextField onChange={(event)=>checkRandomOTP(event)} id="fourth" size='small' sx={{ m: 1, width:"4ch"}} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} ></TextField>
            </div>
            
        </div>
        )
    }

    const showDialog=()=>{
        return(
            <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle style={{justifyContent:"center",display:"flex",background:"#fff",margin:"0.3rem 5rem"}}><div className={classes.title}>{"Phone Number Verification"}</div>
          <IconButton
          aria-label="close"
          onClick={handleClick}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon onClick={handleClick} />
        </IconButton></DialogTitle>

          <DialogContent style={{background:"rgb(249,249,249)",padding:"0.5rem 8rem"}}>{showInput()}</DialogContent>
          <DialogActions style={{background:"rgb(249,249,249)",padding:"0.5rem 8rem",display:"flex",flexDirection:"column"}}>
            <Button variant="contained" color="success" fullWidth style={{margin:"0.5rem 0"}} onClick={handleClose}>SUBMIT</Button>
            <Button color="success" style={{marginBottom:"1rem"}}><div className={classes.resend}>{"Resend Code"}</div></Button>
          </DialogActions>
        </Dialog>
        )
    }
    
    return(<div>
        <div>
            {showDialog()}
        </div>
        <AddressDetails mobileno={props.mobileno} addStatus={addStatus} />
        </div>
    )
}