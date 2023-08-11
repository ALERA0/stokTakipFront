import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  addIncomingProductToIncomingProductProcess,
  addIncomingProductToOutgoingProductProcess,
  getAllProductsProcess,
  getIncomingProductDetailProcess,
  getOutgoingProductDetailProcess,
} from "@/src/api";
import { useRouter } from "next/router";

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

function decryptData(encryptedData) {
  const decryptedData = atob(encryptedData);
  return decryptedData;
}

const BelgeyeUrunEklemeModal = ({
  openBelgedenGelenModal,
  handleCloseBelgedenGelenModalOpen,
  ProductDetail,
}) => {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [quantity, setQuantity] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const pageStok = router.query.a1;
  const decryptedPageStok = decryptData(pageStok ? pageStok : null);
  const documentId = router.query.a2;
  const decryptedDocumentId = decryptData(documentId ? documentId : null);

  useEffect(() => {
    if (ProductDetail) {
      setProductCode(ProductDetail.productCode);
      setProductName(ProductDetail.productName);
      setProductQuantity(ProductDetail.productQuantity.toString());
      setProductDescription(ProductDetail.productDescription);
      //   setQuantity(productData.quantity.toString());
    }
  }, [ProductDetail]);

  const handleAddProductToDocument = async () => {
    console.log(decryptedPageStok, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(decryptedDocumentId, "DOC IDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
    if (decryptedPageStok == 1) {
      console.log("pageSTOK 1111111");
      await dispatch(
        addIncomingProductToIncomingProductProcess({
          incomingProductId: decryptedDocumentId,
          productId: ProductDetail._id,
          productQuantity: quantity,
        })
      );
      await dispatch(getAllProductsProcess());
      handleCloseBelgedenGelenModalOpen();
      await dispatch(
        getIncomingProductDetailProcess({
          incomingProductId: decryptedDocumentId,
        })
      );
    } else if (decryptedPageStok == 2) {
      console.log("pageSTOK 22222222222");

      await dispatch(
        addIncomingProductToOutgoingProductProcess({
          outgoingProductId: decryptedDocumentId,
          productId: ProductDetail._id,
          productQuantity: quantity,
        })
      );
      await dispatch(getAllProductsProcess());
      handleCloseBelgedenGelenModalOpen();
      await dispatch(
        getOutgoingProductDetailProcess({
          outgoingProductId: decryptedDocumentId,
        })
      );
    }

    // router.push("/belgeDetay");

    setQuantity(null);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openBelgedenGelenModal}
        onClose={handleCloseBelgedenGelenModalOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="rounded-lg"
      >
        <Fade in={openBelgedenGelenModal}>
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
                Ürün Adedi:
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
                onClick={handleAddProductToDocument}
                type="primary"
              >
                Kaydet
              </Button>
              <Button
                variant=""
                color="primary"
                onClick={handleCloseBelgedenGelenModalOpen}
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

export default BelgeyeUrunEklemeModal;
