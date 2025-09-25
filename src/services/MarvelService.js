import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const baseUrl = "https://marvel-server-zeta.vercel.app/"
    const _apiKey = "d4eecb0c66dedbfae4eab45d312fc1df";
    const _baseOffset = 0;
    const _baseCharLimit = 9;
    const _baseComicsLimit = 8;

    const getAllCharacters = async ({limit = _baseCharLimit, offset = _baseOffset}) => {
        const res = await request({baseUrl, path: 'characters', queryParams: {offset, limit, apikey: _apiKey}});
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request({baseUrl, path: `characters/${id}`, queryParams: {apikey: _apiKey}});
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

    const getAllComics = async ({limit = _baseComicsLimit, offset = _baseOffset}) => {
        const res = await request({baseUrl, path: 'comics', queryParams: {offset, limit, apikey: _apiKey}});
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request({baseUrl, path: `comics/${id}`, queryParams: {apikey: _apiKey}});
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price,
            pages: comics.pageCount,
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComics}
}

export default useMarvelService;