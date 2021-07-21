import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';


const Home:React.FC = () =>{
  return(
    <section className="section-home">
      <img src={'/logo.jpg'} className="img-fluid mb-3"/>
      <h3 className="tex-222p-primary mb-4">Welcome back</h3>
      <Link to="/dashboard" style={{display:'block'}}>
        <Button shape="round" size="large" type="primary">Go to the Dashboard</Button>
      </Link>
    </section>
  );
}

export default Home;