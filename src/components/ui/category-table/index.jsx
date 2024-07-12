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
import Checkbox from "@mui/material/Checkbox";
import { category } from "@service";
import { CategoryModal } from "@modal";
import editImg from "./../../../assets/edit.png";
import deleteImg from "./../../../assets/delete.png";
import { toast } from "react-toastify";

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

const ActionButton = styled("img")(({ theme }) => ({
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
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const deleteItem = async (id) => {
    try {
      const response = await category.delete(id);
      if (response.status === 200) {
        toast.success("Category deleted successfully!");
        window.location.reload();
      } else {
        console.error("Delete request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div style={{ position: "relative" }} className="mr-24">
        <CategoryModal
          item={edit}
          open={open}
          handleClose={() => setOpen(false)}
          setData={setData}
        />

        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className="text-center">
              <TableRow>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center">S/N</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center" className="mr-10">
                  Action
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className="text-center">
              {paginatedData.map((item, index) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="center">
                    <Checkbox className="w-10" style={{ margin: "0 auto" }} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item?.category_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <ActionContainer>
                      <ActionButton
                        src={editImg}
                        alt="Edit"
                        onClick={() => editItem(item)}
                        className="w-6"
                      />
                      <ActionButton
                        src={deleteImg}
                        alt="Delete"
                        onClick={() => deleteItem(item.category_id)}
                        className="w-6"
                      />
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
