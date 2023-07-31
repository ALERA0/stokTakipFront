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

const CariAddingModal = ({
  openAddingModal,
  handleCloseAddingModal,
  addNewOrder,
  onFinishFailed,
  tcNumber,
  isim,
  email,
  telefon,
  adres,
  ozellik,
  handleIsimChange,
  handleTcNumberChange,
  handleEmailChange,
  handleTelefonChange,
  handleAdresChange,
  handleOzellikChange,
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
          <Box sx={style} className="rounded-lg  pt-6 ">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600, textDecorationColor: "white  " }}
              initialValues={{ remember: true }}
              onFinish={addNewOrder}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="w-full"
            >
              <div className="flex w-full px-5">
                <label className="text-white flex w-1/3">Tc No :</label>
                <Form.Item
                  name="tcNumber"
                  rules={[
                    { required: true, message: "Lütfen ürün adını girin!" },
                  ]}
                  className="text-white w-full"
                  style={{ color: "white" }}
                >
                  <Input
                    value={tcNumber}
                    onChange={handleTcNumberChange}
                    className="w-full"
                  />
                </Form.Item>
              </div>

              <Form.Item
                label="İsim"
                name="isim"
                rules={[
                  { required: true, message: "Lütfen ürün kodunu girin!" },
                ]}
              >
                <Input value={isim} onChange={handleIsimChange} />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <Input
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Item>

              <Form.Item
                label="Telefon"
                name="telefon"
                rules={[{ required: true, message: "Lütfen adeti girin!" }]}
              >
                <Input
                  value={telefon}
                  onChange={handleTelefonChange}
                />
              </Form.Item>

              <Form.Item
                label="Adres"
                name="adres"
                rules={[{ required: true, message: "Lütfen adeti girin!" }]}
              >
                <Input
                  value={adres}
                  onChange={handleAdresChange}
                />
              </Form.Item>

              {/* <Form.Item
                label="Ozellik"
                name="ozellik"
                rules={[{ required: true, message: "Lütfen fiyatı girin!" }]}
              >
                <Input
                  value={ozellik}
                  onChange={handleOzellikChange}
                />
              </Form.Item> */}

             

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

export default CariAddingModal;
