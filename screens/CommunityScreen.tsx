import React, {useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Post from '../components/Post';
import {setPosts} from '../store/postsSlice';
import {RootState} from '../store';
import {useTheme} from '../contexts/ThemeContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  RoleSelection: undefined;
  Register: undefined;
  MainApp: undefined;
  PostDetail: {postId: string};
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const {theme, isDarkMode} = useTheme();

const mockPosts = [
  {
    id: '1',
    title: 'Post 1',
    content: 'This is the first post.',
    author: 'John Doe',
    authorId: '123',
    createdAt: new Date().toISOString(),
    upvotes: 10,
    comments: [],
  },
  {
    id: '2',
    title: 'Post 2',
    content: 'This is the second post.',
    author: 'Jane Smith',
    authorId: '456',
    createdAt: new Date().toISOString(),
    upvotes: 5,
    comments: [],
  },
  {
    id: '3',
    title: 'Post 3',
    content: 'This is the third post.',
    author: 'Alice Johnson',
    authorId: '789',
    createdAt: new Date().toISOString(),
    upvotes: 7,
    comments: [],
  },
];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    dispatch(setPosts([]));
    setTimeout(() => {
      dispatch(setPosts(mockPosts));
    }, 1000);
  };

  return (
    <SafeAreaView
      style={[styles.safeContainer, {backgroundColor: theme.background}]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        ) : (
          <FlatList
            data={posts}
            renderItem={({item}) => (
              <Post
                post={item}
                onPress={() =>
                  navigation.navigate('PostDetail', {postId: item.id})
                }
              />
            )}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={loadPosts} />
            }
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  postItem: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default HomeScreen;
