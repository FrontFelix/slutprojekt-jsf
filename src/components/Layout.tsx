import { CSSProperties, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckoutPage from "../pages/CheckoutPage";
import CheckoutPageDetails from "../pages/CheckoutPageDetails";
import CollectionPage from "../pages/CollectionPage";
import Collections from "../pages/Collections";
import StartPage from "../pages/Startpage";
import CartModal from "./CartModal";
import Header from "./Header";
import { DeliveryDataInfoObject } from "../data/collections/deliveryData";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import AdminPage from "../pages/AdminPage";
import PurchaseComplete from "../pages/PurchaseComplete";
import PaymentPage from "../pages/PaymentPage";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";

function Layout() {
  const [modalState, setModalState] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(DeliveryDataInfoObject);
  const [finalTotalSum, setFinalTotalSum] = useState<number>(1);
  return (
    <div>
      <CartProvider>
        <ProductProvider>
          <BrowserRouter>
            <Header
              modalState={modalState}
              setModalState={setModalState}
              searchBarFocused={searchFocused}
              searchBarFocusOut={() => setSearchFocused(false)}
            />
            <CartModal modalState={modalState} setModalState={setModalState} />
            <div style={rootStyle}>
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/CollectionPage" element={<CollectionPage />} />
                <Route path="/Collections/:id" element={<Collections />} />
                <Route
                  path="/"
                  element={
                    <StartPage focusHeader={() => setSearchFocused(true)} />
                  }
                />
                <Route path="/Checkout" element={<CheckoutPage />} />
                <Route
                  path="/CheckoutDetails"
                  element={
                    <CheckoutPageDetails
                      deliveryInfo={deliveryInfo}
                      setDeliveryInfo={setDeliveryInfo}
                    />
                  }
                />
                <Route
                  path="/PaymentPage"
                  element={
                    <PaymentPage
                      deliveryInfo={deliveryInfo}
                      setDeliveryInfo={setDeliveryInfo}
                      finalTotalSum={finalTotalSum}
                      setFinalTotalSum={setFinalTotalSum}
                    />
                  }
                />

                <Route
                  path="/PurchaseComplete"
                  element={
                    <PurchaseComplete
                      deliveryInfo={deliveryInfo}
                      finalTotalSum={finalTotalSum}
                    />
                  }
                />
              </Routes>
              <Footer/>
            </div>
            <ToastContainer />
          </BrowserRouter>
        </ProductProvider>
      </CartProvider>
    </div>
  );
}

const rootStyle: CSSProperties = {
  maxWidth: "1250px",
  display: "block",
  margin: "0 auto",
  marginTop: "2rem",
  color: "white",
};

export default Layout;
