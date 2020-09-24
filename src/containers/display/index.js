import React from "react";
import { Container, Table } from "react-bootstrap";
import Layout from "../../components/Layout";
import axios from "axios";
// import { ExcelRenderer, OutTable } from "react-excel-renderer"

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      specification: [],
      cardata: [],
      carName: "Mercedes-bens-c220d",
    };
  }

  fileHandler = (fileObj) => {
    let final_data = [];

    const categaryis = [
      "Body Type",
      "Engine & Transmission",
      "Hybrid System",
      "Performance & Efficiency",
      "Exterior Equipment",
      "Interior Equipment",
      "Seats & Upholstery",
      "Entertainment Front",
      "Entertainment Rear",
      "Safety Equipments",
      "Suspension, Brakes, Wheels & Tires",
      "Dimensions, Weight, Storage, Capacity",
      "Warranty & Service Package",
      "Exterior Colours",
    ];

    let temp = [];
    let second = "";
    fileObj.map((data) => {
      let first = data["Feature List / Models"];

      if (categaryis.includes(data["Feature List / Models"])) {
        final_data.push({ type: second, spec: temp });
        temp = [];
        second = first;
      } else {
        first = "";
        temp.push({
          spec: data["Feature List / Models"],
          value:
            data["C 220d Progressive"] !== undefined
              ? data["C 220d Progressive"]
              : "Na",
        });
      }
    });
    final_data.shift();
    final_data.shift();

    console.log(final_data);

    this.setState({ specification: final_data });
  };

  async componentDidMount() {
    const cardata = await axios.get('https://myapp-backend.herokuapp.com/api/getcar');
    this.setState({cardata:cardata.data.data})
    const res = await axios.get("https://myapp-backend.herokuapp.com/getfile/kHjSiPeHk6_Mercedes.xlsx");
    this.fileHandler(res.data);
  }

  render() {
    return (
      <>
        <Layout>
          <Container>
            <br />

            <h1>{this.state.carName}</h1>
            <img
              src="https://cdn.bigboytoyz.com/products/resized/61FA25EA-450B-4B1D-BA46-6CB3C7427336.jpeg"
              style={{ width: "600px", height: "300px" }}
              alt=""
            />
            <br />
            <br />

            <h1>Genric Specification </h1>
            <br></br>

            {this.state.specification.map((res, index) => (
              <>
                <h4 style={{ color: "red" }}>{res.type}</h4>

                <Table bordered>
                  <tbody>
                    {res.spec.map((col, colindex) => (
                      <tr>
                        <td>{col.spec}</td>
                        <td>{col.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ))}
          </Container>
        </Layout>
      </>
    );
  }
}

export default Signin;

