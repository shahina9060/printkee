import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Categories from "./pages/Categories";
import Subcategories from "./pages/Subcategories";
import Products from "./pages/Products";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import EnquiryForm from "./enquirySection/EnquiryForm";
import ImageSlider from "./components/ImageSlider";
import AdminDashboard from "./adminSection/AdminDashboard";
import UploadImages from "./adminSection/UploadImages";
import Layout from "./adminSection/Layout";
import HeaderNav from "./components/HeaderNav";
import WhatsAppMail from "./enquirySection/WhatsAppMail";
import TshirtCanvas from "./productDetails/TshirtCanvas";
import CapDetails from "./productDetails/CapDetails";
import CapCanvas from "./productDetails/CapCanvas";
import UploadProducts from "./adminSection/UploadProducts";
import AddText from "./productDetails/AddText";
import { Toaster } from "react-hot-toast";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLogin from "./adminSection/AdminLogin";
import SearchProduct from "./pages/SearchProduct";
import UploadCSVFile from "./adminSection/UploadCSVFile";
import BottleCanvas from "./productDetails/BottleCanvas";
import CorporateCanvas from "./productDetails/CorporateCanvas";
import NotebookDiaryCanvas from "./productDetails/NotebookDiaryCanvas";
import BagCanvas from "./productDetails/BagCanvas";
import TshirtCustomizer from "./tshirt/TshirtCustomizer";
import ToteBagCustomizer from "./toteBags/ToteBagCustomizer";

function App() {
  return (
    <Router>
      <Toaster />
      <HeaderNav />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutSection" element={<AboutSection />} />
        <Route path="/ServicesSection" element={<ServicesSection />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<Subcategories />} />
        <Route
          path="/categories/:category/:subcategory"
          element={<Products />}
        />
        <Route path="/imageSlider" element={<ImageSlider />} />
   
        {/* Admin Routes - Wrap them in Layout */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Layout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="uploadimages" element={<UploadImages />} />
          <Route path="upload" element={<UploadProducts />} />
          <Route path="uploadcsvfile" element={<UploadCSVFile />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/tshirtcanvas" element={<TshirtCanvas />} />
        <Route path="/tshirtcanvas/:productId" element={<TshirtCanvas />} />

        <Route path="/details/:productId" element={<CapDetails />} />

        <Route path="/whatsappmail" element={<WhatsAppMail />} />
        <Route path="/search" element={<SearchProduct />} />
        <Route path="/bottlecanvas/:productId" element={<BottleCanvas />} />
        

        {/* Dynamic customization pages */}
        <Route path="/customize/Cap/:productId" element={<CapCanvas />} />
        <Route path="/customize/corporate-shirt/:productId" element={<CorporateCanvas />} />
        <Route path="/customize/T-Shirt/:productId" element={<TshirtCustomizer />} />
        <Route path="/customize/Bottle/:productId" element={<BottleCanvas />} />
        <Route path="/customize/notebook-diary/:productId" element={<NotebookDiaryCanvas />} />
        <Route path="/customize/bags/:productId" element={<BagCanvas />} />
        <Route path="/customize/totebags/:productId" element={<ToteBagCustomizer />} />
        <Route path="/addtext" element={<AddText />} />
      </Routes>
      <WhatsAppMail />
      <EnquiryForm />
      <Footer />

      {/* <TshirtCustomizer/> */}
    </Router>
  );
}

export default App;
