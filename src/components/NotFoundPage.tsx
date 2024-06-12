import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const pageStyle = {
    background: "#82C7AF",
    padding: "10px",
    marginLeft: "50px",
    color: "white",
    width: "max-content",
  };

const NotFoundPage = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <div>
            <Logo />
            <div style={pageStyle}>
                <h1>Page Not Found</h1>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
            
        </div>
    )
};

export default NotFoundPage;
