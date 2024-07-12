import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { product } from "@service";
import AutoDeleteSharpIcon from "@mui/icons-material/AutoDeleteSharp";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
import { toast } from "react-toastify";
import { ImgUpload } from "@modal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { media } from "@service";
import { useEffect } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ActionButton = styled("div")(({ theme }) => ({
  cursor: "pointer",
  margin: theme.spacing(0, 1),
  "&:hover": {
    opacity: 0.8,
  },
}));

const ActionContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const CustomizedTables = ({ data, setData }) => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [file, setFile] = useState(null);
  const [product_id, setProductId] = useState(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deleteItem = async (id) => {
    try {
      const response = await product.delete(id);
      if (response.status === 200) {
        toast.success("Product deleted successfully!");
        window.location.reload();
      } else {
        console.error("Delete request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const getData = async (product_id) => {
    try {
      const response = await media.get(product_id);
      if (response.status === 200 && response.data.images) {
        setImages(response.data.images);
        setSelectedImage(response.data.images[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (product_id) {
      getData(product_id);
    }
  }, [product_id]);

  const handleAddImg = async () => {
    if (!file || !product_id) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await media.upload(product_id, formData);
      if (response.status === 200 && response?.data?.image_url) {
        toast.success("Image uploaded successfully!");
        getData(productId);
        setImages((prevImages) => [...prevImages, response.data.image_url]);
        setFile(null);
        closeModal();
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Image upload failed.");
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const viewItem = (item) => {
    navigate(`/product/${item.product_id}`, { state: { product: item } });
  };

  return (
    <>
      <div style={{ position: "relative" }} className="mr-20">
        {/* <ImgUpload handleOpen={open} handleClose={handleClose} /> */}
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className="text-center">
              <TableRow>
                <StyledTableCell align="center">S/N</StyledTableCell>
                <StyledTableCell align="center">Product Name</StyledTableCell>
                <StyledTableCell align="center">Color</StyledTableCell>
                <StyledTableCell align="center">Size</StyledTableCell>
                <StyledTableCell align="center">Count</StyledTableCell>
                <StyledTableCell align="center">Cost</StyledTableCell>
                <StyledTableCell align="center" className="mr-10">
                  Action
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className="text-center">
              {paginatedData.map((item, index) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item?.product_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item?.color}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item?.size}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item?.count}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item?.cost}</StyledTableCell>

                  <StyledTableCell align="center">
                    <ActionContainer>
                      <ActionButton
                        onClick={() => deleteItem(item.product_id)}
                        className="text-red-700"
                      >
                        <AutoDeleteSharpIcon />
                      </ActionButton>
                      <ActionButton className="text-green-500">
                        <Link to={`product/${item.product_id}`}>
                          <RemoveRedEyeSharpIcon />
                        </Link>
                      </ActionButton>
                      <ActionButton>
                        <ImgUpload />
                      </ActionButton>
                    </ActionContainer>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        />
      </div>
    </>
  );
};

export default CustomizedTables;
