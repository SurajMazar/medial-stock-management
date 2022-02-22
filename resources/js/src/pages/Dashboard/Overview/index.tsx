import React, { useEffect, useState } from 'react';
import OverviewCard from '../../../components/Dashboard/overview-card'
import {FaClinicMedical,FaFileInvoice,FaUserTie,FaRegFrown,FaRegMoneyBillAlt} from 'react-icons/fa'
import { fetchDashboardOverview } from '../../../services/user.service';

const Overview = () =>{


  const [overview, setOverview] = useState<any>({
    product_count:0,
    sales_invoice_count:0,
    outOfStock_count:0,
    vendor_count:0
  })

  const fetchOverview = async () => {
    const data = await fetchDashboardOverview()
    if(data){
      setOverview(data)
    }
  }

  useEffect(()=>{
    fetchOverview()
  },[])

  return(
    <>
    <section className="section-break-1">
      <div className="row">
        <div className="col-md-6 col-lg-3">
          <OverviewCard title="Products" counts={overview.product_count || 0} icon={FaClinicMedical}/>
        </div>

        <div className="col-md-6 col-lg-3">
          <OverviewCard title="Vendors" counts={overview.vendor_count || 0} icon={FaUserTie}/>
        </div>

        <div className="col-md-6 col-lg-3">
          <OverviewCard title="Out of Stocks" counts={overview.outOfStock_count} icon={FaRegFrown}/>
        </div>

        <div className="col-md-6 col-lg-3">
          <OverviewCard title="Sales Invoices" counts={overview.sales_invoice_count} icon={FaFileInvoice}/>
        </div>

       
      </div>
    </section>
    </>
  );
}

export default Overview;