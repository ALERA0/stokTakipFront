import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Input, TextareaAutosize } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getIncomingProductDetailProcess,
  getOutgoingProductDetailProcess,
  updateIncomingDocProductQuantityProcess,
  updateOutgoingDocProductQuantityProcess,
} from "@/src/api";
import { resetIncomingProductDetail } from "@/src/redux/slice/get-incoming-product-detail-slice";
import { resetOutgoingProductDetail } from "@/src/redux/slice/get-outgoing-product-detail-slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#000E36",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 4,
};

const BelgeUrunDetayModal = ({
  open,
  handleClose,
  productData,
  isGelen,
  data,
}) => {
  const dispatch = useDispatch();
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleUpdateProductQuantity = async () => {
    console.log(data._id, "HKJASSKLJHASLHKDASKJHDASKHJLADHKJL");
    console.log(productData._id, "HKJASSKLJHASLHKDASKJHDASKHJLADHKJL");

    if (isGelen) {
      await dispatch(
        updateIncomingDocProductQuantityProcess({
          incomingProductId: data._id,
          rowId: productData._id,
          newQuantity: quantity,
        })
      );
    } else {
      await dispatch(
        updateOutgoingDocProductQuantityProcess({
          outgoingProductId: data._id,
          rowId: productData._id,
          newQuantity: quantity,
        })
      );
    }

    if (isGelen) {
      await dispatch(
        getIncomingProductDetailProcess({ incomingProductId: data?._id })
      );
    } else {
      await dispatch(
        getOutgoingProductDetailProcess({ outgoingProductId: data?._id })
      );
    }

    handleClose();
  };

  useEffect(() => {
    if (productData) {
      setProductCode(productData.productCode);
      setProductName(productData.productName);
      setProductQuantity(productData.productQuantity.toString());
      setProductDescription(productData.productDescription);
      setQuantity(productData.quantity.toString());
    }
  }, [productData]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="rounded-lg"
      >
        <Fade in={open}>
          <Box sx={style} className="rounded-lg g text-white pt-6 px">
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 items-center justify-center text-2xl font-bold text-center flex w-full"
            >
              Ürün İsmi: {productName}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold justify-center text-center flex w-full"
            >
              Ürün Kodu: {productCode}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold justify-center text-center flex w-full"
            >
              <label className="text-lg text-white font-bold text-center w-2/5 flex justify-end">
                Belgedeki Adedi:
              </label>
              <Input
                value={quantity}
                className="w-3/5 bg-white px-2"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold justify-center text-center flex w-full"
            >
              Stoktaki Adet: {productQuantity}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold justify-center text-center flex w-full"
            >
              Açıklama: {productDescription}
            </Typography>
            <div className="w-full flex justify-end mt-4 gap-2">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdateProductQuantity()}
                type="primary"
              >
                Kaydet
              </Button>
              <Button
                variant=""
                color="primary"
                onClick={handleClose}
                type="primary"
                className="font-bold"
              >
                Kapat
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default BelgeUrunDetayModal;
