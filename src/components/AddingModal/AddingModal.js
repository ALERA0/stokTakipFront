import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Checkbox, Form, Input } from "antd";

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
          <Box sx={style} className="rounded-lg g text-white pt-6 px">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={addNewProduct}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Ürün Adı"
                name="productName"
                rules={[
                  { required: true, message: "Lütfen ürün adını girin!" },
                ]}
              >
                <Input value={productName} onChange={handleProductNameChange} />
              </Form.Item>

              <Form.Item
                label="Ürün Kodu"
                name="productCode"
                rules={[
                  { required: true, message: "Lütfen ürün kodunu girin!" },
                ]}
              >
                <Input value={productCode} onChange={handleProductCodeChange} />
              </Form.Item>

              <Form.Item label="Ürün Resmi" name="productImage">
                <Input
                  value={productImage}
                  onChange={handleProductImageChange}
                />
              </Form.Item>

              <Form.Item
                label="Adet"
                name="productQuantity"
                rules={[{ required: true, message: "Lütfen adeti girin!" }]}
              >
                <Input
                  value={productQuantity}
                  onChange={handleProductQuantityChange}
                />
              </Form.Item>

              <Form.Item
                label="Fiyat"
                name="productPrice"
                rules={[{ required: true, message: "Lütfen fiyatı girin!" }]}
              >
                <Input
                  value={productPrice}
                  onChange={handleProductPriceChange}
                />
              </Form.Item>

              <Form.Item label="Ambalaj Tipi" name="productPackageType">
                <Input
                  value={productPackageType}
                  onChange={handleProductPackageTypeChange}
                />
              </Form.Item>

              <Form.Item label="Barkod" name="productBarcode">
                <Input
                  value={productBarcode}
                  onChange={handleProductBarcodeChange}
                />
              </Form.Item>

              <Form.Item label="Adres" name="productAddress">
                <Input
                  value={productAddress}
                  onChange={handleProductAddressChange}
                />
              </Form.Item>

              <Form.Item label="Açıklama" name="productDescription">
                <Input
                  value={productDescription}
                  onChange={handleProductDescriptionChange}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Ekle
                </Button>
              </Form.Item>
            </Form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddingModal;
