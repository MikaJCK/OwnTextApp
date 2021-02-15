import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './CommentList.css';

//a component fir mnessages and their time stamp
class CommentList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {time: new Date(), text: new String};
      this.scrollToBottom = this.scrollToBottom.bind(this);
    }
  
    //will also be used to get data from the 
    scrollToBottom = () => {
        if(this.props.newComments===true){
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
        
      }

    componentDidMount() {
        this.state.text=this.props.text;
        this.state.time=this.props.dateGiven
        this.timerID = setInterval(
            () => this.scrollToBottom(),
            500
          );
        this.scrollToBottom();
    }
  
    componentWillUnmount() {
        this.scrollToBottom();
        clearInterval(this.timerID);
    }
  
    
  
    render() {
        const items = []
        for (const [index, value] of this.props.listOfComment.entries()) {
            items.push(<li key={index}>{value}</li>)
        }
        
        return(
        <div className="Commentbox">
            <div className="itemContainer">
                <ul>{items}</ul>
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        </div>
        );
    }
  }

  export default CommentList;
  