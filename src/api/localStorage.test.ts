import {
    getLSPageNum,
    setLSPageNum,
    getLSCountry,
    setLSCountry,
    getLSAuthority,
    setLSAuthority,
    listLSFavorites,
    toggleLSFavorite
} from './localStorage';

describe('LocalStorage', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it('get default values from local storage', () => {
        expect(getLSPageNum()).toEqual(1);
        expect(getLSCountry()).toEqual('');
        expect(getLSAuthority()).toEqual('');
        expect(listLSFavorites()).toEqual([]);
    });

    it('update/get from localstorage', () => {
        setLSPageNum(5);
        expect(getLSPageNum()).toEqual(5);
        setLSCountry('123');
        expect(getLSCountry()).toEqual('123');
        setLSAuthority('456');
        expect(getLSAuthority()).toEqual('456');
    });

    it('test favorites in localStorage', () => {
        expect(listLSFavorites()).toEqual([]);
        toggleLSFavorite({ id: 11, name: 'Pizzeria' });
        expect(listLSFavorites()).toEqual([{ id: 11, name: 'Pizzeria' }]);
        toggleLSFavorite({ id: 22, name: 'Fish and Chips' });
        expect(listLSFavorites()).toEqual([{ id: 11, name: 'Pizzeria' }, { id: 22, name: 'Fish and Chips' }]);
        toggleLSFavorite({ id: 11, name: 'Pizzeria' });
        expect(listLSFavorites()).toEqual([{ id: 22, name: 'Fish and Chips' }]);
    });
});