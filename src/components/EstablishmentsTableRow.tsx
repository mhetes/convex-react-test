import { Link } from "react-router-dom";

const rowStyle: { [key: string]: string | number } = {
  fontSize: "20px",
};

const linkStyle: { [key: string]: string | number } = {
  color: 'teal',
}

export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {
  return (
    <tr style={rowStyle}>
      <td><Link to={'detail/'+establishment?.FHRSID} style={linkStyle}>{establishment?.BusinessName}</Link></td>
      <td>{establishment?.RatingValue}</td>
    </tr>
  );
};
