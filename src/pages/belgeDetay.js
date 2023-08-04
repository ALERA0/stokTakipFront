import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
import { Button } from "antd";

const columns = [
  {
    id: "productName",
    label: "Ürün İsmi",
    render: (item) => displayImage(item.productImage.data),
    minWidth: 300,
  },
  { id: "productCode", label: "Ürün Kodu", minWidth: 170 },
  { id: "productQuantity", label: "Adet", minWidth: 100 },
  { id: "productDescription", label: "Açıklama", minWidth: 110 },
  {
    id: "actions",
    label: "İşlemler",
    minWidth: 100,
    format: (value, rowData) => (
      <Button variant="outlined" onClick={() => deleteProduct(rowData._id)}>
        Sil
      </Button>
    ),
  },
  // Diğer sütunlar...
];

const belgeDetay = () => {
  const [documentDate, setDocumentDate] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const { data: IncomingProductsDetailData } = useSelector(
    (state) => state?.incomingProductdetail
  );
  const { data: OutgoingProductsDetailData } = useSelector(
    (state) => state?.outgoingProductdetail
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
    }
    if (data?.products) {
      setProductDetails(data.products);
    }
  }, [data]);

  return (
    <div className="h-full w-full bg-light rounded-lg pr-24 lg:pl-16 md:pl-8 pl-2 py-8 flex flex-col ">
      <h2 className="text-2xl font-bold text-center">{documentType}</h2>

      <div className="w-full ">
        {data && (
          <div className="w-full flex flex-col gap-6 mt-6 ">
            <div className=" w-full flex justify-around ">
              <p>Belge Tarihi: {documentDate}</p>
              <p>Belge No: {documentNumber}</p>
            </div>
            <div className="flex w-full justify-around ">
              <p>
                {orderType} : {order.isim}
              </p>
              <p>Belge Açıklaması : {description}</p>
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
                            // Diğer onClick ve className işlemleri
                          >
                            {columns.map((column) => {
                              const value = productData?.product[column.id];

                              return (
                                <TableCell key={column.id} align={column.align}>
  {column.id === "productName" ? (
    <div style={{ display: "flex", alignItems: "center" }}>
      {productData?.productImage?.data ? (
        <div style={{ maxWidth: "80px", maxHeight: "100px" }}>
          {column.render(productData)}
        </div>
      ) : (
        <div style={{ maxWidth: "80px", maxHeight: "100px" }}>
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
  ) : column.id === "actions" ? (
    <div className="flex justify-start items-center ">
      <Button
        variant="outlined"
        onClick={() => deleteProduct(productData?._id)}
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
                count={productDetails?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )}

        {/* Burada belge detayları ve güncelleme işlemleri yapabilirsiniz */}
      </div>
    </div>
  );
};

export default belgeDetay;
