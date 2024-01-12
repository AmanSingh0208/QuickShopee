import { Button } from "@mui/material"
import Box from '@mui/material/Box';
import {useState,useEffect}  from "react"
import { postData } from "../../../administrator/services/FetchNodeServices";
import PlusMinusComponent from "../../plusminuscomponent/PlusMinusComponent";
import { useDispatch,useSelector } from "react-redux";

export default function ProductUnit(props) {
   const [units,setUnits]=useState([])
   const [selectedProduct,setSelectedProduct]=useState(props.product)
  
   var dispatch=useDispatch()
   const cart=useSelector((state)=>state.products)
   const cartItems=Object.values(cart)

    const searchInCart=()=>{
        var searchProduct=cartItems.filter((item)=>{
            return item.productlistid==props.product.productlistid
        })
        if(searchProduct?.length!=0)
        {
            setSelectedProduct(searchProduct[0])
        } 
            else
          {
            props.product['qty']=0
          setSelectedProduct(props.product)
           }
    }
    
    const fetchProductlist=async()=>{
        var result=await postData('userinterface/fetch_productlist_by_productid',{productid:props.product.productid})
         setUnits(result.data)
        }

 useEffect(function(){
    fetchProductlist()
    searchInCart()
 },[])
  

     
   const handleClick=(item,i)=>{
         setSelectedProduct(item)
         props.getproductlistid(item.productlistid,item.weight)
        
        }
     
        const handleQtyChange=(value)=>
        { alert(value)
            var product=selectedProduct
              
            if(value>=1)
            {
           
           product['qty']=value
           dispatch({type:'ADD_PRODUCT',payload:[product.productlistid,product]})  
            }
            else
            {      product['qty']=value
                dispatch({type:'DELETE_PRODUCT',payload:[product.productlistid,product]})  
   
            }   
            props.refreshPage()    
        }

       const fillAllUnits = () => {
        return units.map((item,i) => {
            return (
                <Box onClick={()=>handleClick(item,i)} style={{ cursor: 'pointer', width: '18%', borderRadius: 17, border:item.productlistid==selectedProduct.productlistid?'3px solid green':'1px solid grey', marginLeft: '2%', marginTop: '2%' }}  >
                 <div style={{display:'flex',flexDirection:'column'}}>

                          
                           <div style={{ borderBottomRightRadius:8,borderBottomLeftRadius:8, width: '70%', marginLeft: '15%', background: '#70a1ff' }}>
                           <div style={{  padding: 2, display: 'flex', justifyContent: 'center', fontSize: 12, fontFamily: 'Poppins', fontWeight: 'bold', color: 'white' }}>
                                {parseInt(((item.rate-item.offer)/item.rate)*100)} % OFF
                           </div>
                           </div>
                          
                          <div style={{ display: 'flex', justifyContent: 'center', fontSize: 13, fontFamily: 'Poppins', fontWeight: 700,paddingTop:2 }}>
                            {item.weight}
                            </div>
                            
                            
                            {item.stock == 0 ? <>
                                 <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center', fontSize: 14, fontFamily: 'Poppins', color: '#7f8c8d' }}>
                                     Out Of Stock
                                     
                                </div>
                           </> : <><div style={{ display: 'flex', justifyContent: 'center', fontSize: 15,paddingTop:2 }}>

                        <div style={{ fontFamily: 'Poppins' }} >
                          <b> &#8377;{item.offer}</b>  <s> &#8377;{item.rate}</s>
                            </div>
                            </div></>}
                           
                            </div>
                           
                           
                           
                </Box>
            )
        })
    }

   
    return (
        <div style={{ width: '95%', padding: 5, fontFamily: 'Poppins', fontSize: 13 }}>
            <div style={{ fontWeight: 'bold', }}>
                Select Unit
            </div>
            <div style={{ display: 'flex',flexWrap:'wrap' }}>
                {fillAllUnits()}
            </div>
        <PlusMinusComponent qty={selectedProduct?.qty} onChanges={handleQtyChange}/>
        </div>
    )
}