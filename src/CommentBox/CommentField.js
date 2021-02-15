import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './CommentField.css';

//a component fir mnessages and their time stamp
class Comment extends React.Component {
    constructor(props) {
      super(props);
      this.state = {time: new Date(), text: new String, instanceT:this,author:this.props.author, currentAuthor:this.props.currentAuthor};
      this.removeThis=this.removeThis.bind(this);
    }
  
    componentDidMount() {
        this.state.text=this.props.text;
        this.state.time=this.props.dateGiven
    }
  
    componentWillUnmount() {
      
    }

    removeThis(){
      this.props.deleteComment(this.props.index);
    }
    
   
  
    render() {
      if(this.state.currentAuthor===this.state.author){
        return(
        <div className="commentFieldDiv">
            <h1 className="commentFieldText">{this.props.text}</h1>
            <div className="AuthorField">{this.props.author}</div>
            <h1 className="commentFieldDate">{this.props.time}</h1>
            <button className="removeButton" onClick={this.removeThis}>remove</button>
            
        </div>
        );
      }else{
        return(
          <div className="commentFieldDiv">
              <h1 className="commentFieldText">{this.props.text}</h1>
              <div className="AuthorField"></div>
              <h1 className="commentFieldDate">{this.props.time}</h1>
              
          </div>
          );
      }
    }
  }

  export default Comment;