import React, { useState } from "react";
import { Card, Image, Text, Badge, Button, Rating } from "@mantine/core";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import Swal from "sweetalert2";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/productSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);
  const handleDelete = async (id) => {
    const docRef = doc(db, "products", id);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          await deleteDoc(docRef);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });

    // const data = await deleteDoc(docRef);
    // console.log(data);
  };

  return (
    <Card w={"18rem"} pos={"relative"} withBorder>
      <Card.Section>
        <Link to={`/details/${product?.id}`}>
          <Image src={product?.image} height={180} fit="cover" />
        </Link>
      </Card.Section>
      <Badge
        variant="gradient"
        gradient={{ from: "cyan", to: "teal" }}
        pos={"absolute"}
        top={10}
        right={5}
      >
        {product?.category}
      </Badge>

      <Text my={"sm"} truncate lts={"2px"}>
        {product?.title}
      </Text>
      <Text my={"sm"} size={"xs"} truncate lts={"2px"} color="gray">
        {product?.description}
      </Text>
      <Rating my={"sm"} value={product?.rating} readOnly fractions={2} />
      {cart?.find((item) => item?.id === product?.id) ? (
        <Button
          variant="gradient"
          gradient={{ from: "yellow", to: "red" }}
          w={"100%"}
          onClick={() => dispatch(removeFromCart(product?.id))}
        >
          <RiDeleteBinLine style={{ fontSize: "20px" }} />
        </Button>
      ) : (
        <Button
          variant="gradient"
          gradient={{ from: "cyan", to: "teal" }}
          w={"100%"}
          onClick={() => dispatch(addToCart(product))}
        >
          <AiOutlineShoppingCart style={{ fontSize: "20px" }} />
        </Button>
      )}
    </Card>
  );
};

export default ProductCard;
