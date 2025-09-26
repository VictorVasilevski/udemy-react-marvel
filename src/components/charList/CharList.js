import { useState, useEffect, useRef, createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {
    const _baseOffset = 9;
    const [chars, setChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charsEnded, setCharsEnded] = useState(false);
    const [charSelected, setCharSelected] = useState(null);

    const {loading, error, getAllCharacters} = useMarvelService();

    const onCharsLoaded = (newChars) => {
        setChars(chars => [...chars, ...newChars]);
        setNewItemLoading(false);
        setOffset(offset => offset + _baseOffset);
        setCharsEnded(newChars.length < _baseOffset);
    }

    useEffect(() => {
        onRequest(offset, true)
    }, []);

    const onRequest = (offset, initial) => {
        setNewItemLoading(!initial);
        getAllCharacters({offset}).then(onCharsLoaded)
    }

    const cards = useRef([]);

    const onCharCardSelected = (charId) => {
        props.onCharSelected(charId);
        const charIdx = chars.findIndex(c => c.id === charId);
        const newCharSelected = cards.current[charIdx].current;
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
            let nodeRef;
            if (!cards.current[i]) {
                nodeRef = createRef();
                cards.current[i] = nodeRef;
            } else {
                nodeRef = cards.current[i];
            }
            
            
            const itemBaseClassName = "char__item";
            return (
                <CSSTransition 
                    nodeRef={nodeRef}
                    key={char.id}
                    in={true} 
                    timeout={1000} 
                    classNames={itemBaseClassName}
                    mountOnEnter>
                    <li className={itemBaseClassName}
                        tabIndex={0}
                        ref={nodeRef}
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
                </CSSTransition>
            )
        });
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>{charsElements}</TransitionGroup>
            </ul>
        )
    }

    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const renderedChars = renderChars(chars);
    
    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {renderedChars}
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