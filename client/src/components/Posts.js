import React from 'react'

import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_POSTS = gql`
query {
    posts {text}
  }
`;

const POST_ADDED = gql`
subscription {
    postAdded (
      post: {
        text: "!"
      }
    ) {text}
  }
`;

export default class Posts extends React.Component {

    render(){
        return(
           <div
            style={{
                display: 'flex',
                flexDirection: 'column-reverse'
            }}
           >
            <Query 
            query={GET_POSTS}
            variables={{}}
            >

                {({ subscribeToMore, loading, error, data }) => (

                    <CommentsPage

                        {...data}
                    
                        subscribeToNewPosts={() =>

                            subscribeToMore({

                                document: POST_ADDED,

                                updateQuery: (prev, { subscriptionData }) => {

                                    //console.log(subscriptionData)

                                    const newPost = subscriptionData.data.postAdded;

                                    //console.log(prev.posts)
                                    
                                    return Object.assign({
                                        posts: [...prev.posts, newPost]
                                    });
                                    
                                }
                            })

                        }

                    />

                )}

            </Query>

           
        </div>
        )
    }

}

export class CommentsPage extends React.Component {

    componentDidMount() {
      this.props.subscribeToNewPosts();
    }

    componentWillReceiveProps(props){
        console.log(props)
    }

    render(){
        return(
           <div
                style={{
                    display: 'flex',
                    flexDirection: 'column-reverse'
                }}
           >

              {
                  this.props.posts?
                  this.props.posts.map((post,index) => {
                      return(<h1 key={index}>{post.text}</h1>)
                  })
                  :'Loading...'
              }

              <AddPost/>
           </div>
        )
    }
}


const ADD_POST = gql`
  mutation AddPost($post: PostInput) {
    addPost(post: $post) {
      text
    }
  }
`;

const AddPost = () => {

  let input;

  return (
    <Mutation mutation={ADD_POST}>
      {(addPost, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addPost({ variables: { post: {text: input.value} } });
              input.value = "";
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Post</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};
