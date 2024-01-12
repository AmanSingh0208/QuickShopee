import { makeStyles } from "@mui/styles";



export const useStyles = makeStyles({

    header:{
        display:"flex",
        width:"100%",
        position:"static",
        // zIndex:2,
        
       
        
    },

    name:{
       alignItems:"center",       
       padding: "5px 10px 5px 0px",
       display:"flex",
       width:"100%",      
       
    },

    logo:{
        alignItems:"center",
        width:"90%",
        paddingRight:"10%",
        paddingBottom:3,
        display:"flex",
        justifyContent:"space-between",
        
       },
    
   
    cart:{
           alignItems:"flex-end",
           paddingRight:"1%",
           color:"#3498db",
           cursor:"pointer"
        },
   
    user:{
           alignItems:"flex-end",
           paddingRight:"1%",
           color:"#3498db",
           cursor:"pointer"
        }

    

   
     
});

