import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {Text, Card, Button, Image} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {fetchNews} from '../store/newsSlice';
import {RootState} from '../store';

export default function NewsScreen() {
  const dispatch = useDispatch();
  const {articles, loading, error} = useSelector(
    (state: RootState) => state.news,
  );

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={item => item.url}
        renderItem={({item}) => (
          <Card>
            <Card.Title>{item.title}</Card.Title>
            <Card.Divider />
            {item.urlToImage && (
              <Image
                source={{uri: item.urlToImage}}
                style={styles.image}
                PlaceholderContent={<ActivityIndicator />}
              />
            )}
            <Text style={styles.description}>{item.description}</Text>
            <Button
              title="Read more"
              onPress={() => Linking.openURL(item.url)}
              type="clear"
            />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    marginBottom: 10,
  },
  image: {
    aspectRatio: 16 / 9,
    width: '100%',
    marginBottom: 10,
  },
});
