import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import {Plus, Video} from 'lucide-react-native';
import {useTheme} from '../contexts/ThemeContext';

const conversations = [
  {
    id: '1',
    name: 'Mark & Charmaine',
    lastMessage: 'Video on GroupSpot',
    time: 'now',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    isVideo: true,
  },
  {
    id: '2',
    name: 'Sean Reynolds',
    lastMessage: 'Ok, I can definitely check on that f...',
    time: '11m',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Lindsay Martinez',
    lastMessage: "That was so funny! Can't wait!",
    time: '13m',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    name: 'Allison, Sean, Bryan...',
    lastMessage: "That's all. Is anyone missing thei...",
    time: '1h',
    avatar:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop',
    isGroup: true,
  },
  {
    id: '5',
    name: 'Emma Johnson',
    lastMessage: "See you at 7! Don't be late!",
    time: '2h',
    avatar:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop',
  },
  {
    id: '6',
    name: 'Tech Team',
    lastMessage: 'The deployment is complete.',
    time: '3h',
    avatar:
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=100&h=100&fit=crop',
    isGroup: true,
  },
  {
    id: '7',
    name: 'Olivia Brown',
    lastMessage: 'Loved that place! Let’s go again.',
    time: '5h',
    avatar:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=100&h=100&fit=crop',
  },
  {
    id: '8',
    name: 'Alex Carter',
    lastMessage: 'Did you check the email I sent?',
    time: '6h',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  },
  {
    id: '9',
    name: 'Weekend Squad',
    lastMessage: 'Who’s bringing snacks?',
    time: '8h',
    avatar:
      'https://images.unsplash.com/photo-1551836022-8a5a8e48f2d4?w=100&h=100&fit=crop',
    isGroup: true,
  },
  {
    id: '10',
    name: 'Michael Scott',
    lastMessage: 'You miss 100% of the shots you don’t take.',
    time: '10h',
    avatar:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop',
  },
  {
    id: '11',
    name: 'Jessica Lee',
    lastMessage: 'I’ll send it over in a minute.',
    time: '12h',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
  },
  {
    id: '12',
    name: 'Daniel Wilson',
    lastMessage: 'Let’s catch up soon!',
    time: '1d',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
  },
];


export default function MessageScreen() {
  const {isDarkMode, theme} = useTheme();
  const [activeTab, setActiveTab] = useState('personal');

  const renderConversation = ({item}) => (
    <TouchableOpacity style={styles.conversationItem}>
      <View style={styles.avatarContainer}>
        <Image source={{uri: item.avatar}} style={styles.avatar} />
        {item.isGroup && (
          <View style={styles.groupIndicator}>
            <Text style={styles.groupIndicatorText}>3+</Text>
          </View>
        )}
      </View>
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={[styles.conversationName, {color: theme.text2}]}>
            {item.name}
          </Text>
          <Text style={styles.conversationTime}>{item.time}</Text>
        </View>
        <View style={styles.conversationLastMessage}>
          {item.isVideo ? (
            <View style={styles.videoMessage}>
              <Video width={16} height={16} color="#6B7280" />
              <Text style={styles.lastMessageText}>{item.lastMessage}</Text>
            </View>
          ) : (
            <Text style={styles.lastMessageText} numberOfLines={1}>
              {item.lastMessage}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          {borderBottomWidth: 1, borderBottomColor: theme.tabbg},
        ]}>
        <Text style={[styles.headerTitle, {color: theme.text2}]}>Messages</Text>
      </View>

      {/* Tabs */}
      {/* <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'personal' && styles.activeTab]}
          onPress={() => setActiveTab('personal')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'personal' && styles.activeTabText,
            ]}>
            Personal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'group' && styles.activeTab]}
          onPress={() => setActiveTab('group')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'group' && styles.activeTabText,
            ]}>
            Group
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* Conversations List */}
      <FlatList
        data={conversations}
        renderItem={renderConversation}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '700',
  },
  newMessageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  groupIndicator: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  groupIndicatorText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  conversationContent: {
    flex: 1,
    marginLeft: 12,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  conversationTime: {
    fontSize: 13,
    color: '#6B7280',
  },
  conversationLastMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lastMessageText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
});
