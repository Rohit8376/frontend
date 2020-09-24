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
      specdtl: null,

      inputfield: [{ icon: null, spec: null }],
    };
  }

  HandleChangeInput = (index, event) => {
    if (event.target.name === "icon") {
      const values = [...this.state.inputfield];
      values[index][event.target.name] = event.target.files[0];
      this.setState({ inputfield: values });
    } else {
      const values = [...this.state.inputfield];
      values[index][event.target.name] = event.target.value;
      this.setState({ inputfield: values });
    }
  };

  handleaddfield = () => {
    const Inputfiled = [...this.state.inputfield];
    Inputfiled.push({ icon: null, spec: null });
    this.setState({ inputfield: Inputfiled });
  };

  handleRemovefield = (index) => {
    console.log(index);
    const values = [...this.state.inputfield];
    values.splice(index, 1);
    this.setState({ inputfield: values });
  };

  signup = (e) => {

    e.preventDefault();

    const formData = new FormData();

    this.state.inputfield.forEach((file) => {
      formData.append("spec", file.icon, file.icon.name);
    });

    this.state.inputfield.forEach((file) => {
      formData.append("spec", file.spec);
    });

    formData.append("name", this.state.car_name);
    formData.append("carimage", this.state.car_img);
    formData.append("specdtl", this.state.specdtl);
    axios
      .post("https://myapp-backend.herokuapp.com/api/admin/create", formData)
      .then((err, res) => {
        if (res) {
          console.log("uploaded");
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
                autoComplete="off"
              >
                <Row>
                  <Col md={12} sm={12}>
                    <Input
                      label="Car Name"
                      placeholder="Car Name"
                      type="text"
                      autoComplete="off"
                      onChange={(e) => {
                        this.setState({ car_name: e.target.value });
                      }}
                    />
                  </Col>

                  <Col md={12} sm={12}>
                    <Input
                      autoComplete="off"
                      label="Car Image"
                      type="file"
                      onChange={(e) => {
                        this.setState({ car_img: e.target.files[0] });
                      }}
                    />
                  </Col>
                  <hr></hr>
                </Row>

                {this.state.inputfield.map((inputfield, index) => (
                  <Row
                    key={index}
                    style={{ backgroundColor: "lightgrey", margin: "10px" }}
                  >
                    <Col md={4} sm={5}>
                      <Input
                        label="Icon"
                        type="file"
                        name="icon"
                        value={this.state.inputfield.firstname}
                        onChange={(event) =>
                          this.HandleChangeInput(index, event)
                        }
                      />
                    </Col>
                    <Col md={4} sm={4}>
                      <Input
                        label="Specification"
                        name="spec"
                        type="text"
                        // value={this.state.inputfield.firstname}
                        onChange={(event) =>
                          this.HandleChangeInput(index, event)
                        }
                      />
                    </Col>
                    <Button
                      onClick={() => this.handleRemovefield(index)}
                      style={{ marginTop: "30px", marginBottom: "20px" }}
                    >
                      remove
                    </Button>
                    <hr></hr>
                  </Row>
                ))}

                <Button
                  onClick={() => this.handleaddfield()}
                  style={{
                    marginTop: "30px",
                    marginBottom: "20px",
                    marginLeft: "30px",
                  }}
                >
                  add Specification
                </Button>

                <Input
                  label="Specification file"
                  type="file"
                  onChange={(e) => {
                    this.setState({ specdtl: e.target.files[0] });
                  }}
                  style={{
                    backgroundColor: "lightgrey",
                    marginLeft: "30px",
                    marginRight: "30px",
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

