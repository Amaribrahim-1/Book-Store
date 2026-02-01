import { createPortal } from "react-dom";

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  warning,
  confirmText = "Confirm",
  variant = "danger",
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal--sm" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal__title">{title}</h3>

        <div className="modal__content">
          <p>{message}</p>

          {warning && (
            <div className={`confirm-warning confirm-warning--${variant}`}>
              {warning}
            </div>
          )}
        </div>

        <div className="confirm-actions">
          <button onClick={onClose}>Cancel</button>

          <button
            className={`btn--${variant}`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmationModal;
