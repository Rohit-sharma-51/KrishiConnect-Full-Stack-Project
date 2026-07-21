import "./App.css";
import Application from "./components/Application";
import Benefits from "./components/Benefits";
import Faq from "./components/Faq";
import Hero from "./components/Hero";
import Institute from "./components/Institute";
import Login from "./components/Login";
import Peer from "./components/Peer";
import Quote from "./components/Quote";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Deposit from "./components/Deposit";
import Success from "./components/Success";
import Failure from "./components/Failure";
import Widthdraw from "./components/Widthdraw";
import AboutUs from "./components/AboutUs";
import TrackingAndSupport from "./components/tracking";
import ShipmentPage from "./components/shipment";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TermsAndConditions from "./components/terms";
import ContactUs from "./components/ContactUs";
import MarketPlace from "./Pages/MarketPlace/MarketPlace";
import CropCategory from "./Pages/CropCategory/CropCategory";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/AddProduct";
import MarketData from "./components/MarketData";
import AIInsights from "./components/AIInsights";
import PaymentExample from "./components/PaymentExample";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Hero />
              <Quote />
              <Benefits />
              <Application />
              <Faq />
            </>
          }
        />
        <Route exact path="/p2p" element={<Peer />} />
        <Route exact path="/ifb" element={<Institute />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/transfermoney" element={<Deposit />} />
        <Route exact path="/widthdrawmoney" element={<Widthdraw />} />
        <Route exact path="/success" element={<Success />} />
        <Route exact path="/failure" element={<Failure />} />
        <Route exact path="/AboutUs" element={<AboutUs />} />
        <Route exact path="/tracking" element={<TrackingAndSupport />} />
        <Route exact path="/shipments" element={<ShipmentPage />} />
        <Route exact path="/terms" element={<TermsAndConditions />} />
        <Route exact path="/ContactUs" element={<ContactUs />} />
        <Route exact path="/marketplace" element={<MarketPlace />} />
        <Route exact path="/crops/:cropId" element={<CropCategory />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/add-product" element={<AddProduct />} />
        <Route exact path="/market-data" element={<MarketData />} />
        <Route exact path="/ai-insights" element={<AIInsights />} />
        <Route exact path="/test-payment" element={<PaymentExample productDetails={{ name: "Test Seed", price: 100, unit: "kg" }} quantity={1} />} />
      </Routes>
    </>
  );
}

export default App;
