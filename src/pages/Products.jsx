import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../redux/productSlice";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import ProductCard from "../components/ProductCard";
import { Box, Flex, Text } from "@mantine/core";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Layout from "./Layout";
import Carousel from "../components/Carousel";

const Products = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const products = useSelector((state) => state.products.products);
  const searchTerm = useSelector((state) => state.products.searchTerm);

  const collectionRef = collection(db, "products");

  const fetchProducts = () => {
    setIsLoading(true);
    onSnapshot(collectionRef, (docs) => {
      const data = [];
      docs.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      if (data) setIsLoading(false);
      dispatch(addProducts(data));
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Layout>
          <Carousel />
          <Hero />
          <Box mt={"xl"}>
            <Text size={"xl"} lts={"3px"} fw={"bold"} align="center">
              Products
            </Text>
            <Flex
              gap={"md"}
              my={"md"}
              wrap={"wrap"}
              justify={"center"}
              align={"center"}
            >
              {products
                ?.filter((product) => {
                  // if (searchTerm === "") {
                  //   return product;
                  // } else
                  if (
                    product?.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return product;
                  }
                })
                ?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </Flex>
          </Box>
        </Layout>
      )}
    </>
  );
};

export default Products;
