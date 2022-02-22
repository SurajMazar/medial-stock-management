import { Button, Popover } from "antd";
import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatTableWrapper from "../../components/DataTable";
import Preloader from "../../components/Preloader";
import { fetchUsersService } from "../../services/user.service";
import { StoreInterface } from "../../store/store";
import ChangePassword from './ChangePassword'

const CustomerPage: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: StoreInterface) => state);
  const { user } = state;


  const [show, setShow] = useState(false)

  const loadUsers = (params: any) => {
    dispatch(fetchUsersService(params));
  };




  return (
    <section>
      <div className="section-break-2 d-flex ac">
        <h3 className="text-24px-black">Users</h3>
        <div className="ml-auto">
          <Link to="/users/create">
            <Button
              type="primary"
              shape="round"
              size={"middle"}
            >
              Add user
            </Button>
          </Link>
        </div>
      </div>
      <div className="section-break-1">
        <DatTableWrapper
          fetchData={loadUsers}
          meta={user.meta}
        >
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {user.loading ? (
                <Preloader />
              ) : user.Users &&
              user.Users?.length ? (
                <tbody>
                  {user.Users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.roles[0]? user.roles[0].name.toUpperCase() : "N/A"}</td>
                      <td className="d-flex">
                        <Link
                          to={
                            "/user/edit/"+
                            user.id
                          }
                        >
                          <Button
                            shape="round"
                            className="btn-secondary mr-1"
                          >
                            Edit
                          </Button>
                        </Link>

                        <Button shape="round" className="btn-secondary" onClick={()=>setShow(true)}>
                          Change password
                        </Button>
                        <ChangePassword closeModal={()=>setShow(false)} editData={user} visible={show}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={4} className="text-center">
                      Sorry no users found!
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
        </DatTableWrapper>
      </div>
    </section>
  );
};

export default CustomerPage;
