import React from 'react';
import { createPortal } from 'react-dom';
import './preloader.scss';

const Preloader = () => {
  return (
    createPortal(
      <div className="msm-preloader">
        <div className="loadingio-spinner-double-ring-gjey61clq87"><div className="ldio-iuc6bven5d">
          <div></div>
          <div></div>
          <div><div></div></div>
          <div><div></div></div>
        </div></div>
      </div>, document.body)
  );
}

export default Preloader;