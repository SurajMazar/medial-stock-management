import React from 'react';
import { createPortal } from 'react-dom';
import './preloader.scss';

const Preloader = () =>{
  return(
    createPortal(
    <div className="msm-preloader">
      <div className="cssload-spin-box"></div>
    </div>,document.body)
  );
}

export default Preloader;