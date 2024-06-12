import { useState, useEffect } from "react";
import { DropDownSelect } from './DropDownSelect';
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { getEstablishmentRatings } from "../api/ratingsAPI";
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
  const [establishments, setEstablishments] = useState<
    { [key: string]: string }[]
  >([]);
  const [pageNum, setPageNum] = useState(getLSPageNum());
  const [pageCount] = useState(100);
  const [countries, setCountries] = useState<DataSource[] | null>(null);
  const [authorities, setAuthorities] = useState<DataSource[] | null>(null);
  const [country, setCountry] = useState<string>(getLSCountry());
  const [authority, setAuthority] = useState<string>(getLSAuthority());

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
        {loading ? <h3>Loading...</h3> : <EstablishmentsTable establishments={establishments} />}
        <EstablishmentsTableNavigation
          pageNum={pageNum}
          pageCount={pageCount}
          disabled={loading}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </div>
    );
  }
};
