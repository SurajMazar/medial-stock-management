import { Button } from 'antd';
import React from 'react';


const Products:React.FC = () =>{
 
  return(
    <section className="page-section-2">
      <div className="section-break-1-2 d-flex ac">
        <h3 className="text-22">Products</h3>
        <div className="ml-auto">
          <Button shape="round" size="middle" type="primary">
            New
          </Button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Product name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}


export default Products;