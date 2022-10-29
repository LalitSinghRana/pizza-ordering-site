import React, { useState, useEffect } from "react";
import { ProductPreviewCard } from "./ProductPreviewCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/cart/cartSlice";
import { ALL_PRODUCTS, CUSTOM_PRODUCT_ID } from "../constants/constants";

export const ProductsPreview = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    fetch(ALL_PRODUCTS)
      .then((response) => response.json())
      .then((data) => {
        let arr = data?.data.filter((x) => x._id !== CUSTOM_PRODUCT_ID);
        setProducts(arr);
      })
      .catch((e) => console.log(e));
  }, []);

  const onAddProduct = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div id="pizza-carousle" className="container text-white bg-black">
      <Carousel responsive={responsive}>
        {products.length > 0 &&
          products.map((product, index) => {
            return (
              <div className="w-full p-3" key={product._id}>
                <ProductPreviewCard
                  key={product._id}
                  product={product}
                  onAddProduct={onAddProduct}
                />
              </div>
            );
          })}
      </Carousel>
    </div>
  );
};
