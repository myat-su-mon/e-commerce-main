import React from "react";
import { Flex, Input, Text } from "@mantine/core";

import { useDispatch } from "react-redux";
import { searchProduct } from "../redux/productSlice";
import { useDisclosure, useHover } from "@mantine/hooks";
import Cart from "../pages/Cart";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { hovered, ref } = useHover();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Flex gap={"md"} justify={"space-between"} align={"center"} mt={"md"}>
        <Flex gap={"lg"} align={"center"}>
          <Link to={"/"} style={{textDecoration: "none", color: "black"}}>
            <Text
              size={"lg"}
              fw={"bold"}
              lts={"lg"}
              style={{ cursor: "pointer" }}
            >
              TheLoke
            </Text>
          </Link>
          {/* <Text size={"sm"} style={{ cursor: "pointer" }}>
            Shop
          </Text>
          <Text size={"sm"} style={{ cursor: "pointer" }}>
            About
          </Text>
          <Text size={"sm"} style={{ cursor: "pointer" }}>
            Contact
          </Text> */}
        </Flex>
        <Flex gap={"md"} justify={"center"} align={"center"}>
          <Input
            placeholder="Search Product"
            onChange={(e) => dispatch(searchProduct(e.target.value))}
            radius={"lg"}
          />
          <Cart />
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
