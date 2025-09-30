import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';

import './findCharForm.scss'

const FindCharForm = () => {
    const [charInfo, setCharInfo] = useState(null);
    const {loading, getAllCharacters, clearError} = useMarvelService();

    const onSubmit = (name) => {
        clearError();
        getAllCharacters({params: {name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}}).then(data => setCharInfo(data));
    }

    const reset = (name) => {
        if (!name) {
            setCharInfo(null);
        }
    }

    const validationString = !charInfo ? null : charInfo.length > 0 ?
        <div className="char__search-validation">
            <div className='char__search-success'>There is! Visit {charInfo[0].name} page?</div>
            <Link to={`characters/${charInfo[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className='char__search-failure'>The character was not found. Check the name and try again.</div>

    return (
        <Formik
            initialValues={{
                name: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string().required('This field is required')
            })}
            onSubmit={(values) => onSubmit(values.name)}
            >
                <Form className="char__search">
                    <div className='name-container'>
                        <div className='input-container'>
                            <label htmlFor='name'>Or find a character by name:</label>
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter name"
                                onBlur={(values) => reset(values.name)} />
                        </div>
                        <button type="submit" className="button button__main" disabled={loading}>
                            <div className="inner">FIND</div>
                        </button>
                    </div>
                    {validationString}
                </Form>
            </Formik>
    )
}

export default FindCharForm;