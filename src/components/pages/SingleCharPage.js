import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

import './singleCharPage.scss';
import { useEffect, useState } from 'react';

const SingleCharPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        requestCharacter()
    }, []);

    const requestCharacter = () => {
        clearError();
        getCharacter(charId).then(data => setChar(data))
    }

    const renderContent = () => {
        const {name, description, thumbnail} = char;
        return (
            <div className="single-char">
                <img src={thumbnail} alt="name" className='single-char__img'/>
                <div className="single-char__info">
                    <h2 className="single-char__name">{name}</h2>
                    <p className="single-char__descr">{description}</p>
                </div>
            </div>
        )
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = char && !(loading || error) ? renderContent() : null;

    return (
        <>
            <AppBanner/>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

export default SingleCharPage;