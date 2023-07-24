import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ModalComponent from "../../ModalComponent";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsProcess, getProductDetailProcess } from "@/src/api";

const columns = [
  { id: "productCode", label: "Ürün Kodu", minWidth: 100 },
  { id: "productName", label: "Ürün İsmi", minWidth: 170 },
  {
    id: "productQuantity",
    label: "Adet",
    minWidth: 170,
    
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "_id" },
  // Diğer sütunlar...
];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

const Stok = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const { data: AllProductData } = useSelector((state) => state.getAllProducts);
  const { data: ProductDetail } = useSelector(
    (state) => state.getProductDetail
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getAllProductsProcess());
  }, []);

  console.log(AllProductData, "AllProductData");
  console.log(ProductDetail?.product, "ProductDetails");

  const handleProductDetail = (_id) => {
    console.log("Clicked row ID:SDFKHJSDFLKHDSFLKHFDSALJASDFLHK", _id);
    dispatch(getProductDetailProcess({ _id }));
    setOpen(true); // Move this line to the function to open the modal
  };

  return (
    <div className="h-full w-full bg-light rounded-lg pr-16 lg:pl-16 md:pl-8 pl-2  py-8 flex flex-col   ">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {AllProductData &&
                AllProductData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((AllProductData) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={AllProductData._id}
                      onClick={() => handleProductDetail(AllProductData._id)}
                    >
                      {columns.map((column) => {
                        const value = AllProductData[column.id];
                        console.log(value, "value");
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={AllProductData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        productName={ProductDetail?.productName}
      />
    </div>

    // <div className="h-full w-full bg-light rounded-lg pr-16 lg:pl-16 md:pl-8 pl-2  py-8 flex flex-col   ">
    //   <h2 className="font-bold text-2xl mb-6">Ürün Stoğu</h2>
    //   <Paper sx={{ width: "100%", overflow: "hidden" }}>
    //     {/* ...Tablo kısmını değiştirmeden bırakın... */}
    //     <TableBody>
    //       {data
    //         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //         .map((data) => {
    //           return (
    //             <TableRow
    //               hover
    //               role="checkbox"
    //               tabIndex={-1}
    //               key={data._id}
    //               onClick={() => setOpen(true)}
    //             >
    //               {columns.map((column) => {
    //                 const value = data[column.id];
    //                 return (
    //                   <TableCell key={column.id} align={column.align}>
    //                     {column.format && typeof value === "number"
    //                       ? column.format(value)
    //                       : value}
    //                   </TableCell>
    //                 );
    //               })}
    //             </TableRow>
    //           );
    //         })}
    //     </TableBody>
    //     {/* ...Diğer kısımları değiştirmeden bırakın... */}
    //   </Paper>
    //   <ModalComponent
    //     open={open}
    //     handleClose={handleClose}
    //     handleOpen={handleOpen}
    //   />
    // </div>
  );
};

export default Stok;
