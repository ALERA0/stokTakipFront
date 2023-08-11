import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Link from "next/link";

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

const BelgeSecmeModal = ({ open, handleClose }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="rounded-lg"
      >
        <Fade in={open}>
          <Box sx={style} className="rounded-lg g text-white pt-6 px">
            <Typography
              variant="h6"
              component="h2"
              className=" gap-2 items-center justify-center text-2xl font-bold text-center flex flex-col w-full"
            >
              <p className="text-center font-bold mb-4 text-3xl">
                Belge Cinsini Seçin
              </p>
              <div className="w-full flex gap-6">
                <Link
                  className="w-1/2 bg-blue-900 hover:bg-blue-800 py-4 px-3 rounded-lg cursor-pointer duration-300"
                  href="/urunGiris"
                >
                  Ürün Giriş Belgesi
                </Link>
                <Link
                  className="w-1/2 bg-blue-900 py-4 px-3  hover:bg-blue-800 rounded-lg cursor-pointer duration-300"
                  href="/urunCikis"
                >
                  Ürün Çıkış Belgesi
                </Link>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default BelgeSecmeModal;
