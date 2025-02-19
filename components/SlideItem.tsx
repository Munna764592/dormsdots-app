import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import {BlurView} from '@react-native-community/blur'; // for non-expo users

interface SlideItemProps {
  item: {
    img: any;
    title: string;
    description: string;
  };
}

const {width, height} = Dimensions.get('screen');

const SlideItem: React.FC<SlideItemProps> = ({item}) => {
  return (
    <View style={styles.container}>
      {/* Glass effect overlay */}
      <BlurView
        style={styles.absolute}
        blurType="light" // Adjust blur style
        blurAmount={60} // Adjust blur intensity
      />
      <Image
        className="my-6"
        source={item.img}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height: height * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 20,
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 255, 0.2)', // Optional for slight overlay color
  },
});
