import React from 'react';
import './AppStyles.css';
import House from "./House";
import {NavLink} from "react-router-dom";


class HousesList extends React.Component {

    constructor(props) {
        super(props);

        this.callBack = props.mountRequest;
    }

    mountRequest() {
        this.callBack();
    }

    render() {
        return (
            <div id="searchList">
                <span
                    className={this.props.arrayBuild ? 'cityInfo' : 'cityInfo closed'}>Found in {this.props.inputText} ...</span>
                <NavLink id="list" to="/houseinfo">
                    {
                        this.props.housesList.map((house, index) => {
                            return <House house={house}
                                          key={index}
                                          type={false}
                                          deleteElem={this.props.deleteElemHouse}
                                          showMore={this.props.showMoreInfo}/>
                        })
                    }
                </NavLink>
                <div id="moreItems">
                    <input type="button" value="Show more..."
                           className={this.props.arrayBuild ? 'moreResultsButton' : 'moreResultsButton closed'}
                           onClick={this.mountRequest.bind(this)}/>
                </div>
            </div>
        );
    }


}

export default HousesList;