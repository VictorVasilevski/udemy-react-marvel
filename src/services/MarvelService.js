class MarvelService {
    _baseUrl = "https://marvel-server-zeta.vercel.app/"
    _apiKey = "d4eecb0c66dedbfae4eab45d312fc1df";

    getResource = async (path) => {
        const url = `${this._baseUrl}${path}?limit=9&apikey=${this._apiKey}`;
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch resource ${url}. Status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('characters');
        console.log(res);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`characters/${id}`);
        console.log(res);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }
}

export default MarvelService;