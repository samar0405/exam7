import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ProductModal } from "@modal";
import { ProductTable } from "@ui";
import { product } from "@service";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getData = async () => {
    try {
      const response = await product.get();
      if (
        (response.status === 200 || response.status === 201) &&
        response?.data?.products
      ) {
        setData(response?.data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ProductModal open={open} handleClose={handleClose} />
      <div className="flex flex-col mt-16">
        <div className="flex justify-end mr-20">
          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            style={{ display: "block", marginBottom: "20px" }}
            className="p-10"
          >
            To Add
          </Button>
        </div>
        <ProductTable data={data} />
      </div>
    </>
  );
};

export default Index;
