import { Button, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Product from '../../../model/product.model';
import { fetchProductByID } from '../../../services/product.service';
import ProductEdit from './edit';
import ProductStock from './stocks';

const {TabPane}  =  Tabs;

interface routeParams{
  id:string
}


const ProductView:React.FC = () =>{
  
  const {id} = useParams<routeParams>();

  const [product,setProduct] = React.useState<Product|undefined>(undefined)
  const [loading,setLoading] = React.useState<boolean>(false);

  const loadProduct = async() =>{
    setLoading(true);
    const product = await fetchProductByID(id);
    setProduct(product);
    setLoading(false);
  }

  useEffect(()=>{
    loadProduct();
  },[]) //eslint-disable-line

  return(
    <section className="page-section-2">
      <div className="section-padding-1-2 d-flex ac">
        <h3 className="text-22px">{product?product.name:""}</h3>
        <div className="ml-auto d-flex">
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
          <ProductEdit loading={loading} product={product}/>
        </TabPane>
        <TabPane key="Stocks" tab="Stocks">
          <ProductStock productDetails={product}/>
        </TabPane>
      </Tabs>
    </section>
  );
}

export default ProductView;