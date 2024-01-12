import { fontGrid } from "@mui/material/styles/cssUtils";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({

    main_container:{
        marginBottom:"3rem"
    },


    links:{
        display:"flex",
        flexDirection:'column'

    },

    logo:{
        cursor:"pointer",

    },

    social_media:{
        display:"flex",
        flex:10,
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:"1.5rem",
        cursor:"pointer",
        width:"75%"

    },

    copy_right:{
        margin:"15px 0px 10px 4px",
        cursor:"pointer",
        display:"flex",
        flexDirection:"row",
        alignItems:"center"

    },

    copyright_text:{
        fontFamily:"Poppins",
        fontSize:"95%",
        marginLeft:"0.5rem",
        color:"#BDBDBD",
        fontWeight:"500"
    },

    links_text:{
        display:"flex",
        flexDirection:"column",
        // justifyContent:"flex-start",
        
        // textAlign:"left"
        
        
    },

    links_text_a:{
        textDecoration:"none",
        color:"black",
        margin:"0.5rem 0 0.5rem 1rem",
        fontWeight:"480",
        fontSize:"14.5px",
        fontFamily:"'Lato', sans-serif",
    },

    app:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
    },

    app_text:{
        margin:"0.5rem 0 0.5rem 3rem",
        fontWeight:"500",
        fontSize:"15px",
        fontFamily:"'Lato', sans-serif",
    },

    app_button:{
        margin:"0.5rem 0 0.5rem 3rem",
        color:"black",
        width:"70%",
        height:"2.5rem",
        textDecoration:"none",
        borderStyle:"groove",
        // borderColor:"#E2E5E8",
        borderRadius:"8px",
        outline:"",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        cursor:"pointer"
    },

    app_a:{
        textDecoration:"none",
        fontFamily:"'Lato', sans-serif",
        color:"black",
        fontSize:"12px",
        fontWeight:"480",
        marginLeft:"5px"

    }

    
})