import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    category_product_img:{
        width:"7rem",
        height:"8.5rem",
        display:"flex",
        justifyContent:"center",
        margin:"0.5rem",
        padding:"0.5rem",
        // background:"red"
    },
    
    category_product_name:{
        fontFamily:"'Lato', sans-serif",
        letterSpacing:"0.5px",
        margin:"0.2rem",
        
    },
    
    category_product_description:{
        fontFamily:"'Lato', sans-serif",
        letterSpacing:"0.5px",
        margin:"0.2rem",
        
    },
    
    price_button:{
        display:"flex",
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center",
    },
    category_product_price:{
        fontFamily:"'Lato', sans-serif",
        letterSpacing:"0.5px",
        margin:"0.2rem",
    },
    category_product_rate:{
        // fontFamily:"'Lato', sans-serif",
        // letterSpacing:"0.5px",
        // marginTop:"0.1rem",
        // color:"#BDBDBD"

    },

    category_product_main:{
        fontFamily:"'Lato', sans-serif",
        letterSpacing:"0.5px",
        marginBottom:"0.3rem"
        

    },

    heading:{
        fontFamily:"'Lato', sans-serif",
        margin:"1rem 0rem",
        fontSize:22,
        fontWeight:"600",
        color:"rgb(43, 30, 53)"
        
    }
   



})