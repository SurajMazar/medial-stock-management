import { Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatTableWrapper from '../../components/DataTable';
import Preloader from '../../components/Preloader';
import { fetchProducts } from '../../services/product.service';
import { StoreInterface } from '../../store/store';
import { getSn } from '../../utils/helper.utils';
import CreateProduct from './create';


const Products:React.FC = () =>{

  const dispatch = useDispatch();

  //store
  const store = useSelector((state:StoreInterface)=>{
    const {product} = state;
    return product;
  });
  const {metaProduct,products,loadingProduct} = store;
  //end store


  const loadProducts = (params:any = {page:1}) =>{
    dispatch(fetchProducts(params));
  }


  
  //create modal
  const [showModal,setShowModal] = React.useState<boolean>(false)
  const openModal = ()=>{
    setShowModal(true);
  }
  const closeModal = ()=>{
    setShowModal(false);
  }
  
 
  return(
    <section className="page-section-2">
      <div className="section-break-1-2 d-flex ac">
        <h3 className="text-22">Products</h3>
        <div className="ml-auto">
          <Button shape="round" size="middle" type="primary" onClick={openModal}>
            New
          </Button>
        </div>
      </div>
      <DatTableWrapper meta={metaProduct} fetchData={loadProducts}>
        {
          loadingProduct?<Preloader/>:
          <table className="table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Product name</th>
                <th>Category</th>
                <th>In stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                products && metaProduct && products.length?
                products.map((item,i)=>(
                <tr key={item.id}>
                  <td>{getSn(metaProduct?.current_page,i)}</td>
                  <td>{item.name}</td>
                  <td>{item.category? item.category.name || 'N/A':"N/A"}</td>
                  <td><i className="fa fa-check text-primary"></i></td>
                  <td>
                  <Link to={`/products/view/${item.id}`}>
                    
                      <Button shape='round' size="middle" className="btn-secondary"
                        // onClick={()=>editModal(item)}
                      >View</Button>
                  </Link>
                  </td>
                </tr>))
                :<tr>
                  <td colSpan={5} className="text-center">Sorry no products found!!</td>
                </tr>
              }
            </tbody>
          </table>
        }
      </DatTableWrapper>
      <CreateProduct closeModal={closeModal} visible={showModal}/>
    </section>
  );
}


export default Products;