import React from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI";
import "antd/dist/antd.css";
import "../../App.css";
import axios from "axios";

import { Container, Form, Button, Row, Col } from "react-bootstrap";

class AddCar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      car_name: null,
      car_img: null,
      specifications: null,
      specdtl: null,
      icon: null,
      spec: null,
    };
  }
  signup = (e) => {
    e.preventDefault();

    //  const spec = [ {icon:this.state.icon,spec:this.state.spec},
    //                 {icon:this.state.icon,spec:this.state.spec},
    //                 {icon:this.state.icon,spec:this.state.spec}

    //                ]

    const formData = new FormData();

    formData.append("name", this.state.car_name);
    formData.append("carimage", this.state.car_img);
    formData.append("specdtl", this.state.specdtl);
    // formData.append("spec", spec)
    formData.append("spec", this.state.icon);
    formData.append("spec", this.state.spec);

    console.log(...formData);
    axios
      .post("https://myapp-backend.herokuapp.com/api/admin/create", formData)
      .then((err, res) => {
        if (res) {
          window.location.reload(false);
        }
      });
  };

  render() {
    return (
      <Layout>
        <Container>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form
                onSubmit={(e) => this.signup(e)}
                style={{ border: "1px solid gray", padding: "10px" }}
                autocomplete="off"
              >
                <Row>
                  <Col md={12}>
                    <Input
                      label="Car Name"
                      placeholder="Car Name"
                      type="text"
                      autocomplete="off"
                      onChange={(e) => {
                        this.setState({ car_name: e.target.value });
                      }}
                    />
                  </Col>

                  <Col md={12}>
                    <Input
                      autocomplete="off"
                      label="Car Image"
                      type="file"
                      onChange={(e) => {
                        this.setState({ car_img: e.target.files[0] });
                      }}
                    />
                  </Col>
                  <hr></hr>
                </Row>

                <Row>
                  <Col md={6} sm={6}>
                    <Input
                      autocomplete="off"
                      label="Icon"
                      type="file"
                      onChange={(e) => {
                        this.setState({ icon: e.target.files[0] });
                      }}
                    />
                  </Col>
                  <Col md={6} sm={6}>
                    <Input
                      autocomplete="off"
                      label="Specification"
                      placeholder="Car Name"
                      type="text"
                      onChange={(e) => {
                        this.setState({ spec: e.target.value });
                      }}
                    />
                  </Col>
                  <hr></hr>
                </Row>

                <Input
                  label="Specification file"
                  type="file"
                  onChange={(e) => {
                    this.setState({ specdtl: e.target.files[0] });
                  }}
                />

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default AddCar;
