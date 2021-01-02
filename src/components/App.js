import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';

class App extends React.Component {
 componentDidMount(){
   this.props.dispatch(fetchPosts());
 }

 render(){
   return <div>APP</div>
 }
}

function mapStateToProps(state){
  return{
    posts : this.state.posts,
  };
}

export default App;
