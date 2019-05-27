import React from 'react';
import './AppStyles.css';
import House from "./House";
import {NavLink} from "react-router-dom";


class FavouritesHouses extends React.Component {

    constructor(props) {
        super(props);

        this.callBack = props.clearFavour;
    }

    clear() {
        this.callBack();
    }


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
                                                  type={true}
                                                  deleteElem={this.props.deleteElemHouse}/>
                                })
                            }
                        </div>
                        <div className={this.props.favourHouses.length !==0 ? 'likedHousesFooter' : 'likedHousesFooter closed'}>
                            <input type="button" value="Clear" className="inputs" id="buttonClearMyHouses"
                                   onClick={this.clear.bind(this)}/>
                        </div>
                        <NavLink to="/">
                            <input type="button" value="Back home"  className="inputs" id="myHouses"/>
                        </NavLink>
                    </div>
        );
    }


}

export default FavouritesHouses;