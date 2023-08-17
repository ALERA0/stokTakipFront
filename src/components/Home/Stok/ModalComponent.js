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

const ModalComponent = ({
  open,
  handleClose,
  ProductDetail,
  detailOrUpdate,
}) => {
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
      setFiyat(ProductDetail.productPrice?.toString());
      setBarkod(ProductDetail.productBarcode);
      setAciklama(ProductDetail.productDescription);
      setAdres(ProductDetail.productAddress);
      setPaket(ProductDetail.productPackageType);
      setAdet(ProductDetail.productQuantity);
    }
  }, [ProductDetail]);

  const handleUpdateProduct = (_id) => {
    dispatch(
      updateProductProcess({
        _id,
        productCode: sk,
        productName: urunAdi,
        productPrice: fiyat,
        productDescription: aciklama,
        productPackageType: paket,
        productBarcode: barkod,
        productAddress: adres,
        productQuantity: adet,
      })
    )
      .then(() => {
        console.log("Ürün başarıyla güncellendi.");
        dispatch(getAllProductsProcess());
      })
      .catch((error) => {
        console.error("Ürün güncelleme hatası:", error);
      });
  };

  const updateProduct = () => {
    handleUpdateProduct(ProductDetail?._id);
    handleClose();
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
              className="mb-4 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Ürün İsmi :
              </label>
              {detailOrUpdate ? (
                <Input
                  value={urunAdi}
                  onChange={(e) => setUrunAdi(e.target.value)}
                  className="w-3/5"
                />
              ) : (
                <Input value={urunAdi} className="w-3/5" readOnly />
              )}
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
              {detailOrUpdate ? (
                <Input
                  value={sk}
                  className="w-3/5"
                  onChange={(e) => setSK(e.target.value)}
                />
              ) : (
                <Input value={sk} className="w-3/5" readOnly />
              )}
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
              {detailOrUpdate ? (
                <Input
                  value={fiyat}
                  className="w-3/5"
                  onChange={(e) => setFiyat(e.target.value)}
                />
              ) : (
                <Input value={fiyat} className="w-3/5" readOnly />
              )}
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
              {detailOrUpdate ? (
                <Input
                  value={paket}
                  className="w-3/5"
                  onChange={(e) => setPaket(e.target.value)}
                />
              ) : (
                <Input value={paket} className="w-3/5" readOnly />
              )}
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
              {detailOrUpdate ? (
                <Input
                  value={barkod}
                  className="w-3/5"
                  onChange={(e) => setBarkod(e.target.value)}
                />
              ) : (
                <Input value={barkod} className="w-3/5" readOnly />
              )}
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
              {detailOrUpdate ? (
                <Input
                  value={adres}
                  className="w-3/5"
                  onChange={(e) => setAdres(e.target.value)}
                />
              ) : (
                <Input value={adres} className="w-3/5" readOnly />
              )}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              className="mb-4 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Açıklama :
              </label>
              {detailOrUpdate ? (
                <TextareaAutosize
                  value={aciklama}
                  minRows={3}
                  maxRows={6}
                  className="w-3/5"
                  onChange={(e) => setAciklama(e.target.value)}
                />
              ) : (
                <TextareaAutosize
                  value={aciklama}
                  minRows={3}
                  maxRows={6}
                  className="w-3/5"
                  readOnly
                />
              )}
            </Typography>
            <div className="w-full flex justify-end mt-4">
              {detailOrUpdate ? (
                <Button
                  type="primary"
                  className="bg-blue-700"
                  onClick={updateProduct}
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

export default ModalComponent;
