import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from 'react-native';
import {Text, Icon, Image, Button} from 'react-native-elements';
import {useTheme} from '../contexts/ThemeContext';
import {useDispatch} from 'react-redux';
import {upvotePost} from '../store/postsSlice';
import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowUpSquare,
  CircleArrowDown,
  CircleArrowOutUpRight,
  CirclePower,
  Dot,
  EllipsisVertical,
  Forward,
  LucideFastForward,
  MessageCircle,
  MessageSquare,
  PhoneForwarded,
  Send,
} from 'lucide-react-native';
import ImageZoomViewer from './ImageZoomViewer';

interface PostProps {
  post: {
    id: string;
    title: string;
    content?: string;
    author: string;
    imageUrl?: string;
    upvotes: number;
    comments: number;
  };
  onPress: () => void;
}

const Post: React.FC<PostProps> = ({post, onPress}) => {
  const {theme, isDarkMode} = useTheme();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const handleUpvote = () => {
    dispatch(upvotePost(post.id));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this post on CampusConnect: ${post.title}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const images = [
    {
      url: 'https://example.com/image.jpg', 
    },
  ];

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          {backgroundColor: theme.background, borderBottomColor: theme.tabbg},
        ]}>
        <View className="rounded-lg">
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri: 'https://res.cloudinary.com/depqvqscd/image/upload/v1738930571/verbi2v7esfzc2ozcmkg.jpg',
                }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                }}
                onError={e =>
                  console.log('Image failed to load:', e.nativeEvent.error)
                }
              />
              <Text
                style={{color: isDarkMode ? 'white' : 'black', marginLeft: 8}}
                className="text-sm">
                r/views hello
              </Text>
              <Dot color="#3C3D37" />
              <Text style={{color: '#3C3D37'}}>15h</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <EllipsisVertical color="#3C3D37" />
            </TouchableOpacity>
          </View>

          <View className="my-3 mx-2">
            <Text
              style={[
                styles.textSemiBold,
                {color: isDarkMode ? 'white' : 'black'},
              ]}
              className="font-bold text-xl">
              hello this keep me that he udhbdi ugdb ufvjf jufb fjhfbf yf fhfbh
              hgfiugb jhfbfh f ifb ifbf fif fyhf fih jhfgufh uyfgfh uyf
            </Text>
            <View
              className="my-2"
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ImageZoomViewer />
            </View>

            {/* Image */}
            {post.imageUrl && (
              <Image
                source={{uri: post.imageUrl}}
                className="w-full h-40 mt-2 rounded-lg"
                onLoadStart={() => setIsVisible(true)}
                onLoadEnd={() => setIsVisible(false)}
              />
            )}
            {isVisible && (
              <ActivityIndicator color={isDarkMode ? '#FFFFFF' : '#000000'} />
            )}
          </View>
        </View>
        <View style={styles.stats}>
          <View className="flex-row">
            <TouchableOpacity onPress={handleUpvote} style={styles.statItem}>
              <ArrowBigUp
                strokeWidth={1}
                size={30}
                color={isDarkMode ? 'white' : 'gray'}
              />
              <Text
                style={[
                  styles.statText,
                  {color: isDarkMode ? '#FFFFFF' : 'gray'},
                ]}>
                {post.upvotes}
              </Text>
            </TouchableOpacity>
            <View className="w-px h-7 bg-gray-400 opacity-50 mx-[8px]" />
            <TouchableOpacity onPress={handleUpvote} style={styles.statItem}>
              <ArrowBigDown
                strokeWidth={1}
                size={30}
                color={isDarkMode ? 'white' : 'gray'}
              />
            </TouchableOpacity>
            <View className="w-px h-7 bg-gray-400 opacity-50 mx-[8px]" />
            <TouchableOpacity onPress={handleUpvote} style={styles.statItem}>
              <MessageSquare
                strokeWidth={1}
                size={20}
                color={isDarkMode ? 'white' : 'gray'}
              />
              <Text
                className="ml-[4px]"
                style={[{color: isDarkMode ? '#FFFFFF' : 'gray'}]}>
                {post.upvotes}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleShare} style={styles.statItem}>
            <Send size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ptx: {
   fontWeight:700
  },
  posttxt: {
    color: 'white',
  },
  container: {
    padding: 15,
    borderBottomWidth: 1,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 0,
    marginRight: 4,
  },
   textSemiBold: {
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Post;
