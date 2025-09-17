import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    onCharsLoaded = (chars) => {
        this.setState({chars, loading: false})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    componentDidMount = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    renderChars = (charsList) => {
        const charsElements = charsList.map(char => {
            return (
                <li className="char__item"
                    key={char.id}>
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
        const {chars, loading, error} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? this.renderChars(chars) : null;
        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}
    

export default CharList;