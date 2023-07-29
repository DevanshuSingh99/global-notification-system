import Cookies from "universal-cookie";
import axios from "axios";
import { useState } from "react";

export default function Post() {
    const cookie = new Cookies();
    const token = cookie.get("auth");
    const [title, setTitle] = useState("");

    async function handleFormSubmit(event) {
        event.preventDefault();

        axios({
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token,
            },
            url: "http://localhost:3000/post/createpost",
            data: { title },
        })
            .then((res) => {
                let response = res.data;
                if (response.status === "success") {
                    console.log(response.message);
                } else {
                    console.log(response);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <button type="submit">Create Post</button>
        </form>
    );
}
