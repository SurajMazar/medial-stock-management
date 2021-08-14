import moment from 'moment';
import React, { useEffect } from 'react';
import { FaFileInvoice, FaFileInvoiceDollar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import OverviewCard from '../../../components/Dashboard/overview-card';
import DatTableWrapper from '../../../components/DataTable';
import Preloader from '../../../components/Preloader';
import Product from '../../../model/product.model';
import { fetchStocks } from '../../../services/product.service';
import { StoreInterface } from '../../../store/store';
import { getCurrency, NepaliNS, returnLimitedWords } from '../../../utils/helper.utils';

interface params{
  id:string
}


interface Props{
  productDetails:Product|undefined
}

const ProductStock:React.FC<Props> = (props)=>{

  const {id} =  useParams<params>();

  const {productDetails} = props;
  const dispatch = useDispatch();

  //store
  const state = useSelector((state:StoreInterface)=>state);
  const {product} = state;
  const {metaStocks,loadingStocks,stocks} = product;
  // end store

  const loadStocks =(params:any)=>{
    params = {
      ...params,
      product_id:id
    }
    dispatch(fetchStocks(params));
  }


  return(
    <>
      <section className="section-break-2">
      {
        productDetails?
        <div className="row">
          <div className="col-md-3">
            <OverviewCard
              counts={NepaliNS(productDetails.total_purchases||0,"Rs ")}
              title="Total purchases"
              icon={FaFileInvoiceDollar}
            />
          </div>

          <div className="col-md-3">
            <OverviewCard
              counts={productDetails.total_stocks || 0}
              title="Stocks"
              icon={FaFileInvoice}
            />
          </div>
        </div>
        :""
      }

        <div className="mt-2">
          <DatTableWrapper meta={metaStocks} fetchData={loadStocks}>
          {
            loadingStocks?<Preloader/>:

            <table className="table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Batch</th>
                  <th>Vendor</th>
                  <th>Invoice number</th>
                  <th>Expiry date</th>
                  <th>Marked price</th>
                  <th></th>
                  <th>Rate</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {
                  stocks && stocks.length?
                  stocks.map((item)=>(
                    <tr key={item.id}>
                      <td>{item.code}</td>
                      <td>{item.batch}</td>
                      <td>
                        <Link to={`/vendors/${item.purchase_invoice?.vendor.id}/details`}
                          title={item.purchase_invoice?.vendor.name}
                        >
                          {returnLimitedWords(item.purchase_invoice?.vendor.name||"",30)}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/purchase-invoices/view/${item.purchase_invoice?.id}`}>
                          {item.purchase_invoice?.invoice_number}
                        </Link>
                      </td>
                      <td>
                        {moment(item.expiry_date).format("YYYY-MM-DD")}
                      </td>
                      <td className="nowrap">{getCurrency(item.purchase_invoice)+item.marked_price}</td>
                      <td className="nowrap">{Number(item.free)?"free":""}</td>
                      <td className="nowrap">{Number(item.free)? item.free_rate +`(${item.free_rate_type})`:
                      getCurrency(item.purchase_invoice)+item.rate}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  )):
                  <tr>
                    <td colSpan={9} className="text-center">Sorry no purchases were made!!</td>
                  </tr>
                }
                
              </tbody>
            </table>
          }
          </DatTableWrapper>
        </div>
        
      </section>
    </>
  );
}

export default ProductStock;