import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState();
    const cookie = new Cookies();
    const navigate = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();
        console.log(username);
        await axios({
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            url: "http://localhost:3000/user/login",
            data: { username },
        }).then((res) => {
            let response = res.data;
            if (response.status === "success") {
                cookie.set("auth", response.message.token);
                cookie.set("role", response.message.role);
                navigate("/app");
            } else {
                console.log(response);
            }
        });
    };
    const onRegister = async (e) => {
        e.preventDefault();
        await axios({
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            url: "http://localhost:3000/user/register",
            data: { username },
        }).then((res) => {
            let response = res.data;
            if (response.status === "success") {
                console.log(response);
            } else {
                console.log(response);
            }
        });
    };

    return (
        <Container>
            <LoginContainer>
                <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" name="username" id="Username" value={username} required />
                <button onClick={onLogin}>Login</button>
                <button onClick={onRegister}>Register</button>
            </LoginContainer>
        </Container>
    );
}

export default Login;

const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
`;
