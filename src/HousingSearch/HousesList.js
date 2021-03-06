import React from 'react';
import './AppStyles.css';
import House from "./House";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";


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
                                          type={false}/>
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

let mapStateToProps = (state) => {
    return {
        housesList: state.housesList,
        arrayBuild: state.arrayBuild,
        inputText: state.inputText,
    }
};

let connectHList = connect(mapStateToProps)(HousesList);

export default connectHList;