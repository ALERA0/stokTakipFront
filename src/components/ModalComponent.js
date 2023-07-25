import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

const ModalComponent = ({
  handleOpen,
  open,
  handleClose,
  setOpen,
  productName,
  productCode,
  productImage,
  productQuantity,
  productPrice,
  productPackageType,
  productBarcode,
  productAddress,
  productDescription,
}) => {
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
              className="mb-4 gap-2 text-2xl font-bold text-center"
            >
              {productName}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="my-2 gap-2 text-2xl font-bold text-center"
            >
              {productImage && (
                <img
                  src={`data:image/jpeg;base64,${productImage}`}
                  alt="Ürün Resmi"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                  className="mx-auto"
                />
              )}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="mb-2 mt-4"
            >
              Ürün Kodu : {productCode}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="my-2"
            >
              Ürün Adeti : {productQuantity}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="my-2"
            >
              Ürün Fiyatı : {productPrice}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="my-2"
            >
              Ürün Paket Türü : {productPackageType}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="my-2"
            >
              Ürün Barkodu : {productBarcode}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="my-2"
            >
              Ürün Adresi : {productAddress}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              className="flex flex-"
            >
              Ürün Açıklaması : {productDescription}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalComponent;
