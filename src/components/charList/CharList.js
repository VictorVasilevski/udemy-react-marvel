import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {
    const _baseOffset = 9;
    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charsEnded, setCharsEnded] = useState(false);
    const [charSelected, setCharSelected] = useState(null);

    const marvelService = new MarvelService();

    const onCharsLoaded = (newChars) => {
        setChars(chars => [...chars, ...newChars]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + _baseOffset);
        setCharsEnded(newChars.length < _baseOffset);
    }

    const onError = () => {
        console.log('Error');
        setLoading(false);
        setError(true);
    }

    useEffect(() => {
        onRequest()
    }, []);

    const onRequest = (offset) => {
        onLoadMore();
        marvelService
            .getAllCharacters({offset})
            .then(onCharsLoaded)
            .catch(onError);
    }

    const onLoadMore = () => setNewItemLoading(true);

    const cards = useRef([]);

    const onCharCardSelected = (charId) => {
        props.onCharSelected(charId);
        const charIdx = chars.findIndex(c => c.id === charId);
        const newCharSelected = cards.current[charIdx];
        setCharSelected(charSelected => {
            if (charSelected) {
                charSelected.classList.remove('char__item_selected');
                if (charSelected === newCharSelected) return null
            }
            newCharSelected.classList.add('char__item_selected');
            return newCharSelected
        })
    }

    const renderChars = (charsList) => {
        const charsElements = charsList.map((char, i) => {
            return (
                <li className="char__item"
                    tabIndex={0}
                    ref={el => cards.current[i] = el}
                    key={char.id}
                    onClick={() => onCharCardSelected(char.id)}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            onCharCardSelected(char.id)
                        }
                    }}>
                    <img src={char.thumbnail} alt={char.name}/>
                    <div className="char__name">{char.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {charsElements}
            </ul>
        )
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error) ? renderChars(chars) : null;
    
    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {content}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
    

export default CharList;