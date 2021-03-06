import React, { Component, Suspense } from 'react';
import { Route, NavLink, Redirect, Switch } from 'react-router-dom';
import './Blog.css';

import axios from 'axios';

import Posts from './Posts/Posts';
import FullPost from './FullPost/FullPost';

const NewPost = React.lazy(
    ()=>import('./NewPost/NewPost')
);

class Blog extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            posts : [],
            selectedPost : {}

        };
    }

    componentDidMount(){
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
                            <NavLink to='/'><li>Home</li></NavLink>                            
                            <NavLink to='/new'><li>New Post</li></NavLink>
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
                <Switch>                    
                    <Route path='/posts' component={Posts} />                                         
                    <Route
                        path='/new'
                        render={()=>(
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <NewPost />
                            </Suspense>
                        )} />
                    <Redirect from='/' exact to='/posts' />
                </Switch>
            </div>
        );
    }
}

export default Blog;