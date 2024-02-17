import React from "react";

function SearchModal(props) {
  // Based on whether the modal should be open determine the styling properties and apply them below
  const modalStyle = props.isOpen
    ? "fixed inset-0 flex items-center justify-center"
    : "hidden";

  const contentStyle = props.isOpen
    ? "bg-white p-4 rounded w-2/6 h-2/6 flex flex-col items-center border-2 border-black"
    : "";

  return (
    <>
      <div className={modalStyle}>
        <div className={contentStyle}>
          <button
            onClick={props.onClose}
            className="mt-4 p-2 bg-red-400 rounded"
          >
            Dismiss
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchModal;
