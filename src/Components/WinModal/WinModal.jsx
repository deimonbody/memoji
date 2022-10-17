import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function WinModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Body>
        <p className="ff-bold text-center fs-2 m-0">Win :) </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} className="modalButton">
          Play Again
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

WinModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default WinModal;
