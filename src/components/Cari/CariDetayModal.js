import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Input } from "antd";
import { InputBase, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllOrdersProcess, updateOrderProcess } from "@/src/api";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#000E36",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 4,
};

function encryptData(data) {
  const encryptedData = btoa(data);
  return encryptedData;
}

const CariDetayModal = ({ open, handleClose, OrderDetail, detailOrUpdate }) => {
  const [modalTcNumber, setModalTcNumber] = useState("");
  const [modalIsim, setModalIsim] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalTelefon, setModalTelefon] = useState("");
  const [modalAdres, setModalAdres] = useState("");
  const [modalOzellik, setModalOzellik] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (open && OrderDetail) {
      setModalTcNumber(OrderDetail.tcNumber);
      setModalIsim(OrderDetail.isim);
      setModalEmail(OrderDetail.email);
      setModalTelefon(OrderDetail.telefon);
      setModalAdres(OrderDetail.adres);
      setModalOzellik(OrderDetail.ozellik);
    }
  }, [open, OrderDetail]);

  const handleUpdateOrder = (_id) => {
    dispatch(
      updateOrderProcess({
        _id,
        tcNumber: modalTcNumber,
        isim: modalIsim,
        email: modalEmail,
        telefon: modalTelefon,
        adres: modalAdres,
        ozellik: modalOzellik,
      })
    )
      .then(() => {
        console.log("Ürün başarıyla güncellendi.");
        dispatch(getAllOrdersProcess());
      })
      .catch((error) => {
        console.log("Cari güncelleme hatası:", error);
      });
  };

  const updateOrder = () => {
    handleUpdateOrder(OrderDetail?._id);
    handleClose();
  };

  const handlePastTransactions = () => {
    const encryptedPageStok = encryptData(3);
    const encryptedDocumentId = encryptData(OrderDetail?._id);

    router.push({
      pathname: "/belgeler",
      query: { a1: encryptedPageStok, a2: encryptedDocumentId },
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className="rounded-lg"
      >
        <Fade in={open}>
          <Box sx={style} className="rounded-lg g text-white pt-6 px">
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Tc No :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={modalTcNumber}
                  onChange={(e) => setModalTcNumber(e.target.value)}
                  className="w-3/5"
                />
              ) : (
                <Input value={modalTcNumber} className="w-3/5" />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Cari İsmi :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={modalIsim}
                  className="w-3/5"
                  onChange={(e) => setModalIsim(e.target.value)}
                />
              ) : (
                <Input value={modalIsim} className="w-3/5" />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Email :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={modalEmail}
                  className="w-3/5"
                  onChange={(e) => setModalEmail(e.target.value)}
                />
              ) : (
                <Input value={modalEmail} className="w-3/5" />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Telefon :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={modalTelefon}
                  className="w-3/5"
                  onChange={(e) => setModalTelefon(e.target.value)}
                />
              ) : (
                <Input value={modalTelefon} className="w-3/5" />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Adres :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={modalAdres}
                  className="w-3/5"
                  onChange={(e) => setModalAdres(e.target.value)}
                />
              ) : (
                <Input value={modalAdres} className="w-3/5" />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Özellik :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={modalOzellik}
                  className="w-3/5"
                  onChange={(e) => setModalOzellik(e.target.value)}
                />
              ) : (
                <Input value={modalOzellik} className="w-3/5" />
              )}
            </Typography>

            <div className="w-full flex justify-end mt-4 gap-6">
              <Button
                // type="primary"
                className="bg-green-600 text-white hover:bg-green-300 hover:text-white"
                onClick={handlePastTransactions}
              >
                Carinin geçmiş işlemlerini görüntüle
              </Button>
              {detailOrUpdate ? (
                <Button
                  type="primary"
                  className="bg-blue-700"
                  onClick={updateOrder}
                >
                  Kaydet
                </Button>
              ) : null}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CariDetayModal;
