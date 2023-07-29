import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import NavbarMenu from "./NavbarMenu";
import { ImCross } from "react-icons/im";
import { FaBell } from "react-icons/fa";
import { NavbarData } from "./NavbarData";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import io from "socket.io-client";
import axios from "axios";
const cookie = new Cookies();
const socket = io(`http://localhost:3000`, { query: { token: cookie.get("auth") } });

function Navbar() {
    const [hamburger, setHamburger] = useState(false);
    const [unReadNotificationCount, setUnReadNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const handleHamburger = () => {
        setHamburger(hamburger ? !hamburger : !hamburger);
    };
    useEffect(() => {
        countUnRead();
    }, [notifications]);
    const countUnRead = () => {
        let count = 0;
        notifications.map((noti) => {
            if (!noti.seenFlag) {
                count++;
            }
        });
        setUnReadNotificationCount(count);
    };
    const markSeen = () => {
        axios({
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: cookie.get("auth"),
            },
            url: "http://localhost:3000/user/notification/markseen",
        })
            .then((res) => {
                setNotifications((prev) => prev.map((noti) => ({ ...noti, seenFlag: true })));
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const NavMenu2 = (className) => {
        return (
            <>
                <NavbarHeader className={className}>
                    <NavMenu>
                        {NavbarData.map((item, index) => {
                            return <NavbarMenu item={item} key={index} />;
                        })}
                    </NavMenu>
                </NavbarHeader>
            </>
        );
    };

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: cookie.get("auth"),
            },
            url: "http://localhost:3000/user/notification",
        })
            .then((res) => {
                let response = res.data;
                if (response.status === "success") {
                    setNotifications(response.message);
                } else {
                    console.log(response);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        socket.on("notification", (message) => {
            setNotifications((prev) => [message, ...prev]);
        });

        return () => {
            socket.off("notification");
        };
    }, [notifications]);

    return (
        <>
            <Nav>
                <Hamburger className="hamburger" onClick={handleHamburger}>
                    <GiHamburgerMenu size={25} />
                </Hamburger>
                {NavMenu2()}
                {hamburger && (
                    <HamburgerMenu>
                        <div className="cross">
                            <ImCross size={35} onClick={handleHamburger} />
                        </div>
                        {NavMenu2("hamburgerNav")}
                    </HamburgerMenu>
                )}
                <NotificationBell
                    onClick={() => {
                        setNotificationsOpen(!notificationsOpen);
                        !notificationsOpen && markSeen();
                    }}
                >
                    <FaBell size={20} />
                    {unReadNotificationCount !== 0 && <div className="notification-counter">{unReadNotificationCount}</div>}
                    <div className={`notification-dropdown ${notificationsOpen ? "show" : ""}`}>
                        {notifications.map((notification) => {
                            return (
                                <div className={`notification ${notification.seenFlag ? "read" : ""}`} key={notification["_id"]}>
                                    <h3>{notification.notification.title}</h3>
                                    <p>{notification.notification.body}</p>
                                </div>
                            );
                        })}
                    </div>
                </NotificationBell>
            </Nav>
            {!hamburger && <Outlet />}
        </>
    );
}

export default Navbar;
const Nav = styled.div`
    height: 40px;
    background-color: #0004ff96;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem;
`;
const HamburgerMenu = styled.div`
    background-image: linear-gradient(rgb(6, 97, 185) 20%, rgb(4, 23, 100));
    z-index: 10000000;
    color: black;
    position: absolute;
    height: 100vh;
    inset: 0;
    display: flex;
    flex-direction: column;
    .cross {
        right: 10px;
        top: 10px;
        color: #ffffff;
    }
    div {
        text-align: right;
        padding: 10px;
        svg {
        }
    }
`;
const Hamburger = styled.div`
    display: none;
    @media only screen and (max-width: 1000px) {
        display: block;
    }
`;

const NavbarHeader = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 30px;
    overflow: hidden;
    margin-top: 1;

    @media only screen and (max-width: 1000px) {
        /* display: none; */
        &:not(.hamburgerNav) {
            display: none;
        }

        /* .hamburgerNav {
        } */
    }
`;
const NavMenu = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    ::-webkit-scrollbar {
        width: 16px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }
`;

const NotificationBell = styled.div`
    position: relative;
    .notification-counter {
        min-width: 0.8rem;
        border-radius: 100px;
        background-color: red;
        display: grid;
        font-weight: 500;
        place-items: center;
        position: absolute;
        top: -8px;
        right: -5px;
        scale: 0.6;
        padding: 0px 2px;
        /* 
        
  border-radius: 1em;
  padding: 0px calc(var(--spacing) / 3);
  */
    }
    .notification-dropdown {
        position: absolute;
        top: 2rem;
        right: 0;

        display: none;
        max-height: 400px;
        overflow-y: auto;

        &.show {
            display: flex;
            flex-direction: column;
        }
        .notification {
            height: 100px;
            width: 200px;
            background-color: #949494;
            border: 1px solid black;
        }
        .read {
            background-color: #f1f1f1;
        }
    }
`;
