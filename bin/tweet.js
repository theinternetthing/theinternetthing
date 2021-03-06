var debug = require('debug')('tweets')

module.exports = function convert (data) {
  var tweet = {
    date: data.created_at,
    tweet_id: data.id,
    data: {
      text: data.text,
      coordinates: data.coordinates,
      in_reply_to_status_id: data.in_reply_to_status_id,
      in_reply_to_user_id: data.in_reply_to_user_id,
      retweeted_status: data.retweeted_status ? data.retweeted_status.id : false,
      user: {
        id: data.user.id,
        followers_count: data.user.followers_count,
        friends_count: data.user.friends_count
      }
    }
  }
  debug('got', tweet)
  return tweet
}
