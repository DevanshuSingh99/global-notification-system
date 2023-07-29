import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";

const NavbarMenu = ({ item }) => {
    const cookie = new Cookies();
    const userRole = cookie.get("role");
    return (
        <>
            {item.roles?.includes(userRole) && (
                <>
                    <SidebarLink to={item.path} target={item.target} rel={item.target ? "noreferrer noopener" : null}>
                        <div>
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </div>
                    </SidebarLink>
                </>
            )}
        </>
    );
};

export default NavbarMenu;

const SidebarLink = styled(Link)`
    display: flex;
    color: rgba(255, 255, 255, 0.8);

    justify-content: space-between;
    align-items: center;
    list-style: none;
    height: 35px;
    text-decoration: none;
    font-size: 18px;
    border-radius: 5px;
    padding: 5px;
    transition: background 0.3s ease-in-out;
    &:hover {
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
    }
`;

const SidebarLabel = styled.span`
    margin-left: 16px;
`;
