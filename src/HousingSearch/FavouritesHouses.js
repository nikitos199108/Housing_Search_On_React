import React from 'react';
import './AppStyles.css';
import House from "./House";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {
    clearFavList,
} from "./Redux/Actions";


class FavouritesHouses extends React.Component {

    render() {
        return (
                    <div className="likeHousesBody">
                        <div className="likedHousesHeader">
                            <h2>Liked houses...</h2>
                        </div>
                        <div id="likedHouseslList">
                            {
                                this.props.favourHouses.map((house,index) =>{
                                    return <House house={house}
                                                  key={index}
                                                  type={true}/>
                                })
                            }
                        </div>
                        <div className={this.props.favourHouses.length !==0 ? 'likedHousesFooter' : 'likedHousesFooter closed'}>
                            <input type="button" value="Clear" className="inputs" id="buttonClearMyHouses"
                                   onClick={this.props.clearFavourList}/>
                        </div>
                        <NavLink to="/">
                            <input type="button" value="Back home"  className="inputs" id="myHouses"/>
                        </NavLink>
                    </div>
        );
    }


}

let mapStateToProps = (state) => {
    return {

        favourHouses: state.favourHouses,

    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        clearFavourList: () => {
            dispatch(clearFavList());
        },
    }
};

let connectFavour = connect(mapStateToProps,mapDispatchToProps)(FavouritesHouses);

export default connectFavour;