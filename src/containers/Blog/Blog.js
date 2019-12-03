import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './Blog.css';

import axios from 'axios';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

class Blog extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            posts : [],
            selectedPost : {}

        };
    }

    componentWillMount(){
        //console.log('Will get data...');
        this.getData();
    }    

    getData = ()=>{
        return axios.get('https://jsonplaceholder.typicode.com/posts')            
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
                        posts: updatedPosts,
                        selectedPost: updatedPosts[0]
                    });                    
                }
            )
            .catch(
                (err)=>
                    {
                        alert('Something bad happened...', err);
                        //console.log(err);
                    }
            );
    }

    postSelected = (id)=>{
        const filteredPost = this.state.posts.filter(
            (post)=>post.id === id
        );
        //console.log(...filteredPost);        
        this.setState({
            selectedPost : filteredPost[0]
        })
    }

    deletePost = (id)=>{
        //console.log('Delete post', id);
        this.setState(
            (oldState)=>{
                const newPosts = oldState.posts.filter(
                    (post)=>post.id !== id
                );                
                return {
                    posts: newPosts,
                    selectedPost: {}
                }
            }
        )   
    }

    addPost = (post)=>{
        const newPost = {
            userId: Math.random(),
            id: Math.random(),
            title: post.title,
            body: post.content,
            author: post.author
        };
        this.setState(
            (oldState)=>{
                return{
                    posts: [...oldState.posts, newPost]
                }
            }
        );
    }

    render () {
        /* const posts = this.state.posts.map(
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
        );         */

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <Link to='/'><li>Home</li></Link>                            
                            <Link to='/new'><li>New Post</li></Link>
                        </ul>
                    </nav>
                </header>
            
               {/*  <section className="Posts">
                    {posts}
                </section>

                <section>
                    <FullPost 
                        title={this.state.selectedPost.title}
                        content={this.state.selectedPost.body}
                        id={this.state.selectedPost.id}
                        deleteClicked = {this.deletePost}
                    />
                </section>
                <section>
                    <NewPost 
                        addPostClicked={this.addPost}
                    />
                </section> */}
                <Route path='/' exact component={Posts} />
                <Route path='/new' component={NewPost} />
                <Route path='/:id' component={FullPost}/>
            </div>
        );
    }
}

export default Blog;