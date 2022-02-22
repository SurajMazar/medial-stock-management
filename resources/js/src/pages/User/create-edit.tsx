import { Button, Form, Input, Popconfirm, Select } from "antd"
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import Preloader from "../../components/Preloader"
import { createUpdateUser, deleteUserService, fetchUserById } from "../../services/user.service"
import { removeNullItems, setFormdata } from "../../utils/helper.utils"

const { Option } = Select

const CreateEditUser: React.FC = () => {

  const [form] = Form.useForm()
  const { id } = useParams<{
    id: string
  }>()

  const history = useHistory()

  /** 
   * application state
   */
  const [updating, setUpdating] = useState(false)
  const [loading,setLoading] = useState(false)

  const fetcheditingUser = async () => {
    const user = await fetchUserById(id);
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        role: user.roles[0] ? user.roles[0].name : ''
      })
    }
  }

  // update function
  const onSubmit = async (value: any) => {
    setUpdating(true);
    const formD: any = {
      name: value.name,
      email: value.email,
      role: value.role
    }

    if (!id) {
      formD.password = value.password
      formD.password_confirmation = value.password_confirmation
    }

    const form = setFormdata({
      ...formD,
      _method: id ? 'patch' : 'post'
    })

    await createUpdateUser(form, id, () => {
      history.push('/users')
    })

    setUpdating(false);
  }


  useEffect(() => {
    if (id) {
      fetcheditingUser()
    }
  }, [id])


  /**
   * delete user
   */
  const deleteUser = async() =>{
    setLoading(true)
    await deleteUserService(id)
    history.push('/users')
    setLoading(false)
  }

  return (
    <section className="page-section-2">
      {
        loading?<Preloader/>:''
      }
      <div className="section-padding-1-2 d-flex ac">
        <h3 className="text-22px">{id ? "Edit user" : "Add user"}</h3>
        <div className="ml-auto d-flex">
          <Link to='/users'>
            <Button className="btn-outline-primary mr-1"
              shape="round" size="middle">User lists</Button>
          </Link>

          {
            id ?

              <Popconfirm
                title={"Are you sure?"}
                onConfirm={deleteUser}
                okText="delete"
                cancelText="cancle"
              >
                <Button className="btn-outline-danger"
                  shape="round" size="middle">Delete</Button>
              </Popconfirm> : ''
          }

        </div>
      </div>
      <div className="section-break-2">
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: 'User\'s name is required!' }
                ]}
              >
                <Input placeholder="Name" className="form-control" />
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'User\'s email is required!' }
                ]}
              >
                <Input placeholder="Email" type="email" className="form-control" />
              </Form.Item>
            </div>

            {
              !id ?
                <>
                  <div className="col-md-6">
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        { required: true, message: 'Password is required!' }
                      ]}
                    >
                      <Input type="password" placeholder="Password" className="form-control" />
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <Form.Item
                      label="Confirm password"
                      name="password_confirmation"
                      rules={[
                        { required: true, message: 'Password is required!' },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject('Password and confirm password fields don\'t match');
                          },
                        }),
                      ]}
                    >
                      <Input type="password" placeholder="Confirm password" className="form-control" />
                    </Form.Item>
                  </div>
                </> : ""
            }

            <div className="col-md-6">
              <Form.Item
                label="Role"
                name="role"
                rules={[
                  { required: true, message: 'Role is required!' }]}>
                <Select>
                  <Option value="admin">Admin</Option>
                  <Option value="sale">Sale</Option>
                  <Option value="lab">Lab</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-12 mt-4">
              <Button
                loading={updating}
                htmlType="submit" shape="round" type="primary">{id ? 'Update' : "Create"}</Button>
            </div>

          </div>
        </Form>
      </div>
    </section>
  )
}

export default CreateEditUser