import React from 'react';
import OverviewCard from '../../../components/Dashboard/overview-card'
import {FaClinicMedical,FaFileInvoice,FaUserTie,FaRegFrown,FaRegMoneyBillAlt} from 'react-icons/fa'

const Overview = () =>{
  return(
    <>
    <section className="section-break-1">
      <div className="row">
        <div className="col-md-6 col-lg-3">
          <OverviewCard title="Products" counts={150} icon={FaClinicMedical}/>
        </div>

        <div className="col-md-6 col-lg-3">
          <OverviewCard title="Vendors" counts={25} icon={FaUserTie}/>
        </div>

        <div className="col-md-6 col-lg-3">
          <OverviewCard title="Out of Stocks" counts={3} icon={FaRegFrown}/>
        </div>

        <div className="col-md-6 col-lg-3">
          <OverviewCard title="Sales Invoices" counts={300} icon={FaFileInvoice}/>
        </div>

       
      </div>
    </section>
    <section className="section-break-1">
      <div className="row">
        <div className="col-md-6 col-lg-3">
          <OverviewCard title="Today's Sales" counts={5000} icon={FaRegMoneyBillAlt}/>
        </div>

        <div className="col-md-6 col-lg-3">
          <OverviewCard title="Weekly Sales" counts={5000} icon={FaFileInvoice}/>
        </div>

        <div className="col-md-6 col-lg-3">
          <OverviewCard title="Today's Expenses" counts={3000} icon={FaRegMoneyBillAlt}/>
        </div>

        <div className="col-md-6 col-lg-3">
          <OverviewCard title="Weekly Expenses" counts={30000} icon={FaFileInvoice}/>
        </div>
       
      </div>
    </section>


    
    </>
  );
}

export default Overview;