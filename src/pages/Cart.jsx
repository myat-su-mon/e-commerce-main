import React from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  Button,
  Group,
  Box,
  Text,
  Flex,
  Paper,
  Badge,
} from "@mantine/core";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { emptyCart } from "../redux/productSlice";
import CartVideo from "../assets/cart_video.mp4";
import { useNavigate } from "react-router-dom";
import { CgShoppingBag } from "react-icons/cg";

const Cart = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);
  console.log(cart);
  const total = cart?.reduce(
    (prev, current) => prev + current.price * current.qty,
    0
  );
  return (
    <Box>
      <Drawer
        opened={opened}
        onClose={close}
        title="Shopping Cart"
        position={"right"}
      >
        <Flex justify={"space-between"} h="85vh" direction={"column"}>
          {cart.length ? (
            <Box>
              {cart?.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </Box>
          ) : (
            <video src={CartVideo} autoPlay loop height={"300px"}></video>
          )}
          <Flex direction={"column"} gap={"sm"} py={"lg"}>
            <Text align="center" size={"xl"} fw={"bold"} color="cyan">
              Total Price - {total}
            </Text>
            <Flex gap={"sm"} wrap={"wrap"} justify={"center"}>
              <Button
                disabled={!cart.length && true}
                // w="100%"
                onClick={() => dispatch(emptyCart())}
              >
                Empty Cart
              </Button>
              <Button
                disabled={!cart.length && true}
                color="yellow"
                // w="100%"
                onClick={() => {
                  dispatch(emptyCart());
                  navigate("/success");
                }}
              >
                Order Now
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Drawer>

      <Group position="center" pos="relative" onClick={open} style={{cursor: "pointer"}}>
        <CgShoppingBag style={{ fontSize: "20px" }} />
        <Badge size="sm" color="cyan" pos="absolute" top={-8} right={-13}>
          {cart ? cart.length : 0}
        </Badge>
      </Group>
    </Box>
  );
};

export default Cart;
