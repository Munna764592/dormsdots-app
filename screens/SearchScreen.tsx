import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from 'react-native';
import {Circle, Search, X} from 'lucide-react-native';
import {useTheme} from '../contexts/ThemeContext';

const SUGGESTIONS = [
  'React Development',
  'TypeScript Basics',
  'React Native Tutorial',
  'Mobile App Design',
  'Frontend Architecture',
];

const POPULAR_TOPICS = [
  {
    title: 'Mobile',
    description: 'Learn to build native apps',
  },
  {
    title: 'UI Design',
    description: 'Master mobile interfaces',
  },
  {
    title: 'React Native',
    description: 'Cross-platform development',
  },
  {
    title: 'iOS & Android',
    description: 'Platform-specific features',
  },
];

export default function SearchScreen() {
  const {isDarkMode, theme} = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredSuggestions = SUGGESTIONS.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

const renderSuggestion = ({item, index}) => (
  <TouchableOpacity
    style={[
      styles.suggestionItem,
      index === filteredSuggestions.length - 1 && {borderBottomWidth: 0},
    {borderBottomColor:theme.tabbg}]}
    onPress={() => {
      setSearchQuery(item);
      dismissKeyboard();
    }}>
    <Circle size={12} color="#9CA3AF" />
    <Text style={styles.suggestionText}>{item}</Text>
  </TouchableOpacity>
);

  const renderPopularTopic = ({item}) => (
    <TouchableOpacity
      style={[styles.topicCard]}
      onPress={() => {
        setSearchQuery(item.title);
        dismissKeyboard();
      }}>
      <Text style={[styles.topicTitle, {color:theme.text2}]}>{item.title}</Text>
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
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.content}>
          {/* Search Header */}
          <View
            style={[
              styles.header,
              {
                backgroundColor: theme.background,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: theme.tabbg,
              },
            ]}>
            <View
              style={[
                styles.searchContainer,
                {backgroundColor: theme.background},
              ]}>
              <Search
                style={styles.searchIcon}
                width={20}
                height={20}
                color="#9CA3AF"
              />
              <TextInput
                style={[styles.searchInput, {color: theme.text2}]}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => setIsFocused(true)}
                placeholder="Search"
                placeholderTextColor="#9CA3AF"
              />
              {searchQuery ? (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  style={styles.clearButton}>
                  <X width={20} height={20} color="#9CA3AF" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          {/* Suggestions */}
          {isFocused && searchQuery ? (
            <View style={[styles.suggestionsContainer,{borderColor:theme.tabbg}]}>
              <FlatList
                data={filteredSuggestions}
                renderItem={renderSuggestion}
                keyExtractor={item => item}
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={
                  <Text style={styles.noSuggestions}>No suggestions found</Text>
                }
              />
            </View>
          ) : (
            <View style={styles.mainContent}>
              <Text style={[styles.sectionTitle, {color: '#9CA3AF'}]}>
                Explore Circle
              </Text>
              <FlatList
                data={POPULAR_TOPICS}
                renderItem={renderPopularTopic}
                keyExtractor={item => item.title}
                numColumns={2}
                columnWrapperStyle={styles.topicGrid}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
        elevation: 2,
      },
    }),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
  },
  suggestionsContainer: {
    borderRadius: 20,
    borderWidth: 1,
    margin: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  suggestionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#9CA3AF',
  },
  noSuggestions: {
    padding: 16,
    textAlign: 'center',
    color: '#6B7280',
  },
  mainContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  topicGrid: {
    justifyContent: 'space-between',
  },
  topicCard: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
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
  topicTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});
