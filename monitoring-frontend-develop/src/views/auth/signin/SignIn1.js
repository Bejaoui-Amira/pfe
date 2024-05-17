import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';


import AuthLogin from './FirebaseLogin';


const Signin1 = () => {
  const navigate = useNavigate()
  const handleSubmit = async (values) => {
    login(values.email, values.password).then(response => {
      localStorage.setItem('token', response.token);
      navigate('/app/dashboard/default');
    });
  };

  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <AuthLogin handleSubmit={handleSubmit}/>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin1;
