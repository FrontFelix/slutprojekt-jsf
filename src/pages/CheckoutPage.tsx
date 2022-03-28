import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { CSSProperties, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/context/CartContext";
import { useProducts } from "../components/context/ProductContext";
import { NftItem } from "../data/collections/collection";

function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const { collections } = useProducts();

  return (
    <div>
      <div style={rootStyle}>
        <div style={purchaseCompleteContainer}>
          <h2>Checkout</h2>
          <h2>Your purchase:</h2>
          <div style={cardContainer}>
            <div style={purchasedItems}>
              {cart.map((item: NftItem, index: number) => (
                <div style={purchasedItemTestCard} key={index}>
                  <div style={cardHeader}>
                    <h3>
                      {" "}
                      {
                        collections.find((col) => col.id === item.collectionID)
                          ?.name
                      }
                      # {item.NFTid}
                    </h3>
                  </div>
                  <img alt="test" style={checkoutPic} srcSet={item.image} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "90%",
                    }}
                  >
                    <p style={itemDesc}>{item.description}</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <p style={{ marginRight: ".1rem" }}>
                        Price: {item.price}
                      </p>
                      <FontAwesomeIcon
                        icon={faCoins}
                        style={{ marginTop: "1.1rem" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <h2 style={{ marginRight: ".1rem" }}>Total price: {totalPrice}</h2>
            <FontAwesomeIcon icon={faCoins} style={{ marginTop: "1.8rem" }} />
          </div>
          <Link style={nextButton} to="/CheckoutDetails">
            <Button style={buttonStyle} variant="contained" href="">
              Next
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

const rootStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  width: "100%",
  // border: "2px solid #88D9E6",
};

const purchaseCompleteContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "80%",
  background: "#202225",
  boxShadow: "2px 5px 12px black",
  marginBottom: "2rem",
};

// const purchasedProducts: CSSProperties = {};

const purchasedItems: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  width: "90%",
  height: "30%",
  gap: "1rem",
  margin: 0,
  flexWrap: "wrap",
};

const purchasedItemTestCard: CSSProperties = {
  minWidth: "15rem",
  maxWidth: "15rem",
  flexWrap: "wrap",
  boxShadow: "2px 4px 12px #0049A9",
  borderRadius: "2rem",
  display: "flex",
  justifyContent: "center",
};

const checkoutPic: CSSProperties = {
  maxWidth: "10rem",
  maxHeight: "10rem",
  borderRadius: ".2rem",
};

const cardContainer: CSSProperties = {
  width: "90%",
  borderRadius: ".5rem",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "1rem",
};

const cardHeader: CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

const itemDesc: CSSProperties = {
  textAlign: "center",
  marginTop: ".5rem",
  marginBottom: "0",
};

const buttonStyle: CSSProperties = {
  fontWeight: "bold",
  background: "#2081e2",
  fontSize: "1.5rem",
};

const nextButton: CSSProperties = {
  textDecoration: "none",
  margin: "2rem",
};
