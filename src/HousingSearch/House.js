import React from 'react';
import './AppStyles.css';


class House extends React.Component {

    constructor(props) {
        super(props);

        this.callBack = props.showMore;
        this.deletCallBack = props.deleteElem;
        this.elementId = React.createRef();
        this.delId = React.createRef();
    }

    showMoreInfo() {
        if (this.props.house.id >= 0 && (!this.props.type)) {
            let id = this.elementId.current.id;
            this.callBack(id);
        }
    }

    delFromFavourList() {
        let id = this.delId.current.id;
        this.deletCallBack(id);
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
                       onClick={this.delFromFavourList.bind(this)}/>
            </div>
        );
    }


}

export default House;