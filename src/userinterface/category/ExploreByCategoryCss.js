import { Padding } from "@mui/icons-material";
import { makeStyles,} from "@mui/styles";

export const useStyles = makeStyles({
    
    main:{
        marginLeft:"8%",
        marginRight:"8%",
        // marginTop:"1rem",
        
        
    },

    container_body:{
        // background:"red",
        marginTop:"0rem",
        // marginLeft:"0.5rem"
       
    },

    category_list:{
        display:"flex",
        flexDirection:"row",
        // marginTop:"0.3rem",
        // marginBottom:"0.2rem",
        // padding:"0.5rem",
        alignItems:"center",
        cursor:"pointer",
        
        // position:"relative",
        // zIndex:0
        
    },

    category_img:{
        background:"#F7F0FA",
        boxShadow: "1px 1px #BDBDBD",
        width:'3.8rem',
        height:"3.8rem",
        borderRadius:"2.5rem",
        // position:"absolute",
        // zIndex:1
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },

    category_name:{
        fontFamily:"Poppins",
        fontSize:"1rem",
        marginLeft:"0.6rem",
        fontWeight:450,
        color:"#D670AC"
    },

    // category_img:hover={
    //     background:"#FFFFFF"
    // }

    category_heading:{
        alignItems:"center",
        fontFamily:"'Lato', sans-serif",
        fontSize:22,
        fontWeight:"600",
        color:"#28282B",
        marginLeft:"2.3rem",
        margin:"0.5rem 0rem",
        letterSpacing:0.8
    },

    category_name_heading:{
        fontFamily:"'Lato', sans-serif",
        fontSize:22,
        fontWeight:"600",
        color:"#28282B",
        letterSpacing:0.8,
        margin:"0.8rem 0rem",
    },

    
    
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
        // fontFamily:"'Lato', sans-serif",
        // letterSpacing:"0.5px",
        // marginBottom:"0.3rem"
        

    },

    category_product_button:{
        marginRight:"0.5rem",
        position:"relative",
        // marginLeft:"6rem"
    }

   


})