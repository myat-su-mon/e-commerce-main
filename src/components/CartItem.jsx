import { Flex, Text, Button, Group, Paper, Image, CloseButton } from '@mantine/core'
import React from 'react'
import { useDispatch } from 'react-redux';
import { decreaseQty, increaseQty, removeFromCart } from '../redux/productSlice';

const CartItem = ({item}) => { 
    const dispatch = useDispatch();

  return (
    <Paper shadow="lg" p={"md"} pos={"relative"}>
      <Flex justify={"space-around"}>
        <Image
          src={item.image}
          width={"100px"}
          height={"100px"}
          fit="cover"
          radius={"sm"}
          alt=""
        />
        <Flex direction={"column"} gap={"sm"}>
          <Text>{item.title}</Text>
          <Text>$ {item.price * item.qty}</Text>
          <Button.Group>
            <Button
              variant="subtle"
              color="dark"
              onClick={() => dispatch(decreaseQty(item.id))}
            >
              -
            </Button>
            <Button variant="subtle" color="dark">
              {item.qty}
            </Button>
            <Button
              variant="subtle"
              color="dark"
              onClick={() => dispatch(increaseQty(item.id))}
            >
              +
            </Button>
          </Button.Group>
        </Flex>
      </Flex>
      <CloseButton
        pos={"absolute"}
        top={5}
        right={5}
        color="dark"
        onClick={() => dispatch(removeFromCart(item.id))}
      />
    </Paper>
  );
}

export default CartItem