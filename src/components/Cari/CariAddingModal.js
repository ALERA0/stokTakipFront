import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Checkbox, Form, Input } from "antd";
import { FormControlLabel, FormGroup } from "@mui/material";

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
  isSelected1,
  setSelection1,
  isSelected2,
  setSelection2,
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
          <Box sx={style} className="rounded-lg  pt-6 text-white  ">
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end">
                Tc No :
              </label>
              <Input
                value={tcNumber}
                onChange={handleTcNumberChange}
                className="w-3/5"
                maxLength={11}
                // minLength={11}
              />
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
              <Input
                value={isim}
                className="w-3/5"
                onChange={handleIsimChange}
              />
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
              <Input
                value={email}
                className="w-3/5"
                onChange={handleEmailChange}
              />
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
              <Input
                value={telefon}
                className="w-3/5"
                onChange={handleTelefonChange}
              />
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
              <Input
                value={adres}
                className="w-3/5"
                onChange={handleAdresChange}
              />
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="pb-3 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-2/5 flex justify-end ">
                Özellik :
              </label>
              <FormGroup className="flex flex-row gap-2 pl-3 ">
                <FormControlLabel
                  control={<Checkbox />}
                  label="Tedarikçi"
                  value={isSelected1}
                  onChange={setSelection1}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Müşteri"
                  value={isSelected2}
                  onChange={setSelection2}
                />
              </FormGroup>
            </Typography>
            <div className="w-full flex justify-end mt-3 ">
              <Button
                type="primary"
                className="bg-blue-700"
                onClick={addNewOrder}
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

export default CariAddingModal;
