import { useRef, forwardRef, useImperativeHandle } from "react";

type ConfirmModalProps = {
  message: string;
  onConfirm: () => void;
};

export type ConfirmModalHandle = {
  open: () => void;
};

const ConfirmModal = forwardRef<ConfirmModalHandle, ConfirmModalProps>(
  ({ message, onConfirm }, ref) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => modalRef.current?.showModal(),
    }));

    return (
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <p className="mb-4 text-center text-xl">{message}</p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="btn btn-neutral px-8 hover:bg-gray-800"
              onClick={() => {
                onConfirm();
                modalRef.current?.close();
              }}>
              Yes
            </button>
            <button className="btn px-7" onClick={() => modalRef.current?.close()}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);

export default ConfirmModal;
