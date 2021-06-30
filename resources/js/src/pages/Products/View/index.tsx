import { Button, Tabs } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ProductEdit from './edit';

const {TabPane}  =  Tabs;

const ProductView:React.FC = () =>{
  return(
    <section className="page-section-2">
      <div className="section-padding-1-2 d-flex ac">
        <h3 className="text-22px">Product Details</h3>
        <div className="ml-auto">
          <Link to='/products'>
            <Button className="btn-outline-primary mr-1" 
            shape="round"  size="middle">Product lists</Button>
          </Link>

          <Button className="btn-outline-danger" 
          shape="round"  size="middle">Delete</Button>
        </div>
      </div>
      <Tabs defaultActiveKey="Edit">
        <TabPane key="Edit" tab="Edit">
          <ProductEdit/>
        </TabPane>
        <TabPane key="Stocks" tab="Stocks">

        </TabPane>
      </Tabs>
    </section>
  );
}

export default ProductView;