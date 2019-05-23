import React from 'react';
import './AppStyles.css';
import SearchingPanel from "./SearchingPanel";
import HousesList from "./HousesList";
import fetchJsonp from "fetch-jsonp";
import HouseInfo from "./HouseInfo";
import {BrowserRouter, Route} from "react-router-dom";
import FavouritesHouses from "./FavouritesHouses";
import {createStore} from "redux";
import {houseReducer} from "./Redux/Reducers";
import {
    addMoreHouses, addNewHousesList, addToFavourList,
    clearFavList,
    createHousesList,
    inputTextChange,
    pageNumberChange,
    showHousesList, showMoreInfo
} from "./Redux/Actions";


class MainPage extends React.Component {

    constructor() {
        super();

        this.store = createStore(houseReducer);
        let state = this.store.getState();
        this.state = state;

        this.store.subscribe(() => {
            let state = this.store.getState();
            this.setState(state);
        });

    }

    searchInputTextChange(input) {
        this.store.dispatch(inputTextChange(input));
    }

    didMountAddRequest() {
        let page = this.state.pageNumber;
        ++page;

        this.addMoreHouses('https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=rent&place_name='
            + this.state.inputText + '&number_of_results=10&page=' + page);

        this.store.dispatch(pageNumberChange(page));
    }

    addMoreHouses(url) {
        fetchJsonp(url)
            .then((response)=> response.json())
            .then((obj) => obj.response.listings)
            .then((moreHousesArray) => this.store.dispatch(addMoreHouses(moreHousesArray)))
            .then(() => this.addNewHousesList());
    }

    addNewHousesList() {
        let moreList = [...this.state.moreHousesArray];
        let fullList = [...this.state.housesArray];
        for (let i = 0; i < moreList.length; i++){
            fullList.push(moreList[i])
        }
        this.store.dispatch(addNewHousesList(fullList));
    }

    showMoreInfo(id) {
        let arr = [...this.state.housesArray];
        for (let i = 0; i < arr.length; i++){
            if (i === +id) {
                let elem = arr[i];
                this.store.dispatch(showMoreInfo(elem, id));
            }
        }
    }

    addToFavourList(id) {
        let arr = [...this.state.housesArray];
        let favourArr = [...this.state.favourHouses];
        for (let i = 0; i < arr.length; i++){
            if (i === +id) {
                favourArr.push(arr[i]);
            }
        }
        this.store.dispatch(addToFavourList(favourArr));
    }

    clearFavourList() {
        this.store.dispatch(clearFavList());
    }

    didMount() {
        if(this.state.searchInputText !== "") {
            this.searchHousesInTown('https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=rent&place_name='
                + this.state.searchInputText + '&number_of_results=10&page=1');
        }
    }

    searchHousesInTown(url) {

        fetchJsonp(url)
            .then((response)=> response.json())
            .then((obj) => obj.response.listings)
            .then((housesList) => this.store.dispatch(createHousesList(housesList)))
            .then(() => this.createHousesList());

    }

    createHousesList() {
        let inputText = this.state.searchInputText;
        let arrList = [...this.state.housesList];
        this.store.dispatch(showHousesList(inputText, arrList));
    }

    render() {

        return (
            <BrowserRouter>
                <div>
                    <SearchingPanel onInput={this.searchInputTextChange.bind(this)}
                                    onDidMount={this.didMount.bind(this)}
                                    searchInputText={this.state.searchInputText}
                                    count={this.state.count}/>
                    <Route exact path="/" render={()=><HousesList
                        housesList={this.state.housesArray}
                        arrayBuild={this.state.arrayBuild}
                        inputText={this.state.inputText}
                        mountRequest={this.didMountAddRequest.bind(this)}
                        showMoreInfo={this.showMoreInfo.bind(this)}/>} />
                    <Route exact path="/houseinfo" render={()=><HouseInfo
                        needHouse={this.state.needHouse}
                        id={this.state.elemId}
                        addToFavour={this.addToFavourList.bind(this)}/>}/>
                    <Route exact path="/favourlist" render={()=><FavouritesHouses
                        favourHouses={this.state.favourHouses}
                        clearFavour={this.clearFavourList.bind(this)}/>}/>
                </div>
            </BrowserRouter>
        );
    }


}

export default MainPage;