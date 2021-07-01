import { Button } from 'antd';
import React from 'react';


const Currency:React.FC = () =>{
  return(
    <section>
      <div className="section-break-1-2 d-flex">
        <h2 className="text-22px">Currency</h2>
        <div className="ml-auto">
          <Button shape="round" size="middle" type="primary">Add Currency</Button>
        </div>
      </div>
    </section>
  )
}


export default Currency;