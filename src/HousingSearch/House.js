import React from 'react';
import './AppStyles.css';
import {deleteElem, showMoreInfo} from "./Redux/Actions";
import {connect} from "react-redux";


class House extends React.Component {

    constructor(props) {
        super(props);

        this.elementId = React.createRef();
        this.delId = React.createRef();
    }

    showMoreInfo() {
        if (this.props.house.id >= 0 && (!this.props.type)) {
            let id = this.elementId.current.id;
            let arr = [...this.props.housesList];
            for (let i = 0; i < arr.length; i++){
                if (arr[i].id === +id) {
                    let elem = arr[i];
                    this.props.showMoreInfoDispatch(elem, id);
                }
            }
        }
    }

    deleteHouse() {
        let id = this.delId.current.id;
        let favourArr = [...this.props.favourHouses];
        let sortFavourArr = favourArr.filter(function(elem) {
            return elem.id !== +id;
        });
        this.props.deleteElemDispatch(sortFavourArr);
    }

    render() {
        return (
            <div className="divStyle" id={this.props.house.id} ref={this.elementId}
                 onClick={this.showMoreInfo.bind(this)}>
                <img className="imgStyle" alt="Error" id={this.props.house.id}
                     src={this.props.house.img_url}/>
                <span className="textStyle" id={this.props.house.id}>Price: {this.props.house.price_formatted} </span>
                <input type="button" value="Delete" id={this.props.house.id} ref={this.delId}
                       className={this.props.type ? 'delHouse' : 'delHouse closed'}
                       onClick={this.deleteHouse.bind(this)}/>
            </div>
        );
    }


}

let mapStateToProps = (state) => {
    return {

        favourHouses: state.favourHouses,
        housesList: state.housesList,
        elemId: state.elemId,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {

        deleteElemDispatch: (sortFavourArr) => {
            dispatch(deleteElem(sortFavourArr));
        },
        showMoreInfoDispatch: (elem, id) => {
            dispatch(showMoreInfo(elem, id));
        },

    }
};

let connectHouse = connect(mapStateToProps,mapDispatchToProps)(House);

export default connectHouse;