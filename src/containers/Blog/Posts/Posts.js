import React, { Component } from 'react';
import axios from 'axios';
import './Posts.css';

import Post from '../../../components/Post/Post';

class Posts extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            posts: 
            [
                {
                    id: null,
                    title: '',
                    author: ''
                }
            ]
        };
           
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')            
            .then(
                (res)=>
                {
                    //console.log(res.data);
                    const updatedPosts = res.data.slice(0, 4).map(
                        (post)=>{
                            return {
                                id: post.id,
                                title: post.title,
                                author: 'Vladimir'
                            }
                        }
                    );

                    this.setState({
                        posts: updatedPosts
                    });                    
                }
            )
            .catch(
                (err)=>
                    {
                        alert('Something bad happened...', err);
                    }
            );
    }

    render(){
        const posts = this.state.posts.map(
            (post)=>{
                return (
                    <Post                   
                        key={post.id} 
                        id={post.id}
                        title={post.title}
                        author={post.author}                        
                    />
                );
            }
        );        

        return(
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;