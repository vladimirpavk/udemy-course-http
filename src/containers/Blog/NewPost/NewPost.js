import React, { Component } from 'react';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max'
    }

    addPostClicked = async (state)=>{
        try{
            let httpResult = await axios.post('https://jsonplaceholder.typicode.com/posts',{
                userId : 1,
                id: 5,
                title: state.title,
                body: state.content,
                author: 'Vladimir'
            });
            console.log(httpResult);
            this.props.history.push('/');
        }
        catch(err){
            console.log('Something bad happened...', err);
        }
       
    }

    render () {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={()=>this.addPostClicked(this.state)}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;