import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {   
    
    constructor(props){
        super(props);
        //console.log(props.match.params['id']);
        this.state = {
            post : {
                title : '',
                content : ''
            }
        }
    }

    async componentDidMount(){
        try{
            let response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params['id']}`);
            console.log(response);
    
            this.setState(
                {
                    post : {
                        id : response.data.id,
                        title : response.data.title,
                        content : response.data.body
                    }
                }
            );
        }
        catch(error){
            console.log('Something bad happened...', error);
        }           
    }

    deleteClicked = async ()=>{
        try{
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params['id']}`)
            console.log(response);
        }
        catch(error){
            console.log('Something bad happened...', error);
        }
    }

    render () {

       return(
            <div className="FullPost">
            <h1>{this.state.post.title}</h1>
            <p>{this.state.post.content}</p>
            <div className="Edit">
                <button className="Delete" onClick={()=>this.deleteClicked(this.state.post.id)}>Delete</button>
            </div>
        </div>
       )
    }                      
}

export default FullPost;