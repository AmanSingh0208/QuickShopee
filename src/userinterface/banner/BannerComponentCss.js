import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
 images:{
    position:"relative",
    // display:"flex",
    // flexDirection:"row"
 },

 leftarrow:{
    position:"absolute",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    top:"44%",
    left:"1.5%",
    zIndex:1,
    background:"#FFFFFF",
    height:"12%",
    width:"3%",
    borderRadius:"50%",
    opacity:"50%"

 },

 rightarrow:{
    position:"absolute",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    top:"44%",
    right:"1.5%",
    zIndex:1,
    background:"#FFFFFF",
    height:"12%",
    width:"3%",
    borderRadius:"50%",
    opacity:"50%"
 }
})
