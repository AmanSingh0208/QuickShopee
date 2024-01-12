import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    main:{
        padding:"10px 15px",
        // width:"30rem"
        
    },

    head:{
        display:"flex",
        // flexDirection:"column",
        justifyContent:"center",

        alignItems:"center",
        margin:"10px"
    },

    text:{
        fontFamily:"lato",
        fontSize:"16px",
        fontWeight:"400",
        lineHeight:"24px",
        color:"rgb(0,0,0)",
        marginLeft:"1rem",
        letterSpacing:0.2
    },

    btn:{
        fontFamily:"lato",
        fontSize:"13px",
        fontWeight:"500",
        lineHeight:"16px",
        color:"rgb(255, 255, 255)",
        letterSpacing:1
    },
    delivery_add:{
        display:"flex",
        flexDirection:"column",
        fontFamily:"Poppins",
        fontSize:"14px",
        fontWeight:"400",
        // lineHeight:"24px",
        color:"rgb(0,0,0)",

    },

    display_add:{
        margin:"1rem"
    }


})