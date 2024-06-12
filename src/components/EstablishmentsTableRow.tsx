import { Link } from "react-router-dom";
import { type FavoritesType } from "../api/localStorage";
import { type EstablishmentsBase } from "../api/ratingsAPI";

const rowStyle: { [key: string]: string | number } = {
  fontSize: "20px",
};

const linkStyle: { [key: string]: string | number } = {
  color: 'teal',
}

export const EstablishmentsTableRow: React.FC<{
  establishment: EstablishmentsBase;
  favorites: FavoritesType[];
  toggleFavorite: (favorite: FavoritesType) => void;
}> = ({ establishment, favorites, toggleFavorite }) => {
  return (
    <tr style={rowStyle}>
      <td>
        <input
          type='checkbox'
          key={'favchk_' + establishment?.FHRSID}
          checked={favorites.findIndex((f) => f.id === establishment.FHRSID) >= 0}
          onChange={() => toggleFavorite({ id: establishment.FHRSID, name: establishment.BusinessName })}  
        />
        <Link to={'detail/'+establishment?.FHRSID} style={linkStyle}>{establishment.BusinessName}</Link>
      </td>
      <td>{establishment.RatingValue}</td>
    </tr>
  );
};
