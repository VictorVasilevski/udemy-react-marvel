import {lazy, Suspense, useRef} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import TransitionComponent from "../transition/Transition";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicsPage = lazy(() => import('../pages/SingleComicsPage'));
const SingleCharPage = lazy(() => import('../pages/SingleCharPage'));

const App = () => {
    const mainPageRef = useRef();
    const comicsPageRef = useRef();
    const singleComicsPageRef = useRef();
    const SingleCharPageRef = useRef();

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            {/* Characters */}
                            <Route 
                                path="/" 
                                element={
                                    <TransitionComponent nodeRef={mainPageRef}>
                                        <MainPage/>
                                    </TransitionComponent>
                                }></Route>
                            <Route
                                path="/characters/:charId"
                                element={
                                    <TransitionComponent nodeRef={SingleCharPageRef}>
                                        <SingleCharPage/>
                                    </TransitionComponent>
                                }></Route>
                            {/* Comics */}
                            <Route 
                                path="/comics" 
                                element={
                                    <TransitionComponent nodeRef={comicsPageRef}>
                                        <ComicsPage/>
                                    </TransitionComponent>
                                }></Route>
                            <Route 
                                path="/comics/:comicsId" 
                                element={
                                    <TransitionComponent nodeRef={singleComicsPageRef}>
                                        <SingleComicsPage/>
                                    </TransitionComponent>
                                }></Route>
                            <Route 
                                path="*" 
                                element={
                                    <TransitionComponent>
                                        <Page404/>
                                    </TransitionComponent>
                                }></Route>
                            </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;