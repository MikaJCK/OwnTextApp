import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './TextBox.css';


class AcceptBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {showBox:false, deleteButton:false};
      this.handleClick = this.handleClick.bind(this);
    }
  
    componentDidMount() {
      
    }
  
    componentWillUnmount() {
      
    }
  
    handleClick(e){
        
        switch(e.target.value){
            case '1':
                this.setState({showBox:true});
                break;
            case "2":
                this.setState({showBox:false});
                break;
            case "3":
                this.setState({deleteButton:true});
                break;

        }
    }
  
    render() {
        if(this.state.deleteButton){
            return(<div> </div>);
        }
        if(!(this.state.showBox)){
            return(
                <div className="TBBoxButton">    
                    <button className="openBT" onClick={this.handleClick} value="1">Accept</button>
                </div>
            )
                
        }
      return (
        <div className="TBBox">
            <div className="MainTextHeader">
                <h1 className="TBMainText">Test text</h1>
            </div>
            <p className="TBSecondaryText">This is a choice.</p>
            <p className="TBSecondaryText">Green button closes the box while the red button destroys it.</p>
            <div>
                <button className="acceptBT" onClick={this.handleClick} value="2">Accept</button>
                <button className="rejectBT" onClick={this.handleClick} value="3">Reject</button>
            </div>
        </div>
      );
    }
  }
  
export default AcceptBox;