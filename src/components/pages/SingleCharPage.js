import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

import './singleCharPage.scss';
import { useEffect, useState } from 'react';

const SingleCharPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const {getCharacter, clearError, process ,setProcess} = useMarvelService();

    useEffect(() => {
        requestCharacter()
    }, []);

    const requestCharacter = () => {
        clearError();
        getCharacter(charId)
            .then(data => setChar(data))
            .then(() => setProcess('confirmed'))
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

    return (
        <>
            <AppBanner/>
            {setContent(process, renderContent)}
        </>
    )
}

export default SingleCharPage;