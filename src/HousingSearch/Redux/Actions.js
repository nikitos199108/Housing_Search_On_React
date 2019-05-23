export const a = {
    CREATE_HOUSES_LIST: "CREATE_HOUSES_LIST",
    SHOW_HOUSES_LIST: "SHOW_HOUSES_LIST",
    CLEAR_FAV_LIST: "CLEAR_FAV_LIST",
    INPUT_TEXT_CHANGE: "INPUT_TEXT_CHANGE",
    PAGE_NUMBER_CHANGE: "PAGE_NUMBER_CHANGE",
    ADD_MORE_HOUSES: "ADD_MORE_HOUSES",
    ADD_NEW_LIST: "ADD_NEW_LIST",
    SHOW_MORE_INFO: "SHOW_MORE_INFO",
    ADD_TO_FAVOUR: "ADD_TO_FAVOUR",
};

export const  createHousesList = (housesList) => {
    return {
        type: a.CREATE_HOUSES_LIST,
        housesList: housesList,
    }
};

export const  addToFavourList = (favourArr) => {
    return {
        type: a.ADD_TO_FAVOUR,
        favourHouses: favourArr,
    }
};

export const  addMoreHouses = (moreHousesArray) => {
    return {
        type: a.ADD_MORE_HOUSES,
        moreHousesArray: moreHousesArray,
    }
};

export const  showMoreInfo = (elem, id) => {
    return {
        type: a.SHOW_MORE_INFO,
        needHouse: elem,
        elemId: id,
    }
};

export const  addNewHousesList = (fullList) => {
    return {
        type: a.ADD_NEW_LIST,
        housesArray: fullList,
    }
};

export const  showHousesList = (inputText, arrList) => {
    return {
        type: a.SHOW_HOUSES_LIST,
        inputText: inputText,
        arrList: arrList,
    }
};

export const  clearFavList = () => {
    return {
        type: a.CLEAR_FAV_LIST,
    }
};

export const  pageNumberChange = (page) => {
    return {
        type: a.PAGE_NUMBER_CHANGE,
        pageNumber: page,
    }
};

export const  inputTextChange = (input) => {
    return {
        type: a.INPUT_TEXT_CHANGE,
        searchInputText: input,
    }
};

