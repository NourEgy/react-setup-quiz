import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {

  const {closeModle , questions, correct, isModleOpen} = useGlobalContext();

  return (
    <div className={`${isModleOpen ? "modal-container isOpen" : "modal-container"}`}>
        <div className="modal-content">
          <h2> Congratulation! </h2>
  
          <p>
          You answered {((correct / questions.length) * 100).toFixed(0)}% of
            questions correctly
          </p>
          <button className="close-btn" onClick={closeModle}>
            play Again
          </button>
        </div>
    </div>
  )
}

export default Modal