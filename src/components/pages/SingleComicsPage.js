import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

import './singleComicPage.scss';
import { useEffect, useState } from 'react';

const SingleComicsPage = () => {
    const {comicsId} = useParams();
    const [comics, setComics] = useState(null);
    const {getComics, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        requestComics(comicsId)
    }, []);

    const requestComics = (id) => {
        clearError();
        getComics(id)
            .then(data => setComics(data))
            .then(() => setProcess('confirmed'))
    }

    const renderContent = () => {
        const {title, description, thumbnail, price, pages} = comics;
        return (
            <div className="single-comic">
                <img src={thumbnail} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pages + ' pages'}</p>
                    <p className="single-comic__descr">Language: en-us</p>
                    <div className="single-comic__price">{price + '$'}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        )
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, renderContent)}
        </>
    )
}

export default SingleComicsPage;