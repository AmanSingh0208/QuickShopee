import { makeStyles,} from "@mui/styles";

export const useStyles = makeStyles({

    circle_component_main:{
        display:"flex",
        flexDirection:"column",
        justifyItems:"center",
        alignItems:"center",
        textAlign:"center",
        width:"100%",
        // background:"red"
        cursor:"pointer",
    },
    

    circle_component_image:{
        display:"flex",
        justifyContent:"center",
        justifySelf:"center",
        alignItems:"center",
        
        
        borderRadius:"5rem",
        
    },

    circle_component_name:{
        fontFamily:"'Lato', sans-serif",
        fontSize:"1.05rem",
        fontWeight:580,
        color:"rgb(43, 30, 53)",
        margin:"0.5rem 0rem",
        
    },

    heading:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },

    heading_text:{
        fontFamily:"'Lato', sans-serif",
        fontSize:22,
        fontWeight:"600",
        color:"rgb(43, 30, 53)"
        

    },

    arrows:{
        display:"flex",
        flexDirection:"row"
    },

    leftarrow:{
        color:" rgb(43, 30, 53)",
        fontSize:22,
    },

    rightarrow:{
        color:" rgb(43, 30, 53)",
        fontSize:22,
    },

    slider:{
        marginTop:"1rem"
    },

    images:{
        cursor:"pointer"
    }
    
})