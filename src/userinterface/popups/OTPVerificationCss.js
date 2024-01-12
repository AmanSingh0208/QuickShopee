import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    dialog_box:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        fontFamily:"Poppins",
        fontSize:18,
        fontColor:"rgb(0,0,0)",
        
    },

    otp_input:{
        width:"20rem",
        margin:"2rem 1rem 0 1rem",
        fontFamily:"Poppins"
    },

    head:{
        padding:25,
        textAlign:"center"
    },

    title:{
        fontFamily:"Poppins",
        fontSize:24,
        fontWeight:100
    },

    resend:{
        fontFamily:"Poppins",
        fontSize:16,
        fontWeight:600,
        // color:"green",
        
        cursor:"pointer"
    }

})