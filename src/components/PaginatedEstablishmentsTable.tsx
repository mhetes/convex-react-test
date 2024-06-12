import { useState, useEffect } from "react";
import { DropDownSelect } from './DropDownSelect';
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { EstablishmentsBase, getEstablishmentRatings } from "../api/ratingsAPI";
import { getCountriesDS, getAuthoritiesDS, type DataSource } from '../api/dataSource';
import {
  getLSPageNum,
  setLSPageNum,
  getLSCountry,
  setLSCountry,
  getLSAuthority,
  setLSAuthority,
  listLSFavorites,
  toggleLSFavorite,
  FavoritesType,
} from '../api/localStorage';

const tableStyle = {
  background: "#82C7AF",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
};

export const PaginatedEstablishmentsTable = () => {
  const [error, setError] =
    useState<{ message: string; [key: string]: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [establishments, setEstablishments] = useState<EstablishmentsBase[]>([]);
  const [pageNum, setPageNum] = useState(getLSPageNum());
  const [pageCount] = useState(100);
  const [countries, setCountries] = useState<DataSource[] | null>(null);
  const [authorities, setAuthorities] = useState<DataSource[] | null>(null);
  const [country, setCountry] = useState<string>(getLSCountry());
  const [authority, setAuthority] = useState<string>(getLSAuthority());
  const [favorites, setFavorites] = useState<FavoritesType[]>(listLSFavorites());

  useEffect(() => {
    getCountriesDS()
      .then((data) => setCountries(data))
      .catch((e) => console.error(e));
    getAuthoritiesDS()
      .then((data) => setAuthorities(data))
      .catch((e) => console.error(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    getEstablishmentRatings(pageNum, country, authority).then(
      (result) => {
        setEstablishments(result?.establishments);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }, [pageNum, country, authority]);

  function handlePreviousPage() {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
      setLSPageNum(pageNum - 1);
    }
  }

  function handleNextPage() {
    if (pageNum < pageCount) {
      setPageNum(pageNum + 1);
      setLSPageNum(pageNum + 1);
    }
  }

  function handleChangeCountry(id: string) {
    setCountry(id);
    setPageNum(1);
    setLSCountry(id);
    setLSPageNum(1);
  }

  function handleChangeAuthority(id: string) {
    setAuthority(id);
    setPageNum(1);
    setLSAuthority(id);
    setLSPageNum(1);
  }

  function handleSearchReset() {
    setCountry('');
    setAuthority('');
    setPageNum(1);
    setLSCountry('');
    setLSAuthority('');
    setLSPageNum(1);
  }

  function handleToggleFavorite(favorite: FavoritesType) {
    const favorites = toggleLSFavorite(favorite);
    setFavorites(favorites);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div style={tableStyle}>
        <h2>Food Hygiene Ratings</h2>
        <DropDownSelect
          key='rt_countries'
          defaultName='-- ALL COUNTRIES --'
          data={countries}
          disabled={loading}
          onChange={handleChangeCountry}
          selected={country}
        />
        <DropDownSelect
          key='rt_authorities'
          defaultName='-- ALL AUTHORITIES --'
          data={authorities}
          disabled={loading}
          onChange={handleChangeAuthority}
          selected={authority}
        />
        <button
          disabled={loading}
          onClick={handleSearchReset}
        >Reset search...</button>
        {loading ? <h3>Loading...</h3> : <EstablishmentsTable establishments={establishments} favorites={favorites} toggleFavorite={handleToggleFavorite} />}
        <EstablishmentsTableNavigation
          pageNum={pageNum}
          pageCount={pageCount}
          disabled={loading}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
        <h1>Favorites:</h1>
        <table>
          <thead>
            <td>Name</td>
            <td>Remove</td>
          </thead>
          {favorites.map((fav) => {
            return (
              <tr>
                <td>{fav.name}</td>
                <td><button onClick={() => { handleToggleFavorite(fav); }}>Remove</button></td>
              </tr>
            )
          })}
        </table>
      </div>
    );
  }
};
