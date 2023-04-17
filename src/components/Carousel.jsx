import { Badge, Box, Button, Flex, Image, Paper, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/productSlice";
import { Link } from "react-router-dom";

const Carousel = () => {
  const docRef = doc(db, "products", "PJmwqZWrn1upvmbxHL8X");
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);

  const fetchProduct = async () => {
    const data = await getDoc(docRef);
    setProduct(data.data());
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <Paper p={"xl"} shadow="xl" my={"xl"} radius={"xl"}>
      <Flex w={"100%"} my={"xl"} justify={"space-around"} gap={"xl"}>
        <Flex
          justify={"center"}
          align={"center"}
          direction={"column"}
          // w={"100%"}
        >
          <Badge
            variant="gradient"
            gradient={{ from: "cyan", to: "teal" }}
            mr={"auto"}
          >
            {product?.category}
          </Badge>
          <Text size={"50px"} lts={"4px"} italic color="gray">
            {product?.title}
          </Text>
          <Flex mt={"xl"} gap={"xl"}>
            {cart?.find((item) => item?.id === product?.id) ? (
              <Button
                w="150px"
                variant="gradient"
                gradient={{ from: "yellow", to: "red" }}
                onClick={() => dispatch(removeFromCart(product?.id))}
              >
                Remove From Cart
              </Button>
            ) : (
              <Button
                w="150px"
                variant="gradient"
                gradient={{ from: "cyan", to: "teal" }}
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </Button>
            )}

            <Link to="/success">
              <Button w="150px" variant="outline" color="gray">
                Buy Now
              </Button>
            </Link>
          </Flex>
        </Flex>
        <Image
          src={product?.image}
          width={"300px"}
          height={"300px"}
          radius={"xl"}
        />
      </Flex>
    </Paper>
  );
};

export default Carousel;
