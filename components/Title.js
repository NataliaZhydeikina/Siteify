import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

const Title = ({ title, error }) => {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.error}>{error}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: '#ff0000',
    textAlign: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: "600"
  }
});

export default Title;
