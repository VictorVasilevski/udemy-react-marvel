import { useState } from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import FindCharForm from "../findCharForm/FindCharForm";

import decoration from '../../resources/img/vision.png';


const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id === selectedChar ? null : id)
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <div className="char__nav">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <FindCharForm/>
                    </ErrorBoundary>
                </div>
                
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
                            
    )
    
}

export default MainPage;