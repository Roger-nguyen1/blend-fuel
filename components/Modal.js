import React, { useState } from "react";
import { Modal } from "react-daisyui";

const MyModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn" onClick={handleOpenModal}>
        Open modal
      </button>

      <Modal isopen={isOpen.toString()} onClose={handleCloseModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={handleCloseModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyModal;
