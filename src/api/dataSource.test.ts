import { enableFetchMocks } from "jest-fetch-mock";
import { getCountriesDS, getAuthoritiesDS } from "./dataSource";
import fetch from "jest-fetch-mock";

const countriesRes = {
    "countries": [
        {
            "id": 1,
            "name": "England",
            "nameKey": "England",
            "code": "",
            "links": [
                {
                    "rel": "self",
                    "href": "http://api.ratings.food.gov.uk/countries/1"
                }
            ]
        },
        {
            "id": 2,
            "name": "Northern Ireland",
            "nameKey": "Northern Ireland",
            "code": "",
            "links": [
                {
                    "rel": "self",
                    "href": "http://api.ratings.food.gov.uk/countries/2"
                }
            ]
        },
        {
            "id": 3,
            "name": "Scotland",
            "nameKey": "Scotland",
            "code": "",
            "links": [
                {
                    "rel": "self",
                    "href": "http://api.ratings.food.gov.uk/countries/3"
                }
            ]
        },
        {
            "id": 4,
            "name": "Wales",
            "nameKey": "Wales",
            "code": "",
            "links": [
                {
                    "rel": "self",
                    "href": "http://api.ratings.food.gov.uk/countries/4"
                }
            ]
        }
    ],
};

const authoritiesRes = {
    "authorities": [
        {
            "LocalAuthorityId": 197,
            "LocalAuthorityIdCode": "760",
            "Name": "Aberdeen City",
            "EstablishmentCount": 2169,
            "SchemeType": 2,
            "links": [
                {
                    "rel": "self",
                    "href": "http://api.ratings.food.gov.uk/authorities/197"
                }
            ]
        },
        {
            "LocalAuthorityId": 198,
            "LocalAuthorityIdCode": "761",
            "Name": "Aberdeenshire",
            "EstablishmentCount": 2500,
            "SchemeType": 2,
            "links": [
                {
                    "rel": "self",
                    "href": "http://api.ratings.food.gov.uk/authorities/198"
                }
            ]
        },
        {
            "LocalAuthorityId": 277,
            "LocalAuthorityIdCode": "323",
            "Name": "Adur",
            "EstablishmentCount": 439,
            "SchemeType": 1,
            "links": [
                {
                    "rel": "self",
                    "href": "http://api.ratings.food.gov.uk/authorities/277"
                }
            ]
        },
        {
            "LocalAuthorityId": 48,
            "LocalAuthorityIdCode": "062",
            "Name": "Amber Valley",
            "EstablishmentCount": 1100,
            "SchemeType": 1,
            "links": [
                {
                    "rel": "self",
                    "href": "http://api.ratings.food.gov.uk/authorities/48"
                }
            ]
        },
    ],
};

const countriesDs = [
    {
        id: '1',
        name: 'England',
    },
    {
        id: '2',
        name: 'Northern Ireland',
    },
    {
        id: '3',
        name: 'Scotland',
    },
    {
        id: '4',
        name: 'Wales',
    },
];

const authoritiesDs = [
    {
        id: '197',
        name: 'Aberdeen City',
    },
    {
        id: '198',
        name: 'Aberdeenshire',
    },
    {
        id: '277',
        name: 'Adur',
    },
    {
        id: '48',
        name: 'Amber Valley',
    },
];

enableFetchMocks();

describe('DataSource', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('call countries api and return dataSource', async () => {
        fetch.mockResponseOnce(JSON.stringify(countriesRes));
        const res = await getCountriesDS();
        expect(res).toEqual(countriesDs);
    });

    it('call authorities api and return dataSource', async () => {
        fetch.mockResponseOnce(JSON.stringify(authoritiesRes));
        const res = await getAuthoritiesDS();
        expect(res).toEqual(authoritiesDs);
    });
});
