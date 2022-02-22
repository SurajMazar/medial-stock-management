interface User{
  id:string,
  name: string,
  email: string,
  created_at:Date,
  roles:Array<{
    name:string
  }>
}

export default User;