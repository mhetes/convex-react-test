const lskCountry = 'convex.nav.country';
const lskAuthority = 'convex.nav.authority';
const lskPageNum = 'convex.nav.pagenum';
const lskFavorites = 'convex.favorites';

export type FavoritesType = {
    id: number;
    name: string;
}

export const getLSPageNum = (): number => {
    const strPageNum = localStorage.getItem(lskPageNum);
    return strPageNum ? Number(strPageNum) : 1;
};

export const setLSPageNum = (pageNum: number): void => {
    localStorage.setItem(lskPageNum, pageNum.toString());
};

export const getLSCountry = (): string => {
    const country = localStorage.getItem(lskCountry);
    return country && !isNaN(Number(country)) ? country : '';
};

export const setLSCountry = (country: string): void => {
    localStorage.setItem(lskCountry, country);
};

export const getLSAuthority = (): string => {
    const authority = localStorage.getItem(lskAuthority);
    return authority && !isNaN(Number(authority)) ? authority : '';
};

export const setLSAuthority = (authority: string): void => {
    localStorage.setItem(lskAuthority, authority);
};

export const listLSFavorites = (): FavoritesType[] => {
    const favoritesStr = localStorage.getItem(lskFavorites);
    // Empty list if no value retrieved
    if (!favoritesStr)
        return [];
    try {
        return JSON.parse(favoritesStr) as FavoritesType[];
    } catch {
        return [];
    }
};

export const toggleLSFavorite = (favorite: FavoritesType): FavoritesType[] => {
    const favorites = listLSFavorites();
    const favIdx = favorites.findIndex((fv) => fv.id === favorite.id);
    if (favIdx < 0)
        favorites.push(favorite);
    else 
        favorites.splice(favIdx, 1);
    localStorage.setItem(lskFavorites, JSON.stringify(favorites));
    return favorites;
};
