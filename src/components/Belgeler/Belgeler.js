import {
  getAllDocumentsProcess,
  getIncomingProductDetailProcess,
  getIncomingProductsProcess,
  getIncomingTransactionsProcess,
  getOutgoingProductDetailProcess,
  getOutgoingProductsProcess,
} from "@/src/api";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BelgeDetayModal from "./BelgeDetayModal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { resetIncomingProductDetail } from "@/src/redux/slice/get-incoming-product-detail-slice";
import { resetOutgoingProductDetail } from "@/src/redux/slice/get-outgoing-product-detail-slice";
import add from "../../../public/images/add.png";
import Image from "next/image";
import BelgeSecmeModal from "./BelgeSecmeModal";

const columns = [
  {
    id: "ozellik",
    label: "Cari Türü",
    minWidth: 110,
    format: (value) =>
      value === 1 ? "Ürün Giriş Belgesi" : "Ürün Çıkış Belgesi",
    colorFormat: (value) => (value === 1 ? "red" : "green"),
  },
  {
    id: "documentDate",
    label: "Belge Tarihi ",
    minWidth: 100,
  },
  { id: "documentNumber", label: "Belge No", minWidth: 170 },
  {
    id: "description",
    label: "Açıklama",
    minWidth: 100,
  },
  {
    id: "actions",
    label: "İşlemler",
    minWidth: 100,
  },
];

const tabOptions = [
  { id: "Hepsi", label: "Tüm Belgeler" },
  { id: "Gelen", label: "Ürün Giriş Belgeleri" },
  { id: "Giden", label: "Ürün Çıkış Belgeleri" },
];

function decryptData(encryptedData) {
  const decryptedData = atob(encryptedData);
  return decryptedData;
}

const Belgeler = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [openAddingModal, setOpenAddingModal] = useState(false);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("Hepsi");
  const [belgeModal, setBelgeModal] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setBelgeModal(false);
  const handleAddingModalOpen = () => setOpenAddingModal(true);
  const handleAddingModalClose = () => setOpenAddingModal(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(getAllDocumentsProcess());
  }, []);

  const handleIncomingProducts = () => {
    dispatch(getIncomingProductsProcess());
    setSelectedTab("Gelen");
  };

  const handleOutgoingProducts = () => {
    dispatch(getOutgoingProductsProcess());
    setSelectedTab("Giden");
  };

  const handleChangeTab = (tabId) => {
    setSelectedTab(tabId);
    // Seçilen tab değiştikçe, ilgili verileri güncelleyin veya filtreleyin.
    if (tabId === "Gelen") {
      handleIncomingProducts();
    } else if (tabId === "Giden") {
      handleOutgoingProducts();
    } else {
      dispatch(getAllDocumentsProcess());
    }
  };

  const allDocuments = useSelector((state) => state.allDocuments.data);
  const incomingProducts = useSelector(
    (state) => state.getIncomingProducts.data
  );
  const outgoingProducts = useSelector(
    (state) => state.getOutgoingProducts.data
  );
  const pageStok = router.query.a1;
  const decryptedPageStok = decryptData(pageStok ? pageStok : null);
  const documentId = router.query.a2;
  const decryptedDocumentId = decryptData(documentId ? documentId : null);

  let filteredData = [];

  useEffect(() => {
    dispatch(getIncomingTransactionsProcess({ _id: decryptedDocumentId }));
  }, [decryptedDocumentId]);

  const listTransactions = useSelector((state) => state.listTransactions.data);

  if (decryptedPageStok == 3) {
    filteredData = listTransactions;
  } else {
    if (selectedTab === "Gelen") {
      filteredData = incomingProducts;
    } else if (selectedTab === "Giden") {
      filteredData = outgoingProducts;
    } else {
      filteredData = allDocuments;
    }
  }

  const handleDocumentDetail = (_id, ozellik) => {
    ozellik == 1
      ? dispatch(getIncomingProductDetailProcess({ incomingProductId: _id }))
      : dispatch(getOutgoingProductDetailProcess({ outgoingProductId: _id }));

    dispatch(resetIncomingProductDetail());
    dispatch(resetOutgoingProductDetail());

    router.push("/belgeDetay");
  };

  return (
    <div className="h-full w-full bg-light rounded-lg pr-24 lg:pl-16 md:pl-8 pl-2 py-8 flex flex-col">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <h2 className="lg:text-2xl md:text-xl text-lg font-bold  flex justify-center">
            Belgeler
          </h2>
          <div
            className="flex lg:gap-3 md:gap-2 gap-1 bg-blue-900 hover:bg-blue-700 text-white duration-500 py-1 px-2 rounded-lg ml-2 cursor-pointer"
            onClick={() => setBelgeModal(true)}
          >
            <Image
              src={add}
              alt="Ürün Ekle"
              className="cursor-pointer flex justify-center items-center my-auto"
              width={25}
            />
            <h2 className="lg:text-xl md:text-lg text-xs flex justify-center items-center my-auto">
              Yeni Belge Oluştur
            </h2>
          </div>
        </div>
        {/* Seçenekleri döngüyle oluşturun */}
        <div className="flex gap-2">
          {tabOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleChangeTab(option.id)}
              className={`border px-4 py-2 rounded-lg ${
                selectedTab === option.id ? "bg-blue-900 text-white" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
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
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData &&
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((documentData) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={documentData._id}
                        onClick={() =>
                          handleDocumentDetail(
                            documentData._id,
                            documentData.ozellik
                          )
                        }
                        className="cursor-pointer"
                      >
                        {columns.map((column) => {
                          const value = documentData[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "productImage" ? (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {documentData.productImage?.data ? (
                                    <div
                                      style={{
                                        maxWidth: "80px",
                                        maxHeight: "100px",
                                      }}
                                    >
                                      {column.render(documentData)}
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
                                </div>
                              ) : column.id === "actions" ? (
                                <div className="flex justify-start items-center ">
                                  <Button
                                    variant="outlined"
                                    // onClick={() =>
                                    //   deleteOrder(documentData._id)
                                    // }
                                  >
                                    Sil
                                  </Button>
                                </div>
                              ) : column.format && typeof value === "number" ? (
                                <span
                                  style={{
                                    color: column.colorFormat
                                      ? column.colorFormat(value)
                                      : "inherit",
                                  }}
                                >
                                  {column.format(value)}
                                </span>
                              ) : (
                                <span
                                  style={{
                                    color: column.colorFormat
                                      ? column.colorFormat(value)
                                      : "inherit",
                                  }}
                                >
                                  {value}
                                </span>
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
          count={filteredData ? filteredData.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <BelgeSecmeModal open={belgeModal} handleClose={handleClose} />
    </div>
  );
};

export default Belgeler;
