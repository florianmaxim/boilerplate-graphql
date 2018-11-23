import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const feed = [];

const resolvers = {

  Query: {
    posts: () => {
      return feed;
    }
  },

  Mutation: {
    addPost: (root, { post }) => { 

      feed.push(post);

      console.log('Mutation:'+JSON.stringify(post))

      pubsub.publish('postAdded', post);

      return post;
    },
  },
  
  Subscription: { 
    postAdded: {
      resolve: (payload) => {
        
        console.log('Subscription:'+JSON.stringify(payload))
        
        return payload;
      },
      subscribe: () => pubsub.asyncIterator('postAdded')
    }
  }
};

export { resolvers };
