type Metadata = {
  dataSource: string;
  extractDate: string;
  itemCount: number;
  returncode: string;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
}

type Links = {
  rel: string;
  href: string;
}

export type EstablishmentsType = {
  establishments: {}[];
  meta: Metadata;
  links: Links[];
};

export type CountriesType = {
  countries: {
    id: number;
    name: string;
    nameKey: string;
    code: string;
    links: Links[];
  }[];
  meta: Metadata;
  links: Links[];
};

export type AuthoritiesType = {
  authorities: {
    LocalAuthorityId: number;
    LocalAuthorityIdCode: string;
    Name: string;
    EstablishmentCount: number;
    SchemeType: number;
    links: Links[];
  }[];
  meta: Metadata;
  links: Links[];
}

export function getEstablishmentRatings(
  pageNum: number,
  country?: string,
  authority?: string,
): Promise<EstablishmentsType> {
  let url = `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`;
  if (country || authority) {
    url = `http://api.ratings.food.gov.uk/Establishments?pageNumber=${pageNum}&pageSize=10`;
    if (country)
      url += `&countryId=${country}`;
    if (authority) {
      url += `&localAuthorityId=${authority}`;
    }
  }
  return fetch(
    url,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export function getAllCountries(): Promise<CountriesType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Countries/basic`,
    { headers: { "x-api-version": "2" } },
  ).then((res) => res.json());
}

export function getAllAuthorities(): Promise<AuthoritiesType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Authorities/basic`,
    { headers: { "x-api-version": "2" } },
  ).then((res) => res.json());
}
