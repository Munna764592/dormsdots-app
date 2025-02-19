import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ref, update } from 'firebase/database';
import { database } from '../firebase/config';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: number;
  upvotes: number;
  comments: number;
}

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  loading: true,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loading = false;
    },
    setCurrentPost: (state, action: PayloadAction<Post>) => {
      state.currentPost = action.payload;
    },
    upvotePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.upvotes += 1;
        // Update Firebase
        const postRef = ref(database, `posts/${action.payload}`);
        update(postRef, { upvotes: post.upvotes });
      }
    },
  },
});

export const { setPosts, setCurrentPost, upvotePost } = postsSlice.actions;
export default postsSlice.reducer;

