import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {
  X,
  Users,
  ChevronDown,
  Image as ImageIcon,
  Link,
  Play,
  List,
  Gift,
} from 'lucide-react-native';

export default function CreateScreen() {
  const navigation = useNavigation();
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState('');

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 4,
      quality: 1,
    });

    if (!result.didCancel && result.assets) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...newImages]);
    }
  };

  const handlePost = () => {
    console.log({selectedCommunity, title, bodyText, images, tags});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.postButton, !title && styles.postButtonDisabled]}
            onPress={handlePost}
            disabled={!title}>
            <Text
              style={[
                styles.postButtonText,
                !title && styles.postButtonTextDisabled,
              ]}>
              Post
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.communitySelector}>
            <Users size={20} color="#FFFFFF" />
            <Text style={styles.communitySelectorText}>
              {selectedCommunity || 'Select a Circle'}
            </Text>
            <ChevronDown size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#666666"
            maxLength={300}
          />

          <TextInput
            style={styles.tagsInput}
            placeholder="Add tags & flair (optional)"
            value={tags}
            onChangeText={setTags}
            placeholderTextColor="#666666"
          />

          <TextInput
            style={styles.bodyInput}
            placeholder="Body text (optional)"
            value={bodyText}
            onChangeText={setBodyText}
            multiline
            placeholderTextColor="#666666"
            textAlignVertical="top"
          />

          {images.length > 0 && (
            <View style={styles.imagePreviewContainer}>
              {images.map((uri, index) => (
                <View key={index} style={styles.imagePreview}>
                  <Image source={{uri}} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }>
                    <X size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.toolbarContainer}>
          <View style={styles.toolbar}>
            <TouchableOpacity style={styles.toolbarButton} onPress={pickImage}>
              <ImageIcon size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarButton}>
              <Link size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarButton}>
              <Play size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarButton}>
              <List size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarButton}>
              <Gift size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 42,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
    backgroundColor: '#000000',
  },
  closeButton: {
    padding: 8,
  },
  postButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonDisabled: {
    backgroundColor: '#333333',
  },
  postButtonText: {
    color: '#000000',
    fontWeight: '600',
  },
  postButtonTextDisabled: {
    color: '#666666',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  communitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  communitySelectorText: {
    flex: 1,
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 16,
  },
  titleInput: {
    fontSize: 18,
    marginBottom: 16,
    color: '#FFFFFF',
    padding: 0,
  },
  tagsInput: {
    fontSize: 16,
    marginBottom: 16,
    color: '#FFFFFF',
    padding: 0,
  },
  bodyInput: {
    fontSize: 16,
    minHeight: 120,
    color: '#FFFFFF',
    padding: 0,
    marginBottom: 16,
  },
  toolbarContainer: {
    position: 'absolute',
    bottom: 20,
    left: '25%',
    transform: [{translateX: -50}],
    backgroundColor: '#222222',
    borderRadius: 50,
    padding: 8,
    elevation: 10, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
    borderRadius: 50,
    padding: 12,
  },
  toolbarButton: {
    padding: 12,
  },
});
