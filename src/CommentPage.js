import './CommentPage.css';
import Clock from './newEle';
import AcceptBox from './TextBoxAD';
import CommentStream from './CommentBox/CommentBox';
import React from 'react';
import ReactDOM from 'react-dom';




function CommentPage() {
    return (
      <div>
        <Clock pretext="Corner clock" classProp="testIO"/>
        <div className="App">
          
          <div className="CommentLocation">
            <CommentStream/>
          </div>
          
        </div>
      
      </div>
    );
  }
  
  
  export default CommentPage;
  