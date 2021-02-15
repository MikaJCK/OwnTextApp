import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Comment from './CommentField';
import CommentList from './CommentListing';
import './Commentbox.css';
import { get } from 'mongoose';

//a box for stream of comments and for adding them
class CommentStream extends React.Component {
    constructor(props) {
      super(props);
      this.state = {comments: [], value: '', stateShow:true, index: 0, author:"Admin", newComments: true, indent:0};
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.MakeCommentArray = this.MakeCommentArray.bind(this);
      
    }

    //used for setting state of teh box, if stateShow is closed then the box will open and viceversa
    handleClose(e){
        var temp= !(this.state.stateShow);
        this.setState({stateShow: temp});
        
    }

    async componentDidMount() {
        
        this.MakeCommentArray(false);
        this.timerID = setInterval(
            () => this.MakeCommentArray(true),
            500
          );
        
    }

    //used to fetch data from server on the states
    async fecthInformation(){
        var test;
        await fetch("http://localhost:9000/CommentConnection/getDB",{
            
            method:"GET",
            headers:{      
            },
            mode:"cors",
            }).then(function(res) {
                return res.json();
            }).then(function(response){
                return response;
            }).then(function(param) {
                test=param;
            });
        return test;
    }

    async MakeCommentArray(clear){
        var data= await this.fecthInformation();
        if(clear){
            this.setState({
                comments:[]
            })
        }
        var i=0, lastindex;
        for(i=0;i<data.length;i++){
            this.setState(prevState =>({
                comments : [...prevState.comments, <Comment text={data[i].content} time={data[i].date.toDate} deleteComment={this.handleRemove} index={data[i].ID} author={data[i].author} currentAuthor={this.state.author}/>]
            
            }))
            lastindex= parseInt(data[i].ID)+1;
        }
        if(i===0){
            this.setState({index:0});
        }else{
            this.setState({index:lastindex});
            if(this.state.index!==this.state.indent){
                this.setState({
                    indent: this.state.index,
                    newComments:true
                })
            }else{
                this.setState({
                    newComments:false
                })
            }
            
        }
      
    }

    handleChange(event) {
        this.setState({value: event.target.value, author: document.getElementById('author').value});
    }

    handleRemove(commentID){
        delete this.state.comments[commentID];
        this.setState({
           comments: this.state.comments
        });
        fetch("http://localhost:9000/CommentConnection/removeDB",{
            
            method:"POST",
            headers:{      
                'Accept': 'application/json',    
                'Content-Type': 'application/json'
            },
            mode:"cors",
            body: JSON.stringify({"ID":commentID,"author":this.state.author})
            }).then(function(){
                
            })
            
        
    }
    
    async sendData(dateActual){
        await fetch("http://localhost:9000/CommentConnection/testRoute",{
            
            method:"POST",
            headers:{      
                'Accept': 'application/json',    
                'Content-Type': 'application/json'
            },
            mode:"cors",
            body: JSON.stringify({"text":this.state.value, "date":dateActual, "author":this.state.author, "iD":this.state.index})
            })
    }

  // <Comment text={document.getElementById('inputText').innerHTML} date={new Date}/>
    handleClick(e){
        var dateActual=new Date();
        this.sendData(dateActual);
        if(this.state.value===""){
        }else{
            this.setState(prevState =>({
                comments : [...prevState.comments, <Comment text={this.state.value} time={dateActual.toLocaleDateString} deleteComment={this.handleRemove} index={this.state.index} author={this.state.author} currentAuthor={this.state.author}/>]
            
            }))
            this.setState(prevState =>({
                index : prevState.index +1
            
            }))
            this.setState({value: ""});
            e.target.reset();
            
        }
        e.preventDefault();
    }
  

    //TODOO make nickname field and link it with commentfield author
    render() {
        
        if(!(this.state.stateShow)){
            return(
                <div className="NoShowBox" onClick={this.handleClose} value={false}>
                    <h1>Open chat</h1>
                    
                </div>
            )
            
        }
        return(
            <div className = "FullBox">
                <div className="Nickname">
                    <textarea className="author" id="author" value={this.state.text}/>
                </div>
                <div >
                    <button className="HideButton" onClick={this.handleClose} value={false}>
                        <div className="HideBTTExt">-</div>
                    </button>
                </div>
                <CommentList listOfComment={this.state.comments} newComments={this.state.newComments}/>
                <form className="CommentForm" onSubmit={this.handleClick}>
                    
                    <label className="InputLabel">
                        
                        <textarea maxlength="100" className="CommentInput" type="text" value={this.state.text} onChange={this.handleChange} />
                    </label>
                    <input className="SubmitButton" type="submit" value="Submit" />
                </form>
            </div>
        
        )
    }
  }

  export default CommentStream;
  