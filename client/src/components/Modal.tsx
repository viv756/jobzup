import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <dialog className="modal " open={isOpen}>
      <div className="modal-box max-w-4xl">
        <form method="dialog" className="absolute right-2 top-2">
          <button type="button" className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            ✕
          </button>
        </form>

        {title && <h3 className="font-bold text-lg">{title}</h3>}
        <div className="py-4 ">{children}</div>
      </div>

      {/* overlay to close when clicking outside */}
    </dialog>
  );
};

export default Modal;
