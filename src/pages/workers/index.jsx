import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { WorkerModal } from "@modal";
import { WorkerTable } from "@ui";
import { worker } from "@service";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getData = async () => {
    try {
      const response = await worker.get();
      if (
        (response.status === 200 || response.status === 201) &&
        response?.data?.user
      ) {
        setData(response?.data?.user);
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
      <WorkerModal open={open} handleClose={handleClose} />
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
        <WorkerTable data={data} />
      </div>
    </>
  );
};

export default Index;
