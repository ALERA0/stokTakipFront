import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Input } from "antd";
import { TextareaAutosize } from "@mui/material";

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
  setUrunAdi,
  updateProductInModal,
  ProductDetail
}) => {
  const handleSave = () => {
    updateProductInModal(ProductDetail?._id); // ModalComponent'in içinde doğru kullanım
  };
  console.log(
    productName,
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  );
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
              className="mb-4 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Ürün İsmi :
              </label>
              <Input
                defaultValue={productName}
                onChange={(e) => setUrunAdi(e.target.value)}
                className="w-3/5"
              />
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold text-center flex w-full"
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
              className="mb-4 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Ürün Kodu :
              </label>
              <Input defaultValue={productCode} className="w-3/5" />
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Ürün Adeti :
              </label>
              <Input defaultValue={productQuantity} className="w-3/5" />
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Ürün Fiyatı :
              </label>
              <Input defaultValue={productPrice} className="w-3/5" />
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Paket Türü :
              </label>
              <Input defaultValue={productPackageType} className="w-3/5" />
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Barkod No :
              </label>
              <Input defaultValue={productBarcode} className="w-3/5" />
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Raf Adresi :
              </label>
              <Input defaultValue={productAddress} className="w-3/5" />
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              className="mb-4 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Açıklama :
              </label>
              <TextareaAutosize
                defaultValue={productDescription}
                className="w-3/5"
              />
            </Typography>
            <div className="w-full flex justify-end mt-4">
              <Button
                type="primary"
                className="bg-blue-700"
                onClick={handleSave}
              >
                Kaydet
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalComponent;
