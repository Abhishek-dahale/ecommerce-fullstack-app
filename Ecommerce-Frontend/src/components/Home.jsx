import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png"

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
              // fall back to a real bundled image instead of a fake string path
              return { ...product, imageUrl: unplugged };
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