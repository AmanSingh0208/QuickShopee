import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState,useEffect } from 'react';
import { TextField } from '@mui/material';
import { useStyles } from './NumberVerificationCss';
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import OTPVerification from './OTPVerification';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function NumberVerification(props) {
  const classes = useStyles()
  const [getDOpen,setDOpen] = useState(props.status)
  const [mobileNo,setMobileNo] = useState('')
  const [genOTP,setGenOTP] = useState("")
  const [otp,setOtp] = useState(false)
  
  useEffect(function(){
    setDOpen(props.status)
    
},[props.status])
  
const handleClick = () => {
  setDOpen(false)
}

const generateOTP=()=>{
  var randomOTP = parseInt(Math.floor(Math.random() * 8999) + 1000)
  setGenOTP(randomOTP)
  alert(randomOTP)
}

  const handleClose=()=>{
    setDOpen(false)
    generateOTP()
    setOtp(true)
  }

  const showInput=()=>{
    return(
    <div className={classes.dialog_box}>
        <div className={classes.head}>{"Enter your phone number to Login/Sing up"}</div>
        <div><TextField
        
        inputProps={{ inputMode: 'number', pattern: '[0-9]*' }}
          size='small'
          value={mobileNo}
          id="outlined-start-adornment"
          onChange={(e)=>setMobileNo(e.target.value)}
          sx={{ m: 1, width:"30ch"}}
          InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneIphoneIcon/>+91</InputAdornment>,
          }}
        ></TextField></div>
        
    </div>
    )
}

  return (
    <div>
      
      <Dialog
        open={getDOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        
        <DialogTitle  style={{justifyContent:"center",display:"flex",background:"#fff",margin:"0.3rem 5rem"}}><div className={classes.title}>{"Phone Number Verification"}</div>
      
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
        </IconButton>
      </DialogTitle>
        <DialogContent style={{background:"rgb(249,249,249)",padding:"0.5rem 8rem"}}>{showInput()}</DialogContent>
        <DialogActions style={{background:"rgb(249,249,249)",padding:"0.5rem 8rem",display:"flex",flexDirection:"column"}}>
          
        {mobileNo.length==10?<Button onClick={handleClose} variant='contained' style={{fontFamily:"Poppins",fontSize:15,backgroundColor:"#0C831F"}}  fullWidth>NEXT</Button>:
        <Button onClick={handleClose} variant='contained' style={{fontFamily:"Poppins",fontSize:15}} disabled fullWidth>NEXT</Button>}
          <div className={classes.footer}>
          <div className={classes.footer_text}>By continuing, you agree to our</div>
          <div className={classes.footer_link}>
            <div ><a className={classes.link_text} href='#'>{"Term of services"}</a></div>
            <div ><a className={classes.link_text} href="#">{"Privacy Policy"}</a></div>
          </div>
          </div>
        
        </DialogActions>
        
      </Dialog>

      <OTPVerification setIconTitle={props.setIconTitle} address={props.address} setAddress={props.setAddress} setBtnTitle={props.setBtnTitle} genOTP={genOTP} mobileno={mobileNo} otp={otp} />
    </div>
  );
}