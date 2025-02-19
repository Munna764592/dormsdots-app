import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Dimensions} from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { useTheme } from '../contexts/ThemeContext';

const {height, width} = Dimensions.get('window');

const ImageViewer = () => {
  const {theme} = useTheme();
  const [visible, setVisible] = useState(false);

  const imageUrl =
    'https://res.cloudinary.com/depqvqscd/image/upload/v1738930571/verbi2v7esfzc2ozcmkg.jpg';

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* Small Preview Image */}
      <View className="px-4 w-full">
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            source={{uri: imageUrl}}
            style={{
              width: width * 0.9,
              height: 200,
              borderRadius: 20,
              borderWidth: 1.5, // Border width
              borderColor: theme.tabbg, // Border color
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      {/* Full-Screen Zoom Viewer */}
      <ImageViewing
        images={[{uri: imageUrl}]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};

export default ImageViewer;
