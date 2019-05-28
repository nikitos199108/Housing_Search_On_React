import React from 'react';
import './AppStyles.css';
import SearchingPanel from "./SearchingPanel";
import HousesList from "./HousesList";
import fetchJsonp from "fetch-jsonp";
import HouseInfo from "./HouseInfo";
import {BrowserRouter, Route} from "react-router-dom";
import FavouritesHouses from "./FavouritesHouses";
import {
    addMoreHouses, addNewHousesList, addToFavourList,
    clearFavList,
    createHousesList, deleteElem,
    inputTextChange,
    pageNumberChange,
    showHousesList, showMoreInfo
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

    showMoreInfo(id) {
        let arr = [...this.props.housesList];
        for (let i = 0; i < arr.length; i++){
            if (arr[i].id === +id) {
                let elem = arr[i];
                this.props.showMoreInfoDispatch(elem, id);
            }
        }
    }

    addToFavourList(obj) {
        let include = false;
        let favourArr = [...this.props.favourHouses];

        if (favourArr.length === 0) {
            favourArr.push(obj);
            this.props.addToFavourListDispatch(favourArr);
        } else {
            if (favourArr.length !== 0) {
                for (let i = 0; i < favourArr.length; i++) {
                    if (favourArr[i].id === obj.id) {
                        include = true;
                    }
                }
                if (include === true) {

                } else {
                    favourArr.push(obj);
                    this.props.addToFavourListDispatch(favourArr);
                }
            }
        }

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

    deleteHouse(id) {
        let favourArr = [...this.props.favourHouses];
        let sortFavourArr = favourArr.filter(function(elem) {
            return elem.id !== +id;
        });
        this.props.deleteElemDispatch(sortFavourArr);
    }

    render() {

        return (
            <BrowserRouter>
                <div>
                    <SearchingPanel onInput={this.props.searchInputTextChange}
                                    onDidMount={this.didMount.bind(this)}/>
                    <Route exact path="/" render={()=><HousesList
                        deleteElemHouse={this.props.deleteHouse}
                        mountRequest={this.didMountAddRequest.bind(this)}
                        showMoreInfo={this.showMoreInfo.bind(this)}/>} />
                    <Route exact path="/houseinfo" render={()=><HouseInfo
                        addToFavour={this.addToFavourList.bind(this)}/>}/>
                    <Route exact path="/favourlist" render={()=><FavouritesHouses
                        favourHouses={this.props.favourHouses}
                        deleteElemHouse={this.deleteHouse.bind(this)}
                        clearFavour={this.props.clearFavourList}/>}/>
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
        favourHouses: state.favourHouses,
        pageNumber: state.pageNumber,
        searchInputText: state.searchInputText,
        elemId: state.elemId,
        id: state.id,
        include: state.include,
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
       clearFavourList: () => {
           dispatch(clearFavList());
       },
       showMoreInfoDispatch: (elem, id) => {
           dispatch(showMoreInfo(elem, id));
       },
       addToFavourListDispatch: (favourArr) => {
           dispatch(addToFavourList(favourArr));
       },
       deleteElemDispatch: (sortFavourArr) => {
           dispatch(deleteElem(sortFavourArr));
       },

   }
};


let connectFunc = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default connectFunc;