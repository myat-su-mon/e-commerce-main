// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase/config";
// import {
//   createStyles,
//   Image,
//   Container,
//   Title,
//   Button,
//   Group,
//   Text,
//   List,
//   ThemeIcon,
//   rem,
//   Rating,
// } from "@mantine/core";
// import { AiOutlineCheckCircle } from "react-icons/ai";
// import { useDispatch } from "react-redux";
// import { addToCart, removeFromCart } from "../redux/productSlice";

// const useStyles = createStyles((theme) => ({
//   inner: {
//     display: "flex",
//     justifyContent: "space-between",
//     paddingTop: `calc(${theme.spacing.xl} * 4)`,
//     paddingBottom: `calc(${theme.spacing.xl} * 4)`,
//   },

//   content: {
//     maxWidth: rem(480),
//     marginRight: `calc(${theme.spacing.xl} * 3)`,

//     [theme.fn.smallerThan("md")]: {
//       maxWidth: "100%",
//       marginRight: 0,
//     },
//   },

//   title: {
//     color: theme.colorScheme === "dark" ? theme.white : theme.black,
//     fontFamily: `Greycliff CF, ${theme.fontFamily}`,
//     fontSize: rem(44),
//     lineHeight: 1.2,
//     fontWeight: 900,

//     [theme.fn.smallerThan("xs")]: {
//       fontSize: rem(28),
//     },
//   },

//   control: {
//     [theme.fn.smallerThan("xs")]: {
//       flex: 1,
//     },
//   },

//   image: {
//     flex: 1,

//     [theme.fn.smallerThan("md")]: {
//       display: "none",
//     },
//   },

//   highlight: {
//     position: "relative",
//     backgroundColor: theme.fn.variant({
//       variant: "light",
//       color: theme.primaryColor,
//     }).background,
//     borderRadius: theme.radius.sm,
//     padding: `${rem(4)} ${rem(12)}`,
//   },
// }));

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState({});

//   const docRef = doc(db, "products", id);

//   const fetchProduct = async () => {
//     const data = await getDoc(docRef);
//     setProduct(data.data());
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   const { classes } = useStyles();
//   const dispatch = useDispatch();
//   return (
//     <div>
//       <Container>
//         <div className={classes.inner}>
//           <div className={classes.content}>
//             <Title className={classes.title}>{product?.title}</Title>
//             <Text color="dimmed" mt="md">
//               {product?.description}
//             </Text>
//             <List
//               mt={30}
//               spacing="sm"
//               size="sm"
//               icon={
//                 <ThemeIcon size={20} radius="lg">
//                   <AiOutlineCheckCircle />
//                 </ThemeIcon>
//               }
//             >
//               <List.Item>
//                 <b>Category</b> - {product?.category}
//               </List.Item>
//               <List.Item>
//                 <b>Price</b> - $ {product?.price}
//               </List.Item>
//               <List.Item>
//                 <Group position="left">
//                   <Rating value={product?.rating} fractions={5} readOnly />
//                 </Group>
//               </List.Item>
//             </List>

//             <Group mt={30}>
//               <Link to="">
//                 <Button radius="xl" size="md" className={classes.control}>
//                   Buy Now
//                 </Button>
//               </Link>
//               <Link to="/">
//                 <Button
//                   variant="default"
//                   radius="xl"
//                   size="md"
//                   className={classes.control}
//                 >
//                   Shop
//                 </Button>
//               </Link>
//             </Group>
//           </div>
//           <Image
//             src={product?.image}
//             className={classes.image}
//             width={"300px"}
//           />
//           <Button onClick={() => dispatch(addToCart(product))}>
//             Add to cart
//           </Button>
//           <Button onClick={() => dispatch(removeFromCart(product?.id))}>
//             Remove from cart
//           </Button>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default ProductDetails;

import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase/config";
import Layout from "./Layout";
import { Box, Button, Flex, Image, Paper, Rating, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/productSlice";
import Loader from "../components/Loader/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);

  const docRef = doc(db, "products", id);

  const fetchProduct = async () => {
    setIsLoading(true);
    const data = await getDoc(docRef);
    if (data) setIsLoading(false);
    setProduct(data.data());
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Layout>
          <Flex my={"xl"} gap={"xl"} wrap={"wrap"}>
            <Paper radius={"lg"} shadow="xl">
              <Image
                src={product?.image}
                width={"400px"}
                height={"400px"}
                fit="cover"
                radius={"lg"}
              />
            </Paper>
            <Flex direction={"column"} gap={"xl"}>
              <Text size={"40px"} lts={"5px"} italic>
                {product?.title}
              </Text>
              <Flex align={"center"} gap={"md"}>
                <Rating readOnly fractions={2} value={product?.rating} />
                <Text color="gray" size={"sm"}>
                  ({product?.rating})
                </Text>
              </Flex>
              <Box>
                <Text fw={"bold"}>Description</Text>
                <Text color="gray" lts={"3px"} size={"sm"}>
                  {product?.description}
                </Text>
              </Box>
              <Flex gap={"xl"}>
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
                  <Button w="150px" variant="outline" color="dark">
                    Buy Now
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Layout>
      )}
    </>
  );
};

export default ProductDetails;
