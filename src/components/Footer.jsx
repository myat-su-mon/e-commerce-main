import { Flex, Text } from "@mantine/core";
import React from "react";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const date = new Date();
  let year = date.getFullYear();
  return (
    <Flex
      my={"xl"}
      justify={"center"}
      direction={"column"}
      align={"center"}
      gap={"md"}
    >
      <Text lts={"3px"} size={"xs"}>
        Copyright © {year} - All right reserved by MaSu
      </Text>
      <Flex gap={"md"} align={"center"}>
        <FiFacebook />
        <FaInstagram />
      </Flex>
    </Flex>
  );
};

export default Footer;
