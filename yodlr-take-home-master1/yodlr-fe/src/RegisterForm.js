import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { createUser } from './actions/users';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const initialState = {
        firstName: "",
        lastName: "",
        email: ""
    };
    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(createUser(formData));
            setFormData(initialState);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="firstName">First name</Label>
                            <Input type="text" name="firstName" id="firstName" onChange={handleChange} value={formData.firstName} required />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="lastName">Last name</Label>
                            <Input type="text" name="lastName" id="lastName" onChange={handleChange} value={formData.lastName} required />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" onChange={handleChange} value={formData.email} required />
                </FormGroup>

                <Button>Sign in</Button>
            </Form>
        </div>
    );
};

export default RegisterForm;