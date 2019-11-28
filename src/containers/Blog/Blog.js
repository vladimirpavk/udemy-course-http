import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

import axios from 'axios';

class Blog extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            posts : [],
            selectedPost : {}

        };
    }

    componentWillMount(){
        console.log('Will get data...');
        this.getData();
    }    

    getData = ()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts')            
            .then(
                (res)=>
                {
                    //console.log(res.data);
                    const updatedPosts = res.data.slice(0, 4).map(
                        (post)=>{
                            return {
                                ...post,
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
                        console.log(err);
                    }
            );
    }

    postSelected = (id)=>{
        const filteredPost = this.state.posts.filter(
            (post)=>post.id === id
        );
        console.log(...filteredPost);        
        this.setState({
            selectedPost : filteredPost[0]
        })
    }

    render () {
        const posts = this.state.posts.map(
            (post)=>{
                return (
                    <Post
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        author={post.author}
                        postSelected={this.postSelected}
                        />
                );
            }
        );        

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost 
                        title={this.state.selectedPost.title}
                        content={this.state.selectedPost.body}
                        id={this.state.selectedPost.id}
                    />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;