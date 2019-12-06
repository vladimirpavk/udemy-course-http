import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {   
    
    constructor(props){
        super(props);
       /*  console.log('Params id: ', props.match.params['id']);
        console.log('Props', props);
 */
        this.state = {
            post : null
        }
    }

    componentDidMount(){
        /* console.log('ComponentDidMount...'); */
        this.loadData();
    }

    loadData = async ()=>{        
        if(!this.state.post || (this.state.post && this.state.post.id!==+this.props.match.params['id'])){
            /* console.log(this.props.match.params['id']); */
            try{                        
                let response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params['id']}`);
               /*  console.log(response); */
        
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
    }

    componentDidUpdate(){
        console.log('ComponentDidUpdate...');
        this.loadData();
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
                this.state.post && 
                <div className="FullPost">
                    <h1>{this.state.post.title}</h1>
                    <p>{this.state.post.content}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={()=>this.deleteClicked(this.state.post.id)}>Delete</button>
                    </div>
                 </div>                              
       );
    }                      
}

export default FullPost;