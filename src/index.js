import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainPage from "./HousingSearch/MainPage";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {houseReducer} from "./HousingSearch/Redux/Reducers";


const store = createStore(houseReducer);

let rerenderFunc = () => {
    ReactDOM.render(<Provider store={store}>
        <MainPage/>
    </Provider>, document.getElementById('root'));
};

rerenderFunc();

store.subscribe(() => {
    rerenderFunc();
});

