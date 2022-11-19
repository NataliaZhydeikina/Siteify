import React, { useReducer } from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
  Linking,
  Text
} from 'react-native';
import Title from './Title';
import { NativeModules } from 'react-native';
const { SiteModule } = NativeModules;

function reducer(state, action) {
  switch (action.type) {
    case 'changeUrl':
      return Object.assign({}, state, {
        error: '',
        url: action.payload
      });
    case 'request':
      return Object.assign({}, state, {
        url: '',
        prevUrl: state.url,
        btnState: false,
        title: "Title: " + action.payload,
        error: ''
      });
    case 'btnDisable':
      return Object.assign({}, state, {
        btnState: true
      });
    case 'error':
      return Object.assign({}, state, {
        url: '',
        btnState: false,
        title: '',
        error: 'Something wrong with with url or with internet connection'
      });
  }
}

const SiteContainer = () => {
  const [state, dispatch] = useReducer(reducer, {
    title: '',
    error: '',
    url: 'https://www.google.com/',
    prevUrl: 'https://www.google.com/',
    btnState: false
  });

  const onPress = () => {
    dispatch({ type: 'btnDisable' });
    SiteModule.request(state.url, (t) => {
      if (t !== "Error") {
        dispatch({ type: 'request', payload: t });
      } else {
        dispatch({ type: 'error' });
      }
    });
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(e) => dispatch({ type: 'changeUrl', payload: e })}
        value={state.url}
        placeholder="https://"
      />
      <Button
        onPress={onPress}
        title="Get title" disabled={state.btnState} />
      <Text style={styles.link}
        onPress={() => Linking.openURL(state.prevUrl)}>
        {state.prevUrl}
      </Text>
      <Title title={state.title} error={state.error} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 60,
    paddingHorizontal: 24,
  },
  input: {
    height: 40,
    margin: 12,
    marginBottom: 30,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginBottom: 20,
    width: 200
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#42aaf5',
    fontSize: 20,
    textDecorationLine: 'underline'
  }
});

export default SiteContainer;
