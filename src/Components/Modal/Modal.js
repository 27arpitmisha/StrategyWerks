import { createPortal } from "react-dom";
import "./Modal.css";
// Modal Component for displaying product details
const Modal = ({ product, onClose }) => {
  if (!product) return null;
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{product.title}</h2>
        <img
          src={product.image}
          alt={product.title}
          className="modal-image"
          loading="lazy"
        />
        <p>{product.description}</p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
