import React, { Component } from "react";
import { Button, Alert, Row, Col, Container, Card, CardBody, CardTitle } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerError: ""
    };
  }

  handleSubmit = async (event, values) => {
    const { name, email, password } = values;
    this.setState({ registerError: "" });
    try {
      const response = await axios.post("/auth/signup", { name, email, password });
      if (response.status === 201) {
        // Redirect or show success message
        if (this.props.history) {
          this.props.history.push("/login");
        } else {
          window.location.href = "/login";
        }
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        this.setState({ registerError: err.response.data.message });
      } else {
        this.setState({ registerError: "Registration failed" });
      }
    }
  };

  render() {
    const { registerError } = this.state;

    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md="6" lg="5">
            <Card>
              <CardBody>
                <CardTitle tag="h3" className="text-center mb-4">Register</CardTitle>
                {registerError && (
                  <Alert color="danger">
                    <strong>Failed to register!</strong> {registerError}
                  </Alert>
                )}
                <AvForm onValidSubmit={this.handleSubmit}>
                  <AvField
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="Your name"
                    required
                    errorMessage="A name is required!"
                    autoFocus
                  />
                  <AvField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Your email"
                    required
                    errorMessage="A valid email is required!"
                  />
                  <AvField
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Your password"
                    required
                    errorMessage="Password cannot be empty!"
                  />
                  <Button color="primary" type="submit" block>
                    Register
                  </Button>
                </AvForm>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;