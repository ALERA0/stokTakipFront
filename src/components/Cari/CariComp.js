import React, { useState } from "react";
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
    minWidth: 100,
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
  const [isDeleteAction, setIsDeleteAction] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const deleteOrder = async (_id) => {
    try {
      await dispatch(deleteOrderProcess({ _id }));
      await dispatch(getAllOrdersProcess());
      // setIsDeleteAction(false); // Silme işlemi tamamlandı
    } catch (error) {
      // Silme işlemi hata aldı, yine sıfırlayın
      console.log(error);
    }
  };

  const handleOrderDetail = (_id) => {
    dispatch(getOrderDetailProcess({ _id }));
    setOpen(true); // Detayları görmek için modalı aç
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

  const addNewOrder = async () => {
    await dispatch(
      addNewOrderProcess({
        tcNumber: tcNumber,
        isim: isim,
        email: email,
        telefon: telefon,
        adres: adres,
        ozellik: ozellik,
      })
    );
    await dispatch(getAllOrdersProcess());
    handleAddingModalClose();
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

  // Hangi tab seçiliyse, ona göre verileri filtrele:
  let filteredData = [];
  if (selectedTab === "Musteri") {
    filteredData = musteriOrders;
  } else if (selectedTab === "Tedarikci") {
    filteredData = tedarikciOrders;
  } else {
    filteredData = allOrders;
  }

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
              {filteredData &&
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((orderData) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={orderData._id}
                        onClick={() => handleOrderDetail(orderData._id)}
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
                                  {orderData.productImage?.data ? (
                                    <div
                                      style={{
                                        maxWidth: "80px",
                                        maxHeight: "100px",
                                      }}
                                    >
                                      {column.render(orderData)}
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
                                    {orderData.productName}
                                  </span>
                                </div>
                              ) : column.id === "actions" ? (
                                <div className="flex relative z-20 justify-start items-center ">
                                  <Button
                                    variant="outlined"
                                    onClick={(e) => {
                                      e.stopPropagation(); 
                                      deleteOrder(orderData._id);
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
      />
    </div>
  );
};

export default CariComp;
