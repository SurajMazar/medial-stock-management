import React from 'react';
import './miniloader.scss';

interface Props {
  text?: string
  color?:string
}
const MiniLoader: React.FC<Props> = (props) => {
  const {text,color} = props;
  return (
    <div className="d-flex">
      <div className="text" style={{color:`${color?color:"black"}`}}>
        {text||"Loading"}
      </div>
      <div className="loadingio-spinner-ball-2aw57bfsa1g ml-2">
        <div className="ldio-rwggcso6kq">
          <div>
          </div>
        </div>
      </div>
    </div>
   
  );
}

export default MiniLoader