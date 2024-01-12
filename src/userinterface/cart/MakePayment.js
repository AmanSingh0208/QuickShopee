import { useEffect } from "react";
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { serverURL } from "../../administrator/services/FetchNodeServices";
import Logo from "../logo/Logo";

export default function MakePayment() {
  const [Razorpay] = useRazorpay();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var user = useSelector((state)=>state.user)
  var userdata = Object.values(user)
  const products = useSelector((state) => state.products);
  const productList = Object.values(products)
  let total = productList.reduce((a,b) => {
    return a+b.offerprice*b.qty;
  },0);

  const handlePayment =() => {

    const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: "1000",
      currency: "INR",
      name: "QuickShopee",
      description: "Test Transaction",
      image: <Logo />,
    //   order_id: order.id,
      handler: (res) => {
        console.log(res);
        navigate("/home")
      },
      prefill: {
        name: userdata[0].name,
        email: "youremail@example.com",
        contact: userdata[0].mobileno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  useEffect(function(){
    var timeout = setTimeout(handlePayment,1000)}
    )

  return (
    <div className="App">
      <button onClick={handlePayment}>Click</button>
    </div>
  );
}