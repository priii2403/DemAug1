import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ImeiScanner = ({ onScan, onCancel }) => {
  return (
    <QRCodeScanner
      onRead={onScan}
      reactivate={true}
      reactivateTimeout={5000}
      showMarker={true}
      markerStyle={styles.marker}
      cameraStyle={styles.camera}
      topContent={
        <Text style={styles.scannerText}>
          Point your camera at a QR code containing IMEI
        </Text>
      }
      bottomContent={
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  marker: {
    borderColor: '#f4a261',
    borderWidth: 2,
    width: 300,
    height: 150,
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerText: {
    fontSize: 18,
    padding: 20,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  buttonContainer: {
    padding: 20,
  },
  cancelButton: {
    backgroundColor: '#f4a261',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ImeiScanner;
