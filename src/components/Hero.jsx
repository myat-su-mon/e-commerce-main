import React from "react";
import { Grid, SimpleGrid, Box, Paper, Image, Flex } from "@mantine/core";
import Test from "../assets/cart_video.mp4";

const Hero = () => {
  return (
    <SimpleGrid cols={2} my={"lg"}>
      <Paper h={"320px"} shadow="lg" radius={"xl"}>
        <video src={Test} height={"100%"} width={"100%"} autoPlay loop></video>
      </Paper>
      <Grid>
        <Grid.Col>
          <Paper radius={"xl"} shadow="lg" h={"150px"}>
            <Image
              src={
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
              }
              width={"100%"}
              height={"150px"}
              radius={"lg"}
              fit="cover"
            />
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper radius={"xl"} shadow="lg" h={"150px"}>
            <Image
              src={
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
              }
              width={"100%"}
              height={"150px"}
              radius={"lg"}
              fit="cover"
            />
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper radius={"xl"} shadow="lg" h={"150px"}>
            <Image
              src={
                "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
              }
              width={"100%"}
              height={"150px"}
              radius={"lg"}
              fit="cover"
            />
          </Paper>
        </Grid.Col>
      </Grid>
    </SimpleGrid>
  );
};

export default Hero;
