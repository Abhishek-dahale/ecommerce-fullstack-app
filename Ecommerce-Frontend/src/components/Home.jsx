import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png"

// Category-level fallback (used only if no specific match is found below)
const categoryImageFallback = {
  Laptop: "https://loremflickr.com/400/300/laptop",
  Headphone: "https://loremflickr.com/400/300/headphones",
  Mobile: "https://loremflickr.com/400/300/smartphone",
  Electronics: "https://loremflickr.com/400/300/electronics",
  Toys: "https://loremflickr.com/400/300/toys",
  Fashion: "https://loremflickr.com/400/300/fashion",
};

// Product-specific keyword matches for more accurate placeholder photos
const productImageFallback = {
  // Laptop
  "thinkpad x1 carbon": "https://loremflickr.com/400/300/thinkpad,laptop",
  "macbook air m2": "https://loremflickr.com/400/300/macbook,laptop",
  "rog strix g15": "https://loremflickr.com/400/300/gaminglaptop",
  "inspiron 15": "https://loremflickr.com/400/300/dell,laptop",
  "pavilion 14": "https://loremflickr.com/400/300/hp,laptop",
  "galaxy book3": "https://loremflickr.com/400/300/samsung,laptop",
  "legion 5 pro": "https://loremflickr.com/400/300/gaminglaptop",
  "zenbook 14 oled": "https://loremflickr.com/400/300/asus,laptop",
  "surface laptop 5": "https://loremflickr.com/400/300/microsoft,laptop",
  "victus 16": "https://loremflickr.com/400/300/laptop",

  // Headphone
  "wh-1000xm5": "https://loremflickr.com/400/300/sonyheadphones",
  "airpods max": "https://loremflickr.com/400/300/airpods,headphones",
  "quietcomfort 45": "https://loremflickr.com/400/300/boseheadphones",
  "momentum 4": "https://loremflickr.com/400/300/headphones",
  "studio3 wireless": "https://loremflickr.com/400/300/beatsheadphones",
  "elite 85h": "https://loremflickr.com/400/300/headphones",
  "boat rockerz 550": "https://loremflickr.com/400/300/headphones",
  "cloud alpha": "https://loremflickr.com/400/300/gamingheadset",
  "freebuds studio": "https://loremflickr.com/400/300/headphones",
  "backbeat go 810": "https://loremflickr.com/400/300/earphones",

  // Mobile
  "iphone 15": "https://loremflickr.com/400/300/iphone",
  "galaxy s24": "https://loremflickr.com/400/300/samsungphone",
  "oneplus 12": "https://loremflickr.com/400/300/smartphone",
  "pixel 8": "https://loremflickr.com/400/300/googlepixel",
  "redmi note 13 pro": "https://loremflickr.com/400/300/xiaomiphone",
  "nothing phone 2": "https://loremflickr.com/400/300/smartphone",
  "iqoo 12": "https://loremflickr.com/400/300/smartphone",
  "moto edge 40": "https://loremflickr.com/400/300/smartphone",
  "realme 12 pro": "https://loremflickr.com/400/300/smartphone",
  "vivo v29": "https://loremflickr.com/400/300/smartphone",

  // Electronics
  "mi smart band 8": "https://loremflickr.com/400/300/fitnesstracker",
  "echo dot 5th gen": "https://loremflickr.com/400/300/smartspeaker",
  "mi power bank 20000mah": "https://loremflickr.com/400/300/powerbank",
  "apple watch se": "https://loremflickr.com/400/300/applewatch",
  "fire tv stick 4k": "https://loremflickr.com/400/300/streamingdevice",
  "google nest mini": "https://loremflickr.com/400/300/smartspeaker",
  "canon eos r50": "https://loremflickr.com/400/300/camera",
  "jbl flip 6": "https://loremflickr.com/400/300/bluetoothspeaker",
  "philips air fryer": "https://loremflickr.com/400/300/airfryer",
  "tp-link wifi router": "https://loremflickr.com/400/300/router",

  // Toys
  "lego classic bricks set": "https://loremflickr.com/400/300/legobricks",
  "hot wheels 5-car pack": "https://loremflickr.com/400/300/toycar",
  "barbie dreamhouse": "https://loremflickr.com/400/300/dollhouse",
  "nerf elite blaster": "https://loremflickr.com/400/300/nerfgun",
  "rubik's cube": "https://loremflickr.com/400/300/rubikscube",
  "remote control car": "https://loremflickr.com/400/300/rccar",
  "monopoly board game": "https://loremflickr.com/400/300/boardgame",
  "play-doh fun factory": "https://loremflickr.com/400/300/playdoh",
  "action figure set": "https://loremflickr.com/400/300/actionfigure",
  "puzzle 1000 pieces": "https://loremflickr.com/400/300/jigsawpuzzle",

  // Fashion
  "puma running shoes": "https://loremflickr.com/400/300/runningshoes",
  "levi's 511 jeans": "https://loremflickr.com/400/300/jeans",
  "nike air max": "https://loremflickr.com/400/300/sneakers",
  "ray-ban aviator": "https://loremflickr.com/400/300/sunglasses",
  "fastrack analog watch": "https://loremflickr.com/400/300/wristwatch",
  "adidas track jacket": "https://loremflickr.com/400/300/trackjacket",
  "woodland boots": "https://loremflickr.com/400/300/boots",
  "titan leather wallet": "https://loremflickr.com/400/300/leatherwallet",
  "van heusen formal shirt": "https://loremflickr.com/400/300/formalshirt",
  "skybags backpack": "https://loremflickr.com/400/300/backpack",
};

const getFallbackImage = (name, category) => {
  const key = name?.trim().toLowerCase();
  return productImageFallback[key] || categoryImageFallback[category] || unplugged;
};

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await API.get(
                `/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              // no uploaded photo for this product - show a matching product photo
              return { ...product, imageUrl: getFallbackImage(product.name, product.category) };
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        <img src={unplugged} alt="Error" style={{ width: "100px", height: "100px" }} />
      </h2>
    );
  }

  return (
    <>
      <div className="grid">
        {filteredProducts.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Products Available
          </h2>
        ) : (
          filteredProducts.map((product) => {
            const { id, brand, name, price, productAvailable, imageUrl } =
              product;
            return (
              <div
                className="card mb-3"
                style={{
                  opacity: productAvailable ? 1 : 0.6,
                }}
                key={id}
              >
                <Link
                  to={`/product/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img src={imageUrl} alt={name} />
                  <div className="card-body">
                    <div>
                      <h5 className="card-title">{name.toUpperCase()}</h5>
                      <i className="card-brand">{"~ " + brand}</i>
                    </div>
                    <hr className="hr-line" />
                    <div className="home-cart-price">
                      <h5 className="card-text">
                        <i className="bi bi-currency-rupee"></i>
                        {price}
                      </h5>
                    </div>
                    <button
                      className="btn-hover color-9"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      disabled={!productAvailable}
                    >
                      {productAvailable ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;