import React from "react";
import axios from 'axios';


import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI";

class Signup extends React.Component {

    constructor(props){

          super(props)

          this.state = { firstname : "",  lastname : "",  email : "",  password : "" }
          this.state1 = {msg:""}
    }

    signup = (e) => {

         e.preventDefault()
         axios.post("https://myapp-backend.herokuapp.com/api/admin/signup", this.state).then((res)=>{
             if(res){
              alert("added")
              window.location.href = "/signin";
             }else{
               this.setState1({msg:"incorrect password"})
				window.location.href = "/signup";
             }
         })
      };

  render() {
    return (
      <>
        <Layout>
          <Container>
            <Row style={{ marginTop: "50px" }}>
              <Col md={{ span: 6, offset: 3 }}>
                <Form onSubmit={(e) => this.signup(e)}>
                  <Row>
                    <Col md={6}>
                      <Input
                        autocomplete="off"
                        label="first Name"
                        placeholder="first name"
                     
                        type="text"
                        onChange={(e) => {this.setState({firstname : e.target.value})}}
                      />
                    </Col>

                    <Col md={6}>
                      <Input
                        autocomplete="off"
                        label="Last Name"
                        placeholder="last name"
                    
                        type="text"
                        onChange={(e) => {this.setState({lastname : e.target.value})}}
                      />
                    </Col>
                  </Row>

                  <Input
                    label="Email address"
                    placeholder="Enter email"
                    autocomplete="off"
                    type="email"
                    errorMessage=" We'll never share your email with anyone else"
                    onChange={(e) => {this.setState({email : e.target.value})}}
                  />

                  <Input
                    label="Password"
                    autocomplete="off"
                    placeholder="Enter Password"
                    errorMessage={this.state1.msg}
                    type="password"
                    onChange={(e) => {this.setState({password : e.target.value})}}
                  />

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>

                </Form>
              </Col>
            </Row>
          </Container>
        </Layout>
      </>
    );
  }
}
export default Signup;
