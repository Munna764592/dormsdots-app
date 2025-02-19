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
} from 'react-native';
import {
  Bell,
  ChevronLeft,
  Heart,
  MessageCircle,
  Star,
  UserPlus,
  Settings,
} from 'lucide-react-native';
import {useTheme} from '../contexts/ThemeContext';

// Mock data for notifications
const initialNotifications = [
  {
    id: '1',
    type: 'like',
    user: 'Sarah Wilson',
    content: 'liked your post',
    time: '2m ago',
    read: false,
  },
  {
    id: '2',
    type: 'follow',
    user: 'John Smith',
    content: 'started following you',
    time: '15m ago',
    read: false,
  },
  {
    id: '3',
    type: 'comment',
    user: 'Emma Davis',
    content: 'commented on your photo',
    time: '1h ago',
    read: true,
  },
  {
    id: '4',
    type: 'mention',
    user: 'Michael Brown',
    content: 'mentioned you in a comment',
    time: '2h ago',
    read: true,
  },
  {
    id: '5',
    type: 'like',
    user: 'Jessica Taylor',
    content: 'liked your comment',
    time: '3h ago',
    read: true,
  },
];

export default function NotificationScreen() {
  const {isDarkMode, theme} = useTheme();
  const [notifications, setNotifications] = useState(initialNotifications);

  const getNotificationIcon = type => {
    switch (type) {
      case 'like':
        return <Heart width={20} height={20} color="#EF4444" />;
      case 'follow':
        return <UserPlus width={20} height={20} color="#3B82F6" />;
      case 'comment':
        return <MessageCircle width={20} height={20} color="#10B981" />;
      case 'mention':
        return <Star width={20} height={20} color="#F59E0B" />;
      default:
        return <Bell width={20} height={20} color="#6B7280" />;
    }
  };

  const markAsRead = id => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? {...notification, read: true} : notification,
      ),
    );
  };

  const renderNotification = ({item}) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.read && styles.unreadNotification]}
      onPress={() => markAsRead(item.id)}>
      <View style={styles.notificationIcon}>
        {getNotificationIcon(item.type)}
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{item.user}</Text> {item.content}
        </Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => !n.read).length;

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
          {
            backgroundColor: theme.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomColor: theme.tabbg,
          },
        ]}>
        {/* <TouchableOpacity style={styles.backButton}>
          <ChevronLeft width={24} height={24} color="#1F2937" />
        </TouchableOpacity> */}
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, {color: theme.text2}]}>
            Notifications
          </Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        {/* <TouchableOpacity style={styles.settingsButton}>
          <Settings width={20} height={20} color="#1F2937" />
        </TouchableOpacity> */}
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Bell width={40} height={40} color="#9CA3AF" />
            <Text style={styles.emptyStateText}>No notifications yet</Text>
          </View>
        }
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#1F2937',
  },
  settingsButton: {
    padding: 8,
    marginRight: -8,
  },
  badge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
    flexDirection: 'row',
    marginTop:3
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 6,
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  unreadNotification: {
    // backgroundColor: '#F3F4F6',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },
  notificationText: {
    fontSize: 15,
    color: 'gray',
    lineHeight: 20,
  },
  username: {
    fontWeight: '600',
  },
  timeText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
});
