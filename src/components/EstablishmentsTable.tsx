import React from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";
import { type FavoritesType } from "../api/localStorage";
import { type EstablishmentsBase } from "../api/ratingsAPI";

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

export const EstablishmentsTable: React.FC<{
  establishments: EstablishmentsBase[] | null | undefined;
  favorites: FavoritesType[];
  toggleFavorite: (favorite: FavoritesType) => void;
}> = ({ establishments, favorites, toggleFavorite }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th style={headerStyle}>Business Name</th>
          <th style={headerStyle}>Rating Value</th>
        </tr>
        {establishments &&
          establishments?.map(
            (
              establishment: EstablishmentsBase,
              index: React.Key | null | undefined
            ) => (
              <EstablishmentsTableRow
                key={index}
                establishment={establishment}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            )
          )}
      </tbody>
    </table>
  );
};

EstablishmentsTable.propTypes = {
  establishments: PropTypes.array,
};
