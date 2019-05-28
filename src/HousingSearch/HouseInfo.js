import React from 'react';
import './AppStyles.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {addToFavourList,} from "./Redux/Actions";


class HouseInfo extends React.Component {

    addToFavourList() {
        let obj = this.props.needHouse;
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


    render() {
        return (
                    <div className="modal-body">
                        {
                            Object.keys(this.props.needHouse).length !== 0 ?
                                <div className="modal-body">
                                    <div>
                                        <h2>Full information...</h2>
                                    </div>
                                    <div id="modalList">
                                        <img className="modalImg" alt="Error" src={this.props.needHouse.img_url}/>
                                        <div className="textList">
                                            <span
                                                className="textStyle">Price : {this.props.needHouse.price_formatted}</span>
                                            <span
                                                className="textStyle">Price type : {this.props.needHouse.price_type}</span>
                                            <span
                                                className="textStyle">Property type : {this.props.needHouse.property_type}</span>
                                            <span
                                                className="textStyle">Bedroom number : {this.props.needHouse.bedroom_number}</span>
                                            <span
                                                className="textStyle">Bathroom number : {this.props.needHouse.bathroom_number}</span>
                                            <span
                                                className="textStyle">Car spaces : {this.props.needHouse.car_spaces}</span>
                                            <span className="textStyle">House size : {this.props.needHouse.size}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="button" value="Add to favourites" className="inputs"
                                               id="buttonAdd"
                                               onClick={this.addToFavourList.bind(this)}/>
                                    </div>
                                    <NavLink to="/">
                                        <input type="button" value="Back home"  className="inputs" id="myHouses"/>
                                    </NavLink>
                                </div> :
                                <div className="emptyHouse">House not found...</div>
                        }

                    </div>
        );
    }


}

let mapStateToProps = (state) => {
    return {

        needHouse: state.needHouse,
        favourHouses: state.favourHouses,
        include: state.include,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {

        addToFavourListDispatch: (favourArr) => {
            dispatch(addToFavourList(favourArr));
        },

    }
};


let connectHouseInfo = connect(mapStateToProps,mapDispatchToProps)(HouseInfo);


export default connectHouseInfo;