import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Text, Button, Icon} from 'react-native-elements';
import {useTheme} from '../contexts/ThemeContext';
import {useSelector, useDispatch} from 'react-redux';
import {ref, push, set} from 'firebase/database';
import {database} from '../firebase/config';
import {RootState} from '../store';

export default function Comment({comment, postId, commentId, depth = 0}) {
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleAddReply = () => {
    if (replyText.trim()) {
      const replyRef = push(
        ref(database, `posts/${postId}/comments/${commentId}/replies`),
      );
      set(replyRef, {
        content: replyText,
        author: user.displayName,
        authorId: user.uid,
        createdAt: Date.now(),
      });
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  return (
    <View style={[styles.container, {marginLeft: depth * 20}]}>
      {depth > 0 && (
        <View
          style={[
            styles.connectionLine,
            {backgroundColor: theme === 'dark' ? '#FFFFFF' : '#000000'},
          ]}
        />
      )}
      <View style={styles.commentContent}>
        <Text
          style={{
            fontWeight: 'bold',
            color: theme === 'dark' ? '#FFFFFF' : '#000000',
          }}>
          {comment.author}
        </Text>
        <Text style={{color: theme === 'dark' ? '#B0B0B0' : '#666666'}}>
          {comment.content}
        </Text>
        <TouchableOpacity
          onPress={() => setShowReplyInput(!showReplyInput)}
          style={styles.replyButton}>
          <Icon
            name="reply"
            size={16}
            color={theme === 'dark' ? '#BB86FC' : '#6200EE'}
          />
          <Text
            style={{
              color: theme === 'dark' ? '#BB86FC' : '#6200EE',
              marginLeft: 5,
            }}>
            Reply
          </Text>
        </TouchableOpacity>
        {showReplyInput && (
          <View style={styles.replyInput}>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme === 'dark' ? '#FFFFFF' : '#000000',
                  borderColor: theme === 'dark' ? '#FFFFFF' : '#000000',
                },
              ]}
              value={replyText}
              onChangeText={setReplyText}
              placeholder="Write a reply..."
              placeholderTextColor={theme === 'dark' ? '#B0B0B0' : '#666666'}
            />
            <Button title="Post" onPress={handleAddReply} />
          </View>
        )}
      </View>
      {comment.replies &&
        Object.entries(comment.replies).map(([replyId, replyData]) => (
          <Comment
            key={replyId}
            comment={replyData}
            postId={postId}
            commentId={replyId}
            depth={depth + 1}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  commentContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 10,
    borderRadius: 5,
  },
  connectionLine: {
    position: 'absolute',
    left: -10,
    top: 0,
    bottom: 0,
    width: 2,
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  replyInput: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
