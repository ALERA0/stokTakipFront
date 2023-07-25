import React, { useEffect, useState } from "react";
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
import {
  addNewProductProcess,
  getAllProductsProcess,
  getProductDetailProcess,
} from "@/src/api";
import logo2 from "../../../../public/images/logo2.png";
import add from "../../../../public/images/add.png";

import Image from "next/image";
import { Button } from "@mui/material";
import AddingModal from "../../AddingModal/AddingModal";

const displayImage = (base64String) => {
  return (
    <img
      src={`data:image/jpeg;base64,${base64String}`}
      alt="Ürün Resmi"
      style={{ maxWidth: "80px", maxHeight: "100px" }}
    />
  );
};

const columns = [
  {
    id: "productImage",
    label: "",
    render: (item) => displayImage(item.productImage.data),
    minWidth: 300,
  },

  { id: "productCode", label: "Ürün Kodu", minWidth: 170 },
  {
    id: "productQuantity",
    label: "Adet",
    minWidth: 100,
  },
  {
    id: "productPrice",
    label: "Fiyat",
    minWidth: 110,
  },
  {
    id: "actions",
    label: "İşlemler",
    minWidth: 100,
  },

  // Diğer sütunlar...
];

const Stok = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [openAddingModal, setOpenAddingModal] = useState(false);

  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPackageType, setProductPackageType] = useState("");
  const [productBarcode, setProductBarcode] = useState("");
  const [productAddress, setProductAddress] = useState("");
  const [productDescription, setProductDescription] = useState("");

  // Yeni ürün bilgilerini state'lerle güncellemek için handleChange fonksiyonları
  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handleProductCodeChange = (e) => setProductCode(e.target.value);
  const handleProductImageChange = (e) => setProductImage(e.target.value);
  const handleProductQuantityChange = (e) => setProductQuantity(e.target.value);
  const handleProductPriceChange = (e) => setProductPrice(e.target.value);
  const handleProductPackageTypeChange = (e) =>
    setProductPackageType(e.target.value);
  const handleProductBarcodeChange = (e) => setProductBarcode(e.target.value);
  const handleProductAddressChange = (e) => setProductAddress(e.target.value);
  const handleProductDescriptionChange = (e) =>
    setProductDescription(e.target.value);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAddingModalOpen = () => setOpenAddingModal(true);
  const handleAddingModalClose = () => setOpenAddingModal(false);
  const dispatch = useDispatch();

  const { data: AllProductData } = useSelector((state) => state.getAllProducts);
  const { data: ProductDetail } = useSelector(
    (state) => state.getProductDetail
  );
  const { data: AddNewProduct } = useSelector((state) => state.addNewProduct);

  const addNewProduct = () => {
    dispatch(
      addNewProductProcess({
        productCode: productCode,
        productName: productName,
        productPrice: productPrice,
        productQuantity: productQuantity,
        productImage: productImage,
        productDescription: productDescription,
        productPackageType: productPackageType,
        productBarcode: productBarcode,
        productAddress: productAddress,
      })
    );
    dispatch(getAllProductsProcess());
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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

  const handleProductDetail = (_id) => {
    dispatch(getProductDetailProcess({ _id }));
    setOpen(true); // Move this line to the function to open the modal
  };

  return (
    <div className="h-full w-full bg-light rounded-lg pr-24 lg:pl-16 md:pl-8 pl-2 py-8 flex flex-col   ">
      <div className="w-full flex justify-between items-center mb-6 ">
        <h2 className="lg:text-2xl md:text-xl text-lg font-bold  flex justify-center">
          Ürün Stoğu
        </h2>
        <Button
          className="flex lg:gap-3 md:gap-2 gap-1 hover:bg-blue-900 hover:text-white duration-500"
          onClick={handleAddingModalOpen}
        >
          <h2 className="lg:text-xl md:text-lg text-xs">Yeni Ürün Oluştur</h2>
          <Image
            src={add}
            alt="Ürün Ekle"
            className="cursor-pointer"
            onClick={handleOpen}
            width={30}
          />
        </Button>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, font: "bold" }}
                    className="text-xl font-bold"
                  >
                    {column.id === "productImage" ? "Ürün İsmi" : column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {AllProductData &&
                AllProductData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((productData) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={productData._id}
                      onClick={() => handleProductDetail(productData._id)}
                      className="cursor-pointer"
                    >
                      {columns.map((column) => {
                        const value = productData[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "productImage" ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {productData.productImage.data ? (
                                  <div
                                    style={{
                                      maxWidth: "80px",
                                      maxHeight: "100px",
                                    }}
                                  >
                                    {column.render(productData)}
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      maxWidth: "80px",
                                      maxHeight: "100px",
                                    }}
                                  >
                                    <Image
                                      src={logo2}
                                      alt="Logo"
                                      layout="responsive"
                                      width={80}
                                      height={100}
                                      objectFit="contain"
                                      className="min-h-[40px]"
                                    />
                                  </div>
                                )}
                                <span style={{ marginLeft: "10px" }}>
                                  {productData.productName}
                                </span>
                              </div>
                            ) : column.id === "actions" ? (
                              <div className="flex justify-start items-center ">
                                <Button
                                  variant="outlined"
                                  onClick={() => handleEdit(productData._id)}
                                  className="md:mr-2 bg-blue-500 hover:bg-blue-800 text-white"
                                >
                                  Düzenle
                                </Button>
                                <Button
                                  variant="outlined"
                                  onClick={() => handleDelete(productData._id)}
                                >
                                  Sil
                                </Button>
                              </div>
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
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
          count={AllProductData?.length}
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
        productPrice={ProductDetail?.productPrice}
        productQuantity={ProductDetail?.productQuantity}
        productImage={ProductDetail?.productImage.data}
        productDescription={ProductDetail?.productDescription}
        productCode={ProductDetail?.productCode}
        productAddress={ProductDetail?.productAddress}
        productPackageType={ProductDetail?.productPackageType}
        productBarcode={ProductDetail?.productBarcode}
      />
      <AddingModal
        openAddingModal={openAddingModal}
        handleCloseAddingModal={handleAddingModalClose}
        addNewProduct={addNewProduct}
        onFinishFailed={onFinishFailed}
        productName={productName}
        productCode={productCode}
        productImage={productImage}
        productQuantity={productQuantity}
        productPrice={productPrice}
        productPackageType={productPackageType}
        productBarcode={productBarcode}
        productAddress={productAddress}
        productDescription={productDescription}
        handleProductNameChange={handleProductNameChange}
        handleProductCodeChange={handleProductCodeChange}
        handleProductImageChange={handleProductImageChange}
        handleProductQuantityChange={handleProductQuantityChange}
        handleProductPriceChange={handleProductPriceChange}
        handleProductPackageTypeChange={handleProductPackageTypeChange}
        handleProductBarcodeChange={handleProductBarcodeChange}
        handleProductAddressChange={handleProductAddressChange}
        handleProductDescriptionChange={handleProductDescriptionChange}
      />
    </div>
  );
};

export default Stok;
