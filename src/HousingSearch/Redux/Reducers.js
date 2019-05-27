import {a} from "./Actions";

export function houseReducer(oldState, action) {
    switch (action.type) {

        case a.CREATE_HOUSES_LIST:
            return {
                ...oldState,
                housesList: action.housesList,
            };

        case a.ADD_MORE_HOUSES:
            return {
                ...oldState,
                moreHousesArray: [...action.moreHousesArray],
            };

        case a.DELETE_HOUSE:
            return {
                ...oldState,
                favourHouses: [...action.favourArr],
            };

        case a.ADD_TO_FAVOUR:
            return {
                ...oldState,
                favourHouses: [...action.favourHouses],
                count: action.favourHouses.length,
            };

        case a.SHOW_MORE_INFO:
            return {
                ...oldState,
                needHouse: action.needHouse,
                elemId: action.elemId,
            };

        case a.ADD_NEW_LIST:
            return {
                ...oldState,
                housesArray: [...action.housesArray],
            };

        case a.INPUT_TEXT_CHANGE:
            return {
                ...oldState,
                searchInputText: action.searchInputText,
            };

        case a.SHOW_HOUSES_LIST:
            return {
                ...oldState,
                housesArray: [...action.arrList],
                arrayBuild: true,
                inputText: action.inputText,
                searchInputText: "",
            };

        case a.PAGE_NUMBER_CHANGE:
            return {
                ...oldState,
                pageNumber: action.pageNumber,
            };

        case a.CLEAR_FAV_LIST:
            return {
                ...oldState,
                favourHouses: [],
                count: 0,
            };

        default:
            if (oldState)
                return oldState;

            return {
                housesArray: [],
                housesList: [],
                moreHousesArray: [],
                favourHouses: [],
                arrayBuild: false,
                pageNumber: 1,
                inputText: "",
                searchInputText: "",
                elemId: 0,
                id: 0,
                needHouse: {},
                count: 0,
                include: false,
            };

    }
}