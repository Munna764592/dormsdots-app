import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
  ListRenderItem,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import SlideItem from './SlideItem';
import Pagination from './Pagination';

interface SlideItem {
  id: string;
  img: any;
  title: string;
  description: string;
}

const Slides: SlideItem[] = [
  {
    id: '1',
    img: require('../assets/images/rb_29438.png'),
    title: 'First Slide',
    description: 'This is the first slide of the carousel',
  },
  {
    id: '2',
    img: require('../assets/images/rb_35054.png'),
    title: 'Second Slide',
    description: 'This is the second slide of the carousel',
  },
  {
    id: '3',
    img: require('../assets/images/rb_52338.png'),
    title: 'Third Slide',
    description: 'This is the third slide of the carousel',
  },
];

const Slider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: scrollX,
              },
            },
          },
        ],
        {
          useNativeDriver: false,
        },
      )(event);
    },
    [scrollX],
  );

  const handleOnViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any[]}) => {
      setIndex(viewableItems[0]?.index || 0);
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  
  return (
    <View style={styles.container}>
      <FlatList
        data={Slides}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={styles.contentContainer}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    borderRadius: 30, // Apply border radius to the container
    overflow: 'hidden', // Ensure content does not overflow the border
  },
  contentContainer: {
    borderRadius: 20, // Optional: Apply border radius to the content container
  },
});
