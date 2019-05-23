import React from 'react';
import './AppStyles.css';
import House from "./House";


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
                                                  key={index}/>
                                })
                            }
                        </div>
                        <div className={this.props.favourHouses.length !==0 ? 'likedHousesFooter' : 'likedHousesFooter closed'}>
                            <input type="button" value="Clear" className="inputs" id="buttonClearMyHouses"
                                   onClick={this.clear.bind(this)}/>
                        </div>
                    </div>
        );
    }


}

export default FavouritesHouses;