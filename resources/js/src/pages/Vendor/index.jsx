import React, { useEffect, useState } from 'react';
import {Button} from 'antd';
import {fetchVendors} from '../../services/vendorServices';
import TdSkel from '../../components/skeletons/tdSkeleton';

const Vendor = () => {

  const [loadingVendors, setloadingVendors] = useState(true);
  const [vendors,setVendors] = useState({});
  
  const fv = async()=>{
    setloadingVendors(true);
    const vendors = await fetchVendors();
    setVendors(vendors);
    setloadingVendors(false);
  }
  
  useEffect(() => {
     fv();
  },[])

  return(
    <section>

      <div className="section-break-1">
        <Button type="primary" shape="round" size={'large'}>
          Add Vendor
        </Button>
      </div>

      <div className="section-break-1">
        <div className="card">
          <div className="card-body p-0 table-responsive">
            <table className='table'>
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Products</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {loadingVendors?
              <TdSkel cols={7} rows={10}/>
              :vendors && vendors?.data.length?
              <tbody>
                {
                  vendors.data.map((vendor,index)=>(
                    <tr key={vendor.id}>
                      <td>{index+1}</td>
                      <td>{vendor.name}</td>
                      <td>{vendor.email}</td>
                      <td>{vendor.mobile_number}</td>
                      <td>5</td>
                      <td>{vendor.location}</td>
                      <td></td>
                    </tr>
                  ))
                }
              </tbody>:
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center">Sorry no vendors found!</td>
                </tr>
              </tbody>
              }
              
              
            </table>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Vendor;