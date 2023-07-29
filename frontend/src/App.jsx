import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar/Navbar";
import RequireAuth from "./RequireAuth";
import Unauthorized from "./Unauthorized";
import Post from "./components/Post";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                    <Route path="/app" element={<Navbar />}>
                        <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                            <Route path="createpost" element={<Post />} />
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["User"]} />}>
                            <Route path="viewpost" element={"View post"} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
