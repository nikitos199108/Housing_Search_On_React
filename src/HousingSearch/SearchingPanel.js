import React from 'react';
import './AppStyles.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

class SearchingPanel extends React.Component {

    constructor(props) {
        super(props);

        this.searchText = React.createRef();
        this.inputCallBack = props.onInput;
        this.mountCallBack = props.onDidMount;
    }

    searchInputTextChange() {
        let input = this.searchText.current.value;
        this.inputCallBack(input);
    }

    didMount() {
        if(this.props.searchInputText !== "") {
            this.mountCallBack();
        }
    }

    render() {
        return (
            <div>
                <div id="container">
                    <div id="container_item">
                        <input type="text" placeholder="Insert town name..."
                               className="inputs" autoFocus
                               id="text_input" ref={this.searchText}
                               value={this.props.searchInputText}
                               onChange={this.searchInputTextChange.bind(this)}/>
                        <NavLink to="/" className="inputs" id="buttonGo">
                        <input type="button" value="Go!"
                               onClick={this.didMount.bind(this)}/>
                        </NavLink>
                        <NavLink to="/favourlist">
                        <input type="button" value={"Show liked houses (" +this.props.count+ ")"}  className="inputs" id="myHouses"/>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }


}

let mapStateToProps = (state) => {
    return {

        searchInputText: state.searchInputText,
        count: state.count,
    }
};

let connectSearchingPanel = connect(mapStateToProps)(SearchingPanel);

export default connectSearchingPanel;