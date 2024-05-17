import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import BarDiscreteChart from '../charts/nvd3-chart/chart/BarDiscreteChart'
import PieDonutChart from '../charts/nvd3-chart/chart/PieDonutChart'
import { getProducts } from '../../api';
import { MAX_PRODUCTION_PRODUCT1, MAX_PRODUCTION_PRODUCT2 } from '../../config/constant';

const DashDefault = () => {

  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getProducts().then(response => setProducts(response.products));
  }, []);

  let products1 = products?.map(p => p.category === 'product1');
  let products2 = products?.map(p => p.category === 'product2');
  let data = null;

  return (
    <React.Fragment>
      <Row>
        <Col key={111} xl={6} xxl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">{'Product 1'}</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather ${data?.icon} f-30 m-r-5`} /> {products1.Length}
                  </h3>
                </div>
                <div className="col-3 text-end">
                  <p className="m-b-0">{(products1/MAX_PRODUCTION_PRODUCT1) * 100}%</p>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className={'progress-bar progress-c-theme'}
                  role="progressbar"
                  style={{ width: `${(products1/MAX_PRODUCTION_PRODUCT1) * 100}%` }}
                  aria-valuenow={(products1/MAX_PRODUCTION_PRODUCT1) * 100}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col key={222} xl={6} xxl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">{'Product 1'}</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather ${data?.icon} f-30 m-r-5`} /> {products2.Length}
                  </h3>
                </div>
                <div className="col-3 text-end">
                  <p className="m-b-0">{(products2/MAX_PRODUCTION_PRODUCT2) * 100}%</p>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className={'progress-bar progress-c-theme'}
                  role="progressbar"
                  style={{ width: `${(products2/MAX_PRODUCTION_PRODUCT2) * 100}%` }}
                  aria-valuenow={(products2/MAX_PRODUCTION_PRODUCT2) * 100}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={24}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Product 1 Category</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Reference</th>
                    <th>Production Date</th>
                  </tr>
                </thead>
                <tbody>
                  {products1?.map((p, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{p.reference}</td>
                      <td>{p.production_date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Product 2 Category</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Reference</th>
                    <th>Production Date</th>
                  </tr>
                </thead>
                <tbody>
                  {products2?.map((p, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{p.reference}</td>
                      <td>{p.production_date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Bar Discrete Chart</Card.Title>
            </Card.Header>
            <Card.Body>
              <BarDiscreteChart
                products1={products1}
                products2={products2}
              />
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Pie Chart</Card.Title>
            </Card.Header>
            <Card.Body>
              <PieDonutChart
                products1={products1}
                products2={products2}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
