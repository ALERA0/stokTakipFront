import { useRouter } from "next/router";
import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import logo2 from "../../public/images/logo2.png";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Button, Input } from "antd";
import Image from "next/image";
import BelgeDetayModal from "../components/Belgeler/BelgeDetayModal";
import {
  addIncomingProductToIncomingProductProcess,
  addIncomingProductToOutgoingProductProcess,
  deleteProductFromIncomingProductProcess,
  deleteProductFromOutgoingProductProcess,
  getIncomingProductDetailProcess,
  getMusteriOrdersProcess,
  getOutgoingProductDetailProcess,
  getTedarikciOrdersProcess,
  updateIncomingDocProcess,
  updateOutgoingDocProcess,
} from "../api";
import { TextareaAutosize } from "@mui/material";
import add from "../../public/images/add.png";
import BelgeyeUrunEklemeModal from "../components/Belgeler/BelgeyeUrunEklemeModal";
import { resetAddIncomingProductToIncomingProduct } from "../redux/slice/add-incoming-product-to-incoming-product-slice";
import { resetAddIncomingProduct } from "../redux/slice/add-incoming-product-slice";
import {
  showToastErrorMessage,
  showToastSuccesMessage,
} from "../components/ToastComponent";
import { resetAddOutgoingProduct } from "../redux/slice/add-outgoing-product-slice";
import { resetUpdateIncomingDoc } from "../redux/slice/update-incoming-doc-slice";
import { resetUpdateOutgoingDoc } from "../redux/slice/update-outgoing-doc-slice";

const columns = [
  {
    id: "productName",
    label: "Ürün İsmi",
    render: (item) => displayImage(item.productImage.data),
    minWidth: 300,
  },
  { id: "productCode", label: "Ürün Kodu", minWidth: 170 },
  { id: "quantity", label: "Belgedeki Adedi", minWidth: 100 },
  { id: "productQuantity", label: "Stoktaki Adet", minWidth: 100 },
  { id: "productDescription", label: "Açıklama", minWidth: 110 },
  {
    id: "actions",
    label: "İşlemler",
    minWidth: 100,
  },
  // Diğer sütunlar...
];

// URL den gönderdiğimiz veriyi karmaşık hale getirdik
function encryptData(data) {
  const encryptedData = btoa(data);
  return encryptedData;
}

const belgeDetay = () => {
  const [documentDate, setDocumentDate] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);
  const [silmeModalAcilmasin, setSilmeModalAcilmasin] = useState(true);
  const dispatch = useDispatch();
  const [selectedProductData, setSelectedProductData] = useState(null);
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data: IncomingProductsDetailData } = useSelector(
    (state) => state?.incomingProductdetail
  );
  const { data: OutgoingProductsDetailData } = useSelector(
    (state) => state?.outgoingProductdetail
  );
  const { status: addIncomingProductStatus } = useSelector(
    (state) => state.addIncomingProduct
  );

  const { status: addOutgoingProductStatus } = useSelector(
    (state) => state.addOutgoingProduct
  );

  const [isGelen, setIsGelen] = useState(null);
  useEffect(() => {
    if (IncomingProductsDetailData) {
      setIsGelen(true);
    }
    if (OutgoingProductsDetailData) {
      setIsGelen(false);
    }
  }, [IncomingProductsDetailData, OutgoingProductsDetailData]);

  const data = isGelen
    ? IncomingProductsDetailData
    : OutgoingProductsDetailData;

  const documentType = isGelen
    ? "Ürün Giriş Belgesi Detay"
    : "Ürün Çıkış Belgesi Detay";

  const orderType = isGelen ? "Satıcı" : "Alıcı";

  useEffect(() => {
    if (data) {
      setDocumentDate(data.documentDate);
      setDocumentNumber(data.documentNumber);
      setDescription(data.description);
      setOrder(data.order);
      if (data.products) {
        const updatedProductDetails = data.products.map((productData) => ({
          ...productData.product,
          quantity: productData.quantity,
          _id: productData._id,
        }));
        setProductDetails(updatedProductDetails);
      }
    }
  }, [data]);

  console.log(addIncomingProductStatus, "STATUSSSSSSSSSSSSSSSSSSSS");

  const handleDeleteProductFromDocument = async (productRowId) => {
    console.log(productRowId, "PRODUCT ROW ID: ");
    console.log(data._id, "DATA ID :");

    if (isGelen) {
      await dispatch(
        deleteProductFromIncomingProductProcess({
          incomingProductId: data._id,
          rowId: productRowId,
        })
      );
    } else {
      await dispatch(
        deleteProductFromOutgoingProductProcess({
          outgoingProductId: data._id,
          rowId: productRowId,
        })
      );
    }
    if (isGelen) {
      await dispatch(
        getIncomingProductDetailProcess({ incomingProductId: data._id })
      );
    } else {
      await dispatch(
        getOutgoingProductDetailProcess({ outgoingProductId: data._id })
      );
    }
    setSilmeModalAcilmasin(false);

    setOpen(false);
  };

  useEffect(() => {
    dispatch(getTedarikciOrdersProcess());
    dispatch(getMusteriOrdersProcess());
  }, []);

  const handleOpenModal = (productData) => {
    setSelectedProductData(productData);
    setOpen(true);
  };

  const musteriOrders = useSelector((state) => state.getMusteriOrders.data);
  const tedarikciOrders = useSelector((state) => state.getTedarikciOrders.data);

  const [selectedOrder, setSelectedOrder] = useState(order?._id);
  const [selectedCariName, setSelectedCariName] = useState(order?.isim);

  const options = isGelen ? tedarikciOrders : musteriOrders;

  useEffect(() => {
    const orderName = order && order.isim ? order.isim : "";
    const orderId = order && order._id ? order._id : "";
    setSelectedCariName(orderName);
    setSelectedOrder(orderId);
  }, [order]);

  const handleOrderChange = (value) => {
    setSelectedOrder(value);
    console.log(value, "DSFLKDSAFŞLKSDJFŞLKJSDHFLKJSDHFLKJSHDFLKJHSDLK");
    const selectedOrderName = options.find(
      (option) => option._id === value
    )?.isim; // Cari ismi değiştiğinde ListBox'ın değerini değiştirmek için içinde dolaştık.
    setSelectedCariName(selectedOrderName);
  };

  const handleUrunEkleBelgeye = () => {
    const encryptedPageStok = isGelen ? encryptData(1) : encryptData(2);
    const encryptedId = encryptData(data._id);

    router.push({
      pathname: "/",
      query: { a1: encryptedPageStok, a2: encryptedId },
    });
  };

  const handleUpdateDocumentDetail = () => {
    isGelen
      ? dispatch(
          updateIncomingDocProcess({
            _id: data._id,
            documentDate,
            documentNumber,
            description,
            order: selectedOrder,
          })
        )
      : dispatch(
          updateOutgoingDocProcess({
            _id: data._id,
            documentDate,
            documentNumber,
            description,
            order: selectedOrder,
          })
        );

    console.log(selectedOrder, "DOĞRU YAZIYOR MU BU LİSTBOX");
  };
  const { status: updateIncomingProductDocStatus } = useSelector(
    (state) => state.updateIncomingProduct
  );

  const { status: updateOutgoingProductDocStatus } = useSelector(
    (state) => state.updateOutgoingProduct
  );

  useEffect(() => {
    if (addIncomingProductStatus === "success") {
      console.log("SHOW TOAST SUCCESS 2222");
      showToastSuccesMessage("Belge Eklendi");
      dispatch(resetAddIncomingProduct());
    } else if (addIncomingProductStatus === "error") {
      console.log("SHOW TOAST SUCCESS 333");
      showToastErrorMessage("Belge Eklenemedi");
      dispatch(resetAddIncomingProduct());
    }
    if (addOutgoingProductStatus === "success") {
      console.log("SHOW TOAST SUCCESS 2222");
      showToastSuccesMessage("Belge Eklendi");
      dispatch(resetAddOutgoingProduct());
    } else if (addOutgoingProductStatus === "error") {
      console.log("SHOW TOAST SUCCESS 333");
      showToastErrorMessage("Belge Eklenemedi");
      dispatch(resetAddOutgoingProduct());
    }
    if (updateIncomingProductDocStatus === "success") {
      console.log("SHOW TOAST SUCCESS 2222");
      showToastSuccesMessage("Belge Güncellendi");
      dispatch(resetUpdateIncomingDoc());
    } else if (updateIncomingProductDocStatus === "error") {
      console.log("SHOW TOAST SUCCESS 333");
      showToastErrorMessage("Belge Güncellenemedi");
      dispatch(resetUpdateIncomingDoc());
    }
    if (updateOutgoingProductDocStatus === "success") {
      console.log("SHOW TOAST SUCCESS 2222");
      showToastSuccesMessage("Belge Güncellendi");
      dispatch(resetUpdateOutgoingDoc());
    } else if (updateOutgoingProductDocStatus === "error") {
      console.log("SHOW TOAST SUCCESS 333");
      showToastErrorMessage("Belge Güncellenemedi");
      dispatch(resetUpdateOutgoingDoc());
    }
  }, [
    addIncomingProductStatus,
    addOutgoingProductStatus,
    updateIncomingProductDocStatus,
    updateOutgoingProductDocStatus
  ]);

  return (
    <div className="h-full w-full bg-light rounded-lg pr-24 lg:pl-16 md:pl-8 pl-2 py-8 flex flex-col ">
      <div className="w-full flex ">
        <h2 className="text-2xl flex font-bold text-center justify-center items-center w-full">
          {documentType}
        </h2>
        <Button
          type="primary"
          className="flex justify-end items-end  bg-blue-900"
          onClick={handleUpdateDocumentDetail}
        >
          Kaydet
        </Button>
      </div>

      <div className="w-full ">
        {data && (
          <div className="w-full flex flex-col gap-6 mt-6 ">
            <div className=" w-full flex justify-around ">
              <div className="flex gap-2">
                <p className="text-xl font-bold my-auto">Belge Tarihi : </p>
                <Input
                  value={documentDate}
                  className="w-40 text-center my-auto"
                  type="Date"
                  onChange={(e) => setDocumentDate(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <p className="text-xl font-bold my-auto">Belge No : </p>
                <Input
                  value={documentNumber}
                  className="w-auto text-center my-auto"
                  onChange={(e) => setDocumentNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full justify-around  ">
              <div className="flex gap-2">
                <p className="text-xl font-bold my-auto">{orderType} : </p>
                <div className="relative z-10 w-44">
                  <Listbox value={selectedOrder} onChange={handleOrderChange}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selectedCariName}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {options &&
                            options.map((option, optionIdx) => (
                              <Listbox.Option
                                key={optionIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-amber-100 text-amber-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={option._id}
                              >
                                {({ selected }) => (
                                  <div className="flex items-center justify-between">
                                    <div
                                      className={`truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {option.isim}
                                    </div>
                                    {selected && (
                                      <CheckIcon
                                        className="h-5 w-5 text-amber-600"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
              <div className="flex gap-2">
                <p className="text-xl font-bold my-auto">Belge Açıklaması : </p>
                <TextareaAutosize
                  minRows={2}
                  maxRows={4}
                  value={description}
                  className="w-52 h-8 text-center  my-auto"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full bg-gray-600 h-1 rounded-full " />

            <div className="flex justify-end   ">
              <div
                className="flex justify-end items-end  bg-blue-900 hover:bg-blue-700 lg:gap-3 md:gap-2 gap-1 text-white duration-500 py-1 px-2 rounded-lg cursor-pointer"
                onClick={handleUrunEkleBelgeye}
              >
                <Image
                  src={add}
                  alt="Ürün Ekle"
                  className="cursor-pointer flex justify-center items-center my-auto"
                  width={25}
                />
                <h2 className="lg:text-xl md:text-lg text-xs flex justify-center items-center my-auto">
                  Yeni Ürün Ekle
                </h2>
              </div>
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
                          {column.id === "productImage"
                            ? "Ürün İsmi"
                            : column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productDetails &&
                      productDetails.map((productData) => {
                        return (
                          <TableRow
                            key={productData._id}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            onClick={() => handleOpenModal(productData)}
                            className="cursor-pointer"
                          >
                            {columns.map((column) => {
                              const value = productData[column.id];

                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.id === "product" ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      {productData?.productImage?.data ? (
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
                                        {productData?.product?.productName}
                                      </span>
                                    </div>
                                  ) : column.id === "quantity" ? (
                                    // Eklendi: Adet değerini burada render ediyoruz
                                    productData.quantity
                                  ) : column.id === "actions" ? (
                                    // İşlemler sütununu render edin
                                    <div className="flex justify-start items-center">
                                      <Button
                                        variant="outlined"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteProductFromDocument(
                                            productData._id
                                          );
                                        }}
                                      >
                                        Sil
                                      </Button>
                                    </div>
                                  ) : column.format &&
                                    typeof value === "number" ? (
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
                count={productDetails?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )}
        <BelgeDetayModal
          data={data}
          open={open}
          handleClose={handleClose}
          productData={selectedProductData}
          isGelen={isGelen}
        />

        {/* Burada belge detayları ve güncelleme işlemleri yapabilirsiniz */}
      </div>
    </div>
  );
};

export default belgeDetay;
