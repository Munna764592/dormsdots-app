import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '../contexts/ThemeContext';
import {ArrowLeft, CircleUserRound, MoveLeft, X} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import { rightSidebar } from '../store/profileRedux';
import ProfileScreen from './ProfileScreen';

type PostDetailScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export function PostDetailScreen({navigation}: PostDetailScreenProps) {
  const {isDarkMode, theme} = useTheme();

  const profileSidebar = useSelector(
    (state: RootState) => state.profile.profileSidebar,
  );
  const dispatch = useDispatch<AppDispatch>();
  const openRightSidebar = () => {
    dispatch(rightSidebar(!profileSidebar));
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: theme.background}]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        style={[styles.container, {backgroundColor: theme.background}]}>
        {/* Header */}
        <View style={[styles.header, {borderBottomColor: theme.tabbg}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>
              <X
                strokeWidth={1}
                size={25}
                color={isDarkMode ? 'gray' : 'black'}
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openRightSidebar()}>
            <CircleUserRound size={25} color={isDarkMode ? 'gray' : 'black'} />
          </TouchableOpacity>
        </View>
        {/* Subreddit Info */}
        <View style={styles.subredditInfo}>
          <Image
            source={{uri: 'https://picsum.photos/40'}}
            style={styles.avatar}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.subredditName}>r/TravelStories</Text>
            <Text style={styles.userInfo}>u/AdventureSeeker • 3d</Text>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>

        {/* Post Content */}
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>
            My Amazing Trip to the Grand Canyon!
          </Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>Travel</Text>
          </View>

          <Text style={styles.postText}>
            Just returned from an incredible 5-day adventure at the Grand
            Canyon! The sunrise views were absolutely breathtaking, and the
            hiking trails offered challenges and rewards beyond my expectations.
            Met some amazing fellow travelers and learned so much about the
            local geology and history.
          </Text>

          <Text style={styles.postText}>
            The park rangers were incredibly knowledgeable and helped make this
            experience unforgettable. Would definitely recommend the South Rim
            Trail for beginners and Bright Angel Trail for more experienced
            hikers.
          </Text>
        </View>

        {/* Engagement Stats */}
        <View style={styles.stats}>
          <Text style={styles.statItem}>↑ 3,445</Text>
          <Text style={styles.statItem}>💬 334</Text>
          <Text style={styles.statItem}>↗️ 2.2k</Text>
        </View>

        {/* Comment Section */}
        <View style={styles.commentSection}>
          <Text style={styles.commentHint}>Join the conversation</Text>
          <Text>💭</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 48,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    fontSize: 24,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginHorizontal: 8,
    fontSize: 20,
  },
  subredditInfo: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  titleContainer: {
    flex: 1,
  },
  subredditName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userInfo: {
    color: '#666',
    fontSize: 14,
  },
  joinButton: {
    backgroundColor: '#0079D3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postContent: {
    padding: 12,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagContainer: {
    marginVertical: 8,
  },
  tag: {
    backgroundColor: '#FFD700',
    color: 'black',
    padding: 4,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
    color: '#1c1c1c',
  },
  stats: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  statItem: {
    marginRight: 16,
    fontSize: 16,
  },
  commentSection: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  commentHint: {
    color: '#666',
  },
});
