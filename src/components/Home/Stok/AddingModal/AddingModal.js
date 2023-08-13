import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Checkbox, Form, Input } from "antd";
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

const AddingModal = ({
  openAddingModal,
  handleCloseAddingModal,
  addNewProduct,
  onFinishFailed,
  productName,
  productCode,
  productImage,
  productQuantity,
  productPrice,
  productPackageType,
  productBarcode,
  productAddress,
  productDescription,
  handleProductNameChange,
  handleProductCodeChange,
  handleProductImageChange,
  handleProductQuantityChange,
  handleProductPriceChange,
  handleProductPackageTypeChange,
  handleProductBarcodeChange,
  handleProductAddressChange,
  handleProductDescriptionChange,
}) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddingModal}
        onClose={handleCloseAddingModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className="rounded-lg"
      >
        <Fade in={openAddingModal}>
          <Box sx={style} className="rounded-lg  pt-6 text-white ">
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Ürün Adı :
              </label>
              <Input
                value={productName}
                onChange={handleProductNameChange}
                className="w-3/5"
                maxLength={11}
                // minLength={11}
              />
            </Typography>{" "}
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Ürün Kodu :
              </label>
              <Input
                value={productCode}
                onChange={handleProductCodeChange}
                className="w-3/5"
                maxLength={11}
                // minLength={11}
              />
            </Typography>{" "}
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Ürün Resmi :
              </label>
              <Input
                value={productImage}
                onChange={handleProductImageChange}
                className="w-3/5"
                maxLength={11}
                // minLength={11}
              />
            </Typography>{" "}
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Adet :
              </label>
              <Input
                value={productQuantity}
                onChange={handleProductQuantityChange}
                className="w-3/5"
                maxLength={11}
                // minLength={11}
              />
            </Typography>{" "}
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Fiyat :
              </label>
              <Input
                value={productPrice}
                onChange={handleProductPriceChange}
                className="w-3/5"
                maxLength={11}
                // minLength={11}
              />
            </Typography>{" "}
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Paket Tipi :
              </label>
              <Input
                value={productPackageType}
                onChange={handleProductPackageTypeChange}
                className="w-3/5"
                maxLength={11}
                // minLength={11}
              />
            </Typography>{" "}
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Barkod No :
              </label>
              <Input
                value={productBarcode}
                onChange={handleProductBarcodeChange}
                className="w-3/5"
                maxLength={11}
                // minLength={11}
              />
            </Typography>{" "}
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Adres :
              </label>
              <Input
                value={productAddress}
                onChange={handleProductAddressChange}
                className="w-3/5"
                maxLength={11}
                // minLength={11}
              />
            </Typography>{" "}
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Açıklama :
              </label>
              <TextareaAutosize
                minRows={3}
                maxRows={6}
                value={productDescription}
                onChange={handleProductDescriptionChange}
                className="w-3/5"
                maxLength={11}
                // minLength={11}
              />
            </Typography>
            <div className="w-full flex justify-end mt-3  gap-4 ">
              <Button
                type="primary"
                className="bg-red-700"
                onClick={handleCloseAddingModal}
              >
                Kapat
              </Button>
              <Button
                type="primary"
                className="bg-blue-700"
                onClick={addNewProduct}
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

export default AddingModal;
