import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <UnauthPage>
            <h1>Unauthorized</h1>
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </UnauthPage>
    );
};

export default Unauthorized;

const UnauthPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100vh;
    h1 {
    }
    div {
        button {
            padding: 8px 14px;
            outline: 0;
            border: 0;
            border-radius: 4px;
            font-weight: bold;
            :hover {
                cursor: pointer;
            }
        }
    }
`;
