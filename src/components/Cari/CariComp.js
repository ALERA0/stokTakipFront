import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import add from "../../../public/images/add.png";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewOrderProcess,
  deleteOrderProcess,
  getAllOrdersProcess,
  getMusteriOrdersProcess,
  getOrderDetailProcess,
  getTedarikciOrdersProcess,
} from "@/src/api";
import { Button } from "@mui/material";
import Image from "next/image";
import CariAddingModal from "./CariAddingModal";
import CariDetayModal from "./CariDetayModal";
import { resetAllProducts } from "@/src/redux/slice/get-all-products-slice";
import { useEffect } from "react";
import { resetAddOrder } from "@/src/redux/slice/add-new-order-slice";
import {
  showToastErrorMessage,
  showToastSuccesMessage,
} from "../ToastComponent";
import { resetUpdateOrder } from "@/src/redux/slice/update-order-slice";
import { resetDeleteOrder } from "@/src/redux/slice/delete-order-slice";
import { AppContext } from "@/src/pages/_app";
import DeleteModal from "../DeleteModal";

const columns = [
  {
    id: "isim",
    label: "Cari İsmi",
    minWidth: 100,
  },
  { id: "email", label: "Ürün Kodu", minWidth: 170 },
  {
    id: "telefon",
    label: "Telefon",
    minWidth: 100,
  },
  {
    id: "ozellik",
    label: "Cari Türü",
    minWidth: 110,
  },
  {
    id: "actions",
    label: "İşlemler",
    minWidth: 50,
  },
];

const tabOptions = [
  { id: "Hepsi", label: "Hepsi" },
  { id: "Musteri", label: "Müşteri" },
  { id: "Tedarikci", label: "Tedarikçi" },
  // Daha fazla seçenek ekleyebilirsiniz...
];

const CariComp = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [openAddingModal, setOpenAddingModal] = useState(false);
  const dispatch = useDispatch();
  const [detailOrUpdate, setDetailOrUpdate] = useState(false);
  const { searchQuery } = useContext(AppContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteOrder(selectedProductId);
      await dispatch(getAllOrdersProcess());
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Ürün silme işlemi başarısız oldu:", error);
    }
  };

  const deleteOrder = async (_id) => {
    try {
      await dispatch(deleteOrderProcess({ _id }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderDetail = (_id) => {
    dispatch(getOrderDetailProcess({ _id }));
  };

  const { data: OrderDetail } = useSelector((state) => state.orderDetail);
  const { data: GetMusteriOrders } = useSelector(
    (state) => state.getMusteriOrders
  );
  const { data: GetTedarikciOrders } = useSelector(
    (state) => state.getTedarikciOrders
  );

  useEffect(() => {
    dispatch(getAllOrdersProcess());
    return () => {
      dispatch(resetAllProducts());
    };
  }, []);

  const handleMusteriOrders = async () => {
    try {
      await dispatch(getMusteriOrdersProcess());
      setSelectedTab("Musteri");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTedarikciOrders = async () => {
    try {
      await dispatch(getTedarikciOrdersProcess());
      setSelectedTab("Tedarikci");
    } catch (error) {
      console.log(error);
    }
  };

  const { data: AllOrderData } = useSelector((state) => state.getAllOrders);

  const [tcNumber, setTcNumber] = useState();
  const [isim, setIsim] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState();
  const [adres, setAdres] = useState("");
  const [ozellik, setOzellik] = useState("Tedarikçi");
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleIsimChange = (e) => setIsim(e.target.value);
  const handleTcNumberChange = (e) => setTcNumber(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleTelefonChange = (e) => setTelefon(e.target.value);
  const handleAdresChange = (e) => setAdres(e.target.value);
  const handleOzellikChange = (e) => setOzellik(e.target.value);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAddingModalOpen = () => setOpenAddingModal(true);
  const handleAddingModalClose = () => setOpenAddingModal(false);

  let ozellikValue = [];

  if (isSelected1) {
    ozellikValue.push("Müşteri");
  }

  if (isSelected2) {
    ozellikValue.push("Tedarikçi");
  }

  const addNewOrder = async () => {
    await dispatch(
      addNewOrderProcess({
        tcNumber: tcNumber,
        isim: isim,
        email: email,
        telefon: telefon,
        adres: adres,
        ozellik: ozellikValue,
      })
    );
    await dispatch(getAllOrdersProcess());
    handleAddingModalClose();
    setTcNumber();
    setIsim("");
    setEmail("");
    setTelefon();
    setAdres("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [selectedTab, setSelectedTab] = useState("Hepsi");

  const handleChangeTab = (tabId) => {
    setSelectedTab(tabId);
    // Seçilen tab değiştikçe, ilgili verileri güncelleyin veya filtreleyin.
    if (tabId === "Musteri") {
      handleMusteriOrders();
    } else if (tabId === "Tedarikci") {
      handleTedarikciOrders();
    } else {
      dispatch(getAllOrdersProcess());
    }
  };

  // Örnek tablo verileri:
  const allOrders = useSelector((state) => state.getAllOrders.data);
  const musteriOrders = useSelector((state) => state.getMusteriOrders.data);
  const tedarikciOrders = useSelector((state) => state.getTedarikciOrders.data);
  const { status: newOrderStatus } = useSelector((state) => state.newOrder);
  const { status: updateOrderStatus } = useSelector(
    (state) => state.updateOrder
  );
  deleteOrder;
  const { status: deleteOrderStatus } = useSelector(
    (state) => state.deleteOrder
  );
  // Hangi tab seçiliyse, ona göre verileri filtrele:
  let filteredData = [];
  if (selectedTab === "Musteri") {
    filteredData = musteriOrders;
  } else if (selectedTab === "Tedarikci") {
    filteredData = tedarikciOrders;
  } else {
    filteredData = allOrders;
  }

  useEffect(() => {
    if (searchQuery) {
      const filtered = filteredData?.filter((order) =>
        order.isim.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      console.log(filtered, "filtereeeeeeeeeeeeeeeeeeeeeeeed");
    } else {
      setFilteredProducts(filteredData);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
  }, [searchQuery, filteredData]);

  useEffect(() => {
    if (newOrderStatus === "succes") {
      showToastSuccesMessage("Cari Eklendi");
      dispatch(resetAddOrder());
    } else if (newOrderStatus === "error") {
      showToastErrorMessage("Cari Eklenemedi");
      dispatch(resetAddOrder());
    }
    if (updateOrderStatus === "success") {
      showToastSuccesMessage("Cari Güncellendi");
      dispatch(resetUpdateOrder());
    } else if (updateOrderStatus === "error") {
      showToastErrorMessage("Cari Güncellenemedi");
      dispatch(resetUpdateOrder());
    }
    if (deleteOrderStatus.deleteOrderProcess === "success") {
      showToastSuccesMessage("Cari Silindi");
      dispatch(resetDeleteOrder());
    } else if (deleteOrderStatus.deleteOrderProcess === "error") {
      showToastErrorMessage("Cari Silinemedi");
      dispatch(resetDeleteOrder());
    }
  }, [newOrderStatus, updateOrderStatus, deleteOrderStatus.deleteOrderProcess]);

  return (
    <div className="h-full w-full bg-light rounded-lg pr-24 lg:pl-16 md:pl-8 pl-2 py-8 flex flex-col">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="lg:text-2xl md:text-xl text-lg font-bold  flex justify-center">
          Cariler
        </h2>
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
        <button
          className="flex lg:gap-3 md:gap-2 gap-1 hover:bg-blue-900 hover:text-white duration-500"
          onClick={handleAddingModalOpen}
        >
          <h2 className="lg:text-xl md:text-lg text-xs">Yeni Cari oluştur</h2>
          <Image
            src={add}
            alt="Cari Ekle"
            className="cursor-pointer"
            onClick={handleOpen}
            width={30}
          />
        </button>
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
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((orderData) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={orderData._id}
                        onClick={() => {
                          handleOrderDetail(orderData._id);
                          setOpen(true);
                          setDetailOrUpdate(false);
                        }}
                        className="cursor-pointer"
                      >
                        {columns.map((column) => {
                          const value = orderData[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "productImage" ? (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {/* Ürün görselini veya placeholder görselini burada görüntüle */}
                                  <span style={{ marginLeft: "10px" }}>
                                    {orderData.productName}
                                  </span>
                                </div>
                              ) : column.id === "actions" ? (
                                <div className="flex relative justify-start items-center gap-2 ">
                                  <Button
                                    variant="text"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOrderDetail(orderData._id);
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
                                      setSelectedProductId(orderData._id);
                                      handleOpenDeleteModal();
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
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Aradığınız cari bulunamadı.
                  </TableCell>
                </TableRow>
              )}
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
      <CariDetayModal
        open={open}
        handleClose={handleClose}
        OrderDetail={OrderDetail}
        detailOrUpdate={detailOrUpdate}
        isSelected1={isSelected1}
        setSelection1={setSelection1}
        isSelected2={isSelected2}
        setSelection2={setSelection2}
      />
      <CariAddingModal
        openAddingModal={openAddingModal}
        handleCloseAddingModal={handleAddingModalClose}
        addNewOrder={addNewOrder}
        onFinishFailed={onFinishFailed}
        tcNumber={tcNumber}
        isim={isim}
        email={email}
        telefon={telefon}
        adres={adres}
        ozellik={ozellik}
        handleIsimChange={handleIsimChange}
        handleTcNumberChange={handleTcNumberChange}
        handleEmailChange={handleEmailChange}
        handleTelefonChange={handleTelefonChange}
        handleAdresChange={handleAdresChange}
        handleOzellikChange={handleOzellikChange}
        isSelected1={isSelected1}
        setSelection1={setSelection1}
        isSelected2={isSelected2}
        setSelection2={setSelection2}
      />
      <DeleteModal
        open={openDeleteModal}
        handleDeleteProduct={handleDeleteProduct}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />
    </div>
  );
};

export default CariComp;
