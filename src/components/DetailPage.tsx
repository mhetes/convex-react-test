import { useParams, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useEffect, useState } from 'react';
import { getEstablishmentDetail, type EstablishmentDetailType } from '../api/ratingsAPI';

const pageStyle = {
    background: "#82C7AF",
    padding: "10px",
    marginLeft: "50px",
    color: "white",
    width: "max-content",
  };

const formatDate = (dt?: string): string => {
    if (!dt)
        return '';
    const date = new Date(dt);
    if (isNaN(date.getTime()))
        return '';
    const iso = date.toISOString();
    const dd = iso.substring(8, 10);
    const mm = iso.substring(5, 7);
    const yy = iso.substring(2, 4);
    return `${dd}/${mm}/${yy}`;
};

const DetailPage = (): JSX.Element => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [error, setError] = useState<{ message: string; [key: string]: string }>();
    const [detail, setDetail] = useState<EstablishmentDetailType | null>(null);

    useEffect(() => {
        if (!id) {
            setError({ message: 'No ID specified' });
            return;
        }
        getEstablishmentDetail(id)
            .then((data) => setDetail(data))
            .catch((e) => setError(e));
    }, [id]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <div>
                <Logo />
                <div style={pageStyle}>
                    {detail ? <div>
                        <table>
                            <tr>
                                <td><strong>Name</strong></td>
                                <td>{detail.BusinessName}</td>
                            </tr>
                            <tr>
                                <td><strong>Type</strong></td>
                                <td>{detail.BusinessType}</td>
                            </tr>
                            <tr>
                                <td><strong>Rating</strong></td>
                                <td>{detail.RatingValue}</td>
                            </tr>
                            <tr>
                                <td><strong>Rating Date</strong></td>
                                <td>{formatDate(detail.RatingDate)}</td>
                            </tr>
                            <tr>
                                <td><strong>Address</strong></td>
                                <td>{detail.AddressLine1}<br />{detail.AddressLine2}<br />{detail.AddressLine3}<br />{detail.AddressLine4}<br /></td>
                            </tr>
                            <tr>
                                <td><strong>Postal Code</strong></td>
                                <td>{detail.PostCode}</td>
                            </tr>
                            <tr>
                                <td><strong>Phone</strong></td>
                                <td>{detail.Phone}</td>
                            </tr>
                        </table>
                    </div> : <h1>Loading...</h1>}
                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        )
    }
};

export default DetailPage;