import { Button } from "@mui/material"
import Box from '@mui/material/Box';
import {useState,useEffect}  from "react"
import { postData } from "../../administrator/services/FetchNodeServices";
import PlusMinusComponent from "../plusminuscomponent/PlusMinusComponent";
import { useDispatch,useSelector } from "react-redux";

export default function UnitComponent(props,product  ) {
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
  

     
   const handleClick=(item,index)=>{
    
        item['qty']=0
        // searchInCart(item)
         setSelectedProduct(item)
         
        //  props.getproductlistid(item.productlistid,item.weight)
        
        }
     
        const handleQtyChange=(value)=>
         { var product = selectedProduct
            if(value>=1)
            {
            
                product['qty'] = value

                dispatch ({type:'ADD_PRODUCT',payload:[product.productlistid,product]})
            }
            else
            {
                product['qty'] = 0

                dispatch ({type:'DELETE_PRODUCT',payload:[product.productlistid,product]})
            }

            props.refreshPage(true)
         }


    const fillAllUnits = () => {
        return units.map((item,index) => {
            return (
                <Box onClick={()=>{handleClick(item,index)}} style={{ cursor: 'pointer', width: '20%', borderRadius: 17, marginLeft: '2%', marginTop: '2%',border:item.productlistid==selectedProduct.productlistid?"2.3px solid #0984e3":"1px solid #70a1ff" }}  >
                 <div style={{display:'flex',flexDirection:'column'}}>

                          
                           <div style={{ borderBottomRightRadius:8,borderBottomLeftRadius:8, width: '60%',justifySelf:"center", marginLeft: '20%', background: '#70a1ff' }}>
                           <div style={{  padding: 2, display: 'flex', justifyContent: 'center', fontSize: 10, fontFamily: 'Roboto', fontWeight: '550', color: 'white' }}>
                               {item.offer == 0?<>0% OFF</>:<> {parseInt(((item.rate-item.offer)/item.rate)*100)} % OFF</>}
                           </div>
                           </div>
                          
                          <div style={{ display: 'flex', justifyContent: 'center', fontSize: 12, fontFamily: 'Roboto', fontWeight: 500,paddingTop:2,lineHeight:"18px" }}>
                            {item.weight}
                            </div>
                            
                            
                            {item.stock == 0 ? <>
                                 <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center', fontSize: 14, fontFamily: 'Roboto', color:"red" }}>
                                     Out Of Stock
                                     
                                </div>
                           </> : <><div style={{ display: 'flex', justifyContent: 'center', fontSize: 14,paddingTop:2 }}>

                        <div style={{ fontFamily: 'Roboto',lineHeight:"22px",fontWeight:400 }} >
                          {item.offer == 0?<>&#8377;{item.rate}</>: <>&#8377;{item.offer}  <s> &#8377;{item.rate}</s></>}
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
        <div style={{margin:"1.5rem 0 0 1rem"}}><PlusMinusComponent qty={selectedProduct.qty} onChange={handleQtyChange}/></div>
        </div>
    )
}