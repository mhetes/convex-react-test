import { enableFetchMocks } from "jest-fetch-mock";
import { getEstablishmentRatings, getAllCountries, getAllAuthorities, getEstablishmentDetail } from "./ratingsAPI";
import fetch from "jest-fetch-mock";

enableFetchMocks();

describe("Ratings API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("call the ratings api with the provided page number and returns the data", async () => {
    // Given
    let pageNum = 1;
    let expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));
    // When
    let actual = await getEstablishmentRatings(pageNum);

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`
    );
  });

  it('call the ratings api with page number and also country & authority', async () => {
    // Prepare
    const pageNumber = 1;
    const country = '3';
    const authority = '210';
    const expected = { edinburgh: 'establishments' }
    fetch.mockResponseOnce(JSON.stringify(expected));
    // Run
    const actual = await getEstablishmentRatings(pageNumber, country, authority);
    // Test
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Establishments?pageNumber=1&pageSize=10&countryId=3&localAuthorityId=210`
    );
  });

  it('call the countries list api', async () => {
    const expected = { countries: 'list' };
    fetch.mockResponseOnce(JSON.stringify(expected));
    const actual = await getAllCountries();
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(`http://api.ratings.food.gov.uk/Countries/basic`);
  });

  it('call authorities list api', async () => {
    const expected = { authorities: 'list' };
    fetch.mockResponseOnce(JSON.stringify(expected));
    const actual = await getAllAuthorities();
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(`http://api.ratings.food.gov.uk/Authorities/basic`);
  });

  it('calls establishment detail api', async () => {
    const establishmentId = '123';
    const expected = { establishment: 'detail' };
    fetch.mockResponseOnce(JSON.stringify(expected));
    const actual = await getEstablishmentDetail(establishmentId);
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(`http://api.ratings.food.gov.uk/Establishments/${establishmentId}`);
  });
});
