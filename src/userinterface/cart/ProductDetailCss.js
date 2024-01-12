import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    name:{
        fontFamily:"lato",
        fontSize:"15px",
        fontWeight:400,
        lineHeight:"20px",
        color:"rgb(0,0,0)",
        lineHeight:1.5
    },

    weight:{
        fontFamily:"lato",
        fontSize:"13px",
        fontWeight:400,
        lineHeight:"16px",
        color:"rgba(43, 30, 53, 0.5)",
        lineHeight:1.5
    },

    rate:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        lineHeight:1.5
    },

    offer:{
        fontFamily:"lato",
        fontSize:"16px",
        fontWeight:700,
        lineHeight:"24px",
        color:"rgba(0, 0, 0)"
    },
    
    price:{
        fontFamily:"lato",
        fontSize:"14px",
        fontWeight:400,
        lineHeight:"18px",
        color:"rgba(255, 50, 105)",
        marginLeft:"5px"
    }


})