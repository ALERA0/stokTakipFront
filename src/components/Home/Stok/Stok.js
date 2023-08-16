import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ModalComponent from "./ModalComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewProductProcess,
  getAllProductsProcess,
  getProductDetailProcess,
  productDeleteProcess,
  updateProductProcess,
} from "@/src/api";
import logo2 from "../../../../public/images/logo2.png";
import add from "../../../../public/images/add.png";

import Image from "next/image";
import { Button } from "@mui/material";
import AddingModal from "./AddingModal/AddingModal";
import { resetAllProducts } from "@/src/redux/slice/get-all-products-slice";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import BelgeyeUrunEklemeModal from "../../Belgeler/BelgeyeUrunEklemeModal";
import { resetAddProduct } from "@/src/redux/slice/add-new-product-slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetProductDelete } from "@/src/redux/slice/delete-product-from-incoming-product-slice";
import { resetDeleteProduct } from "@/src/redux/slice/delete-product-slice";
import {
  showToastErrorMessage,
  showToastSuccesMessage,
} from "../../ToastComponent";
import { resetUpdateProduct } from "@/src/redux/slice/update-product-slice";
import { resetAddIncomingProductToIncomingProduct } from "@/src/redux/slice/add-incoming-product-to-incoming-product-slice";
import { resetAddIncomingProductToOutgoingProduct } from "@/src/redux/slice/add-incoming-product-to-outgoing-product-slice";
import { AppContext } from "@/src/pages/_app";

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

function decryptData(encryptedData) {
  const decryptedData = atob(encryptedData);
  return decryptedData;
}

const Stok = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [openBelgedenGelenModal, setOpenBelgedenGelenModal] =
    React.useState(false);

  const [openAddingModal, setOpenAddingModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);

  const { data: ProductDetail } = useSelector((state) => state.productDetail);
  const { status } = useSelector((state) => state.addNewProduct);

  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPackageType, setProductPackageType] = useState("");
  const [productBarcode, setProductBarcode] = useState("");
  const [productAddress, setProductAddress] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [detailOrUpdate, setDetailOrUpdate] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([])
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
  const handleCloseBelgedenGelenModalOpen = () =>
    setOpenBelgedenGelenModal(false);

  const handleAddingModalOpen = () => setOpenAddingModal(true);
  const handleAddingModalClose = () => setOpenAddingModal(false);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const pageStok = router.query.a1;
  const documentId = router.query.a2;
  const decryptedPageStok = decryptData(pageStok ? pageStok : null);
  const decryptedDocumentId = decryptData(documentId ? documentId : null);
  const { searchQuery } = useContext(AppContext);

  const { data: AllProductData } = useSelector((state) => state.getAllProducts);
  const { status: DeleteProductStatus } = useSelector(
    (state) => state.productDelete
  );
  const { status: updateProductStatus } = useSelector(
    (state) => state.updateProduct
  );

  const { status: addProductToIncomingProductStatus } = useSelector(
    (state) => state.addProductToIncomingProduct
  );

  const { status: addProductToOutgoingProductStatus } = useSelector(
    (state) => state.addProductToOutgoingProduct
  );

  const handleProductDetail = (_id) => {
    console.log(decryptedPageStok, "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
    dispatch(getProductDetailProcess({ _id }));
    if (decryptedPageStok == 1 || decryptedPageStok == 2) {
      setOpenBelgedenGelenModal(true);
    } else {
      setOpen(true);
    }
  };

  const addNewProduct = async () => {
    await dispatch(
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
    await dispatch(getAllProductsProcess());
    handleAddingModalClose();
  };

  useEffect(() => {
    if (status === "succes") {
      showToastSuccesMessage("Ürün Eklendi");
      dispatch(resetAddProduct());
    } else if (status === "error") {
      showToastErrorMessage("Ürün Eklenemedi");
      dispatch(resetAddProduct());
    }
    if (DeleteProductStatus.productDeleteProcess === "success") {
      showToastSuccesMessage("Ürün Silindi");
      dispatch(resetDeleteProduct());
    } else if (DeleteProductStatus.productDeleteProcess === "error") {
      showToastErrorMessage("Ürün Silinemedi");
      dispatch(resetDeleteProduct());
    }
    if (updateProductStatus === "success") {
      showToastSuccesMessage("Ürün Güncellendi");
      dispatch(resetUpdateProduct());
    } else if (updateProductStatus === "error") {
      showToastErrorMessage("Ürün Güncellenemedi");
      dispatch(resetUpdateProduct());
    }
    if (addProductToIncomingProductStatus === "success") {
      showToastSuccesMessage("Ürün Belgeye Eklendi");
      dispatch(resetAddIncomingProductToIncomingProduct());
    } else if (addProductToIncomingProductStatus === "error") {
      showToastErrorMessage("Ürün Belgeye Eklenemedi");
      dispatch(resetAddIncomingProductToIncomingProduct());
    }
    if (addProductToOutgoingProductStatus === "success") {
      showToastSuccesMessage("Ürün Belgeye Eklendi");
      dispatch(resetAddIncomingProductToOutgoingProduct());
    } else if (addProductToOutgoingProductStatus === "error") {
      showToastErrorMessage("Ürün Belgeye Eklenemedi");
      dispatch(resetAddIncomingProductToOutgoingProduct());
    }
  }, [
    status,
    DeleteProductStatus.productDeleteProcess,
    updateProductStatus,
    addProductToIncomingProductStatus,
    addProductToOutgoingProductStatus,
  ]);

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
    return () => {
      dispatch(resetAllProducts());
    };
  }, []);

  const deleteProduct = async (_id) => {
    try {
      await dispatch(productDeleteProcess({ _id }));
      await dispatch(getAllProductsProcess());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = AllProductData.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      console.log(filtered, "filtereeeeeeeeeeeeeeeeeeeeeeeed");
    } else {
      setFilteredProducts(AllProductData);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
    }
  }, [searchQuery, AllProductData]);



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
              {filteredProducts  &&
                filteredProducts.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((productData) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={productData._id}
                      onClick={() => {
                        handleProductDetail(productData._id);
                        setDetailOrUpdate(false);
                      }}
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
                                {productData.productImage?.data ? (
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
                              <div className="flex justify-start items-center gap-2 ">
                                <Button
                                  variant="text"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleProductDetail(productData._id);
                                    setDetailOrUpdate(true);
                                    setOpen(true);
                                  }}
                                >
                                  Düzenle
                                </Button>
                                <Button
                                  variant="outlined"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteProduct(productData._id);
                                  }}
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
        ProductDetail={ProductDetail}
        detailOrUpdate={detailOrUpdate}
      />
      <BelgeyeUrunEklemeModal
        ProductDetail={ProductDetail}
        openBelgedenGelenModal={openBelgedenGelenModal}
        handleCloseBelgedenGelenModalOpen={handleCloseBelgedenGelenModalOpen}
        pageStok={decryptedPageStok}
        documentId={decryptedDocumentId}
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
