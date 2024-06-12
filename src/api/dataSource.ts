import { getAllCountries, getAllAuthorities } from './ratingsAPI';

export type DataSource = {
    id: string;
    name: string;
};

export const getCountriesDS = async (): Promise<DataSource[]> => {
    const countriesRes = await getAllCountries();
    return countriesRes.countries.map((c) => {
        return {
            id: c.id.toString(),
            name: c.name,
        };
    });
};

export const getAuthoritiesDS = async (): Promise<DataSource[]> => {
    const authoritiesRes = await getAllAuthorities();
    return authoritiesRes.authorities.map((a) => {
        return {
            id: a.LocalAuthorityId.toString(),
            name: a.Name,
        };
    });
};