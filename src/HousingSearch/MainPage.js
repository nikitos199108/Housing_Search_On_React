import React from 'react';
import './AppStyles.css';
import SearchingPanel from "./SearchingPanel";
import HousesList from "./HousesList";
import fetchJsonp from "fetch-jsonp";
import HouseInfo from "./HouseInfo";
import {BrowserRouter, Route} from "react-router-dom";
import FavouritesHouses from "./FavouritesHouses";
import {
    addMoreHouses, addNewHousesList,
    createHousesList,
    inputTextChange,
    pageNumberChange,
    showHousesList,
} from "./Redux/Actions";
import {connect} from "react-redux";


class MainPage extends React.Component {

    didMountAddRequest() {
        let page = this.props.pageNumber;
        ++page;

        this.addMoreHouses('https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=rent&place_name='
            + this.props.inputText + '&number_of_results=10&page=' + page);

        this.props.pageNumberChangeDispatch(page);
    }

    addMoreHouses(url) {
        fetchJsonp(url)
            .then((response)=> response.json())
            .then((obj) => obj.response.listings)
            .then((moreHousesArray) => this.props.addMoreList(moreHousesArray))
            .then(() => this.addNewHousesList());
    }

    addNewHousesList() {
        let moreList = [...this.props.moreHousesArray];
        let fullList = [...this.props.housesArray];
        for (let i = 0; i < moreList.length; i++){
            fullList.push(moreList[i])
        }
        for(let i = 0; i < fullList.length; i++) {
            fullList[i].id = i;
        }

        this.props.addNewHousesListDispatch(fullList);
    }

    didMount() {
        if(this.props.searchInputText !== "") {
            this.searchHousesInTown('https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=rent&place_name='
                + this.props.searchInputText + '&number_of_results=10&page=1');
        }
    }

    searchHousesInTown(url) {

        fetchJsonp(url)
            .then((response)=> response.json())
            .then((obj) => obj.response.listings)
            .then((housesList) => this.props.addList(housesList))
            .then(() => this.createHousesList());

    }

    createHousesList() {
        let inputText = this.props.searchInputText;
        let arrList = [...this.props.housesList];
        for(let i = 0; i < arrList.length; i++) {
            arrList[i].id = i;
        }

        this.props.showHousesListDispatch(inputText, arrList);

    }


    render() {

        return (
            <BrowserRouter>
                <div>
                    <SearchingPanel onInput={this.props.searchInputTextChange}
                                    onDidMount={this.didMount.bind(this)}/>
                    <Route exact path="/" render={()=><HousesList
                        mountRequest={this.didMountAddRequest.bind(this)}/>} />
                    <Route exact path="/houseinfo" render={()=><HouseInfo/>}/>
                    <Route exact path="/favourlist" render={()=><FavouritesHouses/>}/>
                </div>
            </BrowserRouter>
        );
    }


}

let mapStateToProps = (state) => {
    return {

        housesArray: state.housesArray,
        housesList: state.housesList,
        moreHousesArray: state.moreHousesArray,
        pageNumber: state.pageNumber,
        searchInputText: state.searchInputText,
        id: state.id,
        inputText: state.inputText,
    }
};

let mapDispatchToProps = (dispatch) => {
   return {
       searchInputTextChange: (input) => {
           dispatch(inputTextChange(input));
       },
       addList: (housesList) => {
           dispatch(createHousesList(housesList));
       },
       addMoreList: (moreHousesArray) => {
           dispatch(addMoreHouses(moreHousesArray));
       },
       pageNumberChangeDispatch: (page) => {
           dispatch(pageNumberChange(page));
       },
       showHousesListDispatch: (inputText, arrList) => {
           dispatch(showHousesList(inputText, arrList));
       },
       addNewHousesListDispatch: (fullList) => {
           dispatch(addNewHousesList(fullList));
       },

   }
};


let connectFunc = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default connectFunc;