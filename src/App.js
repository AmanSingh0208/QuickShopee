import {Routes,BrowserRouter as Router,Route} from "react-router-dom";
import ExploreByCategory from "./userinterface/category/ExploreByCategory";
import AdminLoginInterface from "./administrator/adminlogin/AdminLoginInterface";
import Dashboard from "./administrator/dashboard/Dashboard";
import Home from "./userinterface/home/Home";
import ProductBySubcategory from "./userinterface/home/ProductBySubcategory"
import Cart from "./userinterface/home/Cart";
import ProductOrderDetail from "./userinterface/home/ProductDetail";
import UnitComponent from "./userinterface/productdetailcomponents/UnitComponent"
import Location from "./userinterface/cart/Location";
import PictureComponent from "./userinterface/productdetailcomponents/PictureComponent";
import MakePayment from "./userinterface/cart/MakePayment";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          
          <Route element={<AdminLoginInterface/>} path="/adminlogininterface" />
          <Route element={<Dashboard/>} path="/dashboard/*" />
          <Route element={<Home/>} path="/home"/>
          <Route element={<ExploreByCategory/>} path="/explorebycategory"/>
          <Route element={<ProductBySubcategory/>} path="productbysubcategory"/>
          <Route element={<Cart/>} path="/cart" />
          <Route element={<ProductOrderDetail/>} path="/productorderdetail" />
          <Route element={<UnitComponent/>} path="/productunit" />
          <Route element={<Location/>} path="/location" />
          <Route element={<PictureComponent/>} path="/productpicture" />
          <Route element={<MakePayment/>} path="/makepayment" />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
