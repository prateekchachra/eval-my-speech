import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CommendationItem from './CommendationItem';


class CommendationFeed extends Component {
    render() {
        const {commendations, postId } = this.props;
        return commendations.map(comm => (<CommendationItem key={comm._id} commendation={comm}
            postId={postId} />
            ));
    }
}

CommendationFeed.propTypes = {
    commendations: PropTypes.array.isRequired,
    postId : PropTypes.string.isRequired

}

export default CommendationFeed;