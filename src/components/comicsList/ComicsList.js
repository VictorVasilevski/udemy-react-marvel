import { useEffect, useState, useRef, use } from 'react';
import { Link } from 'react-router-dom';

import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = (props) => {
    const _baseOffset = 8;
    const [comics, setComics] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const {loading, error, getAllComics} = useMarvelService();

    const onComicsLoaded = (newComics) => {
        setComics(comics => [...comics, ...newComics]);
        setOffset(offset => offset + newComics.length);
        setNewItemsLoading(false);
        setComicsEnded(newComics.length < _baseOffset);
    }

    useEffect(() => {
        onRequest(offset, true)
    }, []);

    const onRequest = (offset, initial) => {
        setNewItemsLoading(!initial);
        getAllComics({offset}).then(onComicsLoaded);
    }

    const onLoadMore = () => {
        setNewItemsLoading(true);
        onRequest(offset, false);
    }

    const renderItems = (comicsData) => {
        const cards = comicsData.map(item => {
            return (
                <li 
                    key={item.id}
                    className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{`${item.price}$`}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {cards}
            </ul>
        )
    }

    const spinner = loading && !newItemsLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = renderItems(comics);
    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {content}
            <button 
                onClick={onLoadMore}
                disabled={newItemsLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;