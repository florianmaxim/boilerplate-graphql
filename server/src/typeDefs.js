const typeDefs = `
type Post {
  text: String
}

type Query {
  posts: [Post]
}

input PostInput{
  text: String
}

type Mutation {
  addPost(post: PostInput): Post
}

type Subscription {
  postAdded(post: PostInput): Post
}
`;

export {typeDefs}