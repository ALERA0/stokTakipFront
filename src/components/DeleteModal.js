import { Box, Button, Modal, Typography } from "@mui/material";

import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteModal = ({ open, handleCloseDeleteModal,handleDeleteProduct }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Silmek İstediğinize Emin Misiniz?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex ">
              <Button onClick={handleDeleteProduct}>Sil</Button>{" "}
              <Button onClick={handleCloseDeleteModal}>İptal</Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
