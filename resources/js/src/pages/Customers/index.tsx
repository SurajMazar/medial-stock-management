import { Button, Popover } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatTableWrapper from "../../components/DataTable";
import Preloader from "../../components/Preloader";
import { fetchCustomerService } from "../../services/customer.service";
import { StoreInterface } from "../../store/store";

const CustomerPage: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: StoreInterface) => state);
  const { customer } = state;

  const loadCustomers = (params: any) => {
    dispatch(fetchCustomerService(params));
  };

  return (
    <section>
      <div className="section-break-2 d-flex ac">
        <h3 className="text-24px-black">Customers</h3>
        <div className="ml-auto">
          <Link to="/customers/add">
            <Button
              type="primary"
              shape="round"
              size={"middle"}
            >
              Add Customer
            </Button>
          </Link>
        </div>
      </div>
      <div className="section-break-1">
        <DatTableWrapper
          fetchData={loadCustomers}
          meta={customer.metaCustomers}
        >
          <div className="p-1 table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {customer.loading ? (
                <Preloader />
              ) : customer.customers &&
                customer.customers?.length ? (
                <tbody>
                  {customer.customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone || "N/A"}</td>
                      <td>
                        <Link
                          to={
                            "/customers/view/"+
                            customer.id
                          }
                        >
                          <Button
                            shape="round"
                            className="btn-secondary mr-1"
                          >
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={4} className="text-center">
                      Sorry no customers found!
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </DatTableWrapper>
      </div>
    </section>
  );
};

export default CustomerPage;
