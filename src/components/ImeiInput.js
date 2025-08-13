import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ImeiInput = ({ value, onChange, onScanPress }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="IMEI"
        keyboardType="numeric"
        maxLength={15}
      />
      <TouchableOpacity onPress={onScanPress} style={styles.iconContainer}>
        <Ionicons name="qr-code-outline" size={30} color="#f4a261" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#b6bcc8',
    elevation: 2,
    width: '100%',
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  iconContainer: {
    padding: 15,
  },
});

export default ImeiInput;
