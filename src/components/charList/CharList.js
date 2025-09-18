import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
    _baseOffset = 9;
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 0,
        charsEnded: false,
    }

    marvelService = new MarvelService();

    onCharsLoaded = (chars) => {
        let ended = false;
        if (chars.length < this._baseOffset) {
            ended = true;
        }
        this.setState(state => ({
            chars: [...state.chars, ...chars],
            loading: false, 
            newItemLoading: false, 
            offset: state.offset + this._baseOffset,
            charsEnded: ended
        }))
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onLoadMore();
        this.marvelService
            .getAllCharacters({offset})
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    onLoadMore = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    renderChars = (charsList) => {
        const charsElements = charsList.map(char => {
            return (
                <li className="char__item"
                    key={char.id}
                    onClick={() => this.props.onCharSelected(char.id)}>
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

    render = () => {
        const {chars, loading, error, newItemLoading, offset, charsEnded} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? this.renderChars(chars) : null;
        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charsEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}
    

export default CharList;