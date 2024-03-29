import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    //from submit
    const submitHandler = async (values) => {
        try {
            setLoading(true);
            await axios.post("/users/register", values);
            message.success("Registeration Successfull");
            setLoading(false);
            navigate("/login");
        } catch (error) {
            setLoading(false);
            message.error("something went wrong");
        }
    };

    //prevent for login user
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);
    
    return (
        <>
            <div className="resgister-page ">
                {loading && <Spinner />}
                <Form layout="vertical" onFinish={submitHandler}>
                    <h1>SIGNUP</h1>
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" />
                    </Form.Item>
                    <div>
                        <div>Already Registered? <Link to="/login">Click Here</Link> to Login</div>
                        <div className="button">
                            <button className="btn-reg btn btn-primary">Resgiter</button>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Register;