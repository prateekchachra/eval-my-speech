import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import YouTube from 'react-youtube';
import {deletePost, addLike, removeLike} from '../../actions/postActions';


class PostItem extends Component {

    onDeleteClick(id){
        this.props.deletePost(id);

    }
    onLikeClick(id){
        this.props.addLike(id);

    }
    
    onUnlikeClick(id){
        this.props.removeLike(id);

    }

    findUserLike(likes){ 
      const {auth} = this.props;
      if(likes.filter(like => like.user === auth.user.id).length > 0 )
      return true;
      else 
      return false; 
    }
    render() {

      let youtubeEmbedItem, speechBodyItem;

        const {post, auth, showActions} = this.props;

        if(post.youtubeLink){

          var videoId = post.youtubeLink.split('=')[1];
          console.log(videoId);
          
        
          var sanitizedId = videoId.includes('&') ? videoId.split('&')[0] : videoId;
          console.log(sanitizedId);
          console.log(videoId.includes('&'));
          if(sanitizedId)
              youtubeEmbedItem = <YouTube videoId={sanitizedId} id={post._id + '_youtubeVid'}/>;
            else
             youtubeEmbedItem = (<span></span>);
        }
        else 
          youtubeEmbedItem = (<span></span>);

        if(post.speechBody){
          speechBodyItem=(<p>{post.speechBody}</p>);

        }
        else
        speechBodyItem = (<div></div>);
        return (
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <Link to="profile.html"> 
                    <img className="rounded-circle d-none d-md-block" src={post.avatar}
                      alt="" />
                  </Link>
                  <br />
                  
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{post.text}</p>
                  {youtubeEmbedItem}
                  {speechBodyItem}
                  {showActions ? (<span>
                    <button type="button" onClick={this.onLikeClick.bind(this, post._id)} className="btn btn-light mr-1">
                    <i className={classnames("fas fa-thumbs-up", {'text-info': this.findUserLike(post.likes)})}></i>
                    <span className="badge badge-light">{post.likes.length}</span>
                  </button>
                  <button type="button" onClick={this.onUnlikeClick.bind(this, post._id)} className="btn btn-light mr-1">
                    <i className="text-secondary fas fa-thumbs-down"></i>
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                  </Link>
                    {post.user ===auth.user.id ? (
                        <button onClick={this.onDeleteClick.bind(this, post._id)} 
                        className="btn btn-danger mr-1" type="button">
                            <i className = "fa fa-trash" />
                        </button> 

                    ): null} 


                  </span>) : null}
                </div>
              </div>
            </div>
        )
    }
}

PostItem.propTypes = {
    post : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,      
    addLike: PropTypes.func.isRequired,      
    removeLike: PropTypes.func.isRequired,      

}

PostItem.defaultProps = {
  showActions: true

}
const mapStateToProps = (state) => ({

    auth: state.auth
});


export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);