import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = (props) => {
    const _baseOffset = 8;
    const [comics, setComics] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const {getAllComics, process, setProcess} = useMarvelService();

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
        getAllComics({offset})
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'));
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

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comics), newItemsLoading)}
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