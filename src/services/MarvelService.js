import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const baseUrl = "https://marvel-server-zeta.vercel.app/"
    const _apiKey = "d4eecb0c66dedbfae4eab45d312fc1df";
    const _baseOffset = 0;
    const _baseLimit = 9;

    const getAllCharacters = async ({limit = _baseLimit, offset = _baseOffset}) => {
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

    return {loading, error, clearError, getAllCharacters, getCharacter}
}

export default useMarvelService;