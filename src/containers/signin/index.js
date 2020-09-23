import React from "react";
import { Container, Form, Button, Row, Col} from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI";
import axios from 'axios'


class Signin extends React.Component {

constructor(props){
  super(props)

  this.state = {
    email:"",
    password:""
  }
}


loginform = (e) => {

  e.preventDefault()

    axios.post("http://localhost:2000/api/admin/signin", this.state).then((res)=>{
      if(res){

        window.location.href = "/add-new";

      }else{
        window.location.href = "/signup";
      }
  })
};





  render(){
    return (
      <>
       <Layout>
         <Container>
         <Row style={{marginTop:'50px'}}>
            <Col md={{span:6, offset:3 }}>
           
            <Form  onSubmit={(e) => this.loginform(e)} autocomplete="off">
            <Input
                    label = "Email address"
                    placeholder = "Enter email"
                    autocomplete="off"
                    type="email"
                  
                    onChange={(e) => {this.setState({email : e.target.value})}}
                />

                <Input
                    label="Password"
                    placeholder="Enter Password"
                    autocomplete="off"
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
export default Signin;
