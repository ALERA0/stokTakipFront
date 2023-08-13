import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Input } from "antd";
import { TextareaAutosize } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProductsProcess, updateProductProcess } from "../../../api";
import { resetAllProducts } from "../../../redux/slice/get-all-products-slice";

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

const ProductDetailModal = ({ open, handleClose, ProductDetail }) => {
  const [urunAdi, setUrunAdi] = useState("");
  const [sk, setSK] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [barkod, setBarkod] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [adres, setAdres] = useState("");
  const [paket, setPaket] = useState("");
  const [adet, setAdet] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (ProductDetail) {
      setUrunAdi(ProductDetail.productName);
      setSK(ProductDetail.productCode);
      setFiyat(ProductDetail.productPrice.toString());
      setBarkod(ProductDetail.productBarcode);
      setAciklama(ProductDetail.productDescription);
      setAdres(ProductDetail.productAddress);
      setPaket(ProductDetail.productPackageType);
      setAdet(ProductDetail.productQuantity);
    }
  }, [ProductDetail]);

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
                value={urunAdi}
                className="w-3/5"
                readOnly
              />
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold text-center flex w-full"
            >
              {ProductDetail?.productImage && (
                <img
                  src={`data:image/jpeg;base64,${ProductDetail.productImage.data}`}
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
              <Input
                value={sk}
                className="w-3/5"
                readOnly
              />
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
              <Input value={adet} className="w-3/5" readOnly />
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
              <Input
                value={fiyat}
                className="w-3/5"
                readOnly
              />
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
              <Input
                value={paket}
                className="w-3/5"
                readOnly
              />
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
              <Input
                value={barkod}
                className="w-3/5"
                readOnly
              />
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
              <Input
                value={adres}
                className="w-3/5"
                readOnly
              />
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
                value={aciklama}
                minRows={3}
                maxRows={6}
                className="w-3/5"
                readOnly
                
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ProductDetailModal;
