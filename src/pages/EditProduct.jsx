import React from 'react'

const EditProduct = () => {
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Create New Product
      </Title>
      <form
        onSubmit={form.onSubmit(async (values) => {
          const collectionRef = collection(db, "products");
          const data = await addDoc(collectionRef, values);
          if (data) {
            navigate("/");
          }
        })}
      >
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            mt={"md"}
            label="Title"
            placeholder="Product Title"
            {...form.getInputProps("title")}
            required
          />
          <TextInput
            mt={"md"}
            label="Category"
            placeholder="Product Category"
            {...form.getInputProps("category")}
            required
          />
          <NumberInput
            hideControls
            mt={"md"}
            label="Price"
            placeholder="Product Price"
            {...form.getInputProps("price")}
            required
          />
          <TextInput
            mt={"md"}
            label="Description"
            placeholder="Product Description"
            {...form.getInputProps("description")}
            required
          />
          <NumberInput
            hideControls
            mt={"md"}
            label="Rating"
            placeholder="Product Rating"
            {...form.getInputProps("rating")}
            required
          />
          <TextInput
            mt={"md"}
            label="Image"
            placeholder="Product Image"
            {...form.getInputProps("image")}
            required
          />

          <Flex justify={"center"} align={"center"} mt={"md"} gap={"md"}>
            <Link to="/">
              <Button color="red">Back</Button>
            </Link>
            <Button type="submit">Create Product</Button>
          </Flex>
        </Paper>
      </form>
    </Container>
  );
}

export default EditProduct