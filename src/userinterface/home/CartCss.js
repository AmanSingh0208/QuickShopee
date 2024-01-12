import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    main:{
        margin:"2rem 10rem",
        // display:"flex",
        // flexDirection:"row",

    },

    sub_main:{
        
        display:"flex",
        flexDirection:"row",
        
    },

    cart_heading:{
        fontFamily:"roboto",
        fontWeight:500,
        fontSize:"22px",
        lineHeight:"28px",
        // margin:"2rem",
        display:"flex",
        alignItems:"center",
        width:"100%",
        justifyContent:"space-between",
        
        
    },

    components:{
        width:"50%"
    },

    outterbox:{
        border:"1px solid lightgrey",
        borderRadius:5,
        margin:10,
        boxShadow:"0.5px 0.5px 1px 1px lightgrey"
    },
    
    footer:{
        marginLeft:"4%",
        marginRight:"4%",
    }

})