import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatTableWrapper from '../../../components/DataTable';
import Preloader from '../../../components/Preloader';
import { ProductCategory } from '../../../model/product.model';
import { fetchProductCategory } from '../../../services/product.service';
import { StoreInterface } from '../../../store/store';
import CreateEditCategory from './create-edit';

const ProductCategory:React.FC = () =>{
  //store
  const state = useSelector((state:StoreInterface)=>{
    const {product} = state;
    return product;
  });
  const {categories,loading, meta} = state;
  //store

  const dispatch = useDispatch();

  const loadcats = (params:any = {page:1}) =>{
    dispatch(fetchProductCategory(params));
  }

  useEffect(()=>{
    loadcats();
  },[dispatch]);



  // create edit modal section
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editData,setEditData] = useState<ProductCategory|undefined>(undefined);

  const openModal = () =>{
    setShowModal(true);
  }
  const closeModal = () =>{
    setShowModal(false);
    setEditData(undefined);
  }

  const editModal = (pc:ProductCategory) =>{
    setEditData(pc);
    setShowModal(true);
  }
  // end create edit modal section

  return(
    <>
      <section className="page-section-2">
        <div className="section-break-1-2">
          <div className="d-flex ac">
            <h3 className="text-22px">Product Categories</h3>
            <div className="ml-auto">
              <Button shape='round' onClick={openModal} size="middle" type="primary">New</Button>
            </div>
          </div>
        </div>
        <DatTableWrapper fetchData={loadcats} meta={meta}>
        {loading?<Preloader/>:
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                categories && categories.length?
                categories.map((item)=>(
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                  <Button shape='round' size="small" className="btn-secondary"
                    onClick={()=>editModal(item)}
                  >Edit</Button>
                  </td>
                </tr>))
                :<tr>
                  <td colSpan={2} className="text-center">Sorry no categories found!!</td>
                </tr>
              }
            
            </tbody>
          </table>
          }
        </DatTableWrapper>

        <CreateEditCategory showModal={showModal} closeModal={closeModal} editData={editData}/>
      </section>
    </>
  )
}

export default ProductCategory;