import React from 'react';
import './AppStyles.css';


class House extends React.Component {

    constructor(props) {
        super(props);

        this.callBack = props.showMore;
        this.elementId = React.createRef();
    }

    showMoreInfo() {
        if (this.props.index) {
            let id = this.elementId.current.id;
            this.callBack(id);
        }
    }

    render() {
        return (
            <div className="divStyle" id={this.props.index} ref={this.elementId}
                 onClick={this.showMoreInfo.bind(this)}>
                <img className="imgStyle" alt="Error" id={this.props.index}
                     src={this.props.house.img_url}/>
                <span className="textStyle" id={this.props.index}>Price: {this.props.house.price_formatted} </span>
            </div>
        );
    }


}

export default House;