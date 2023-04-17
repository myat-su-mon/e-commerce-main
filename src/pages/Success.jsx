import { Button, Flex, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import SuccessVideo from "../assets/success.mp4";
import Layout from "./Layout";

const Success = () => {
  return (
    <Layout>
      <Flex
        justify={"center"}
        align={"center"}
        direction={"column"}
        my={"xl"}
        gap={"md"}
      >
        <Text size={"40px"} italic fw={"bold"} lts={"3px"} color="cyan">
          Order Successed!
        </Text>
        <video
          src={SuccessVideo}
          autoPlay
          loop
          width={"300px"}
          height={"300px"}
        />
        <Link to="/">
          <Button variant="outline" color="cyan" w={"200px"}>
            Go to Shop
          </Button>
        </Link>
      </Flex>
    </Layout>
  );
};

export default Success;
