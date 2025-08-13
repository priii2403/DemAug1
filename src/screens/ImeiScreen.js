import React, { useState, useEffect } from 'react';
import { View, Alert, Linking, StyleSheet } from 'react-native';
import ImeiInput from '../components/ImeiInput';
import ImeiScanner from '../components/ImeiScanner';
import { isValidImei } from '../utils/imei';
import { useCameraPermission } from '../hooks/useCameraPermission';

const ImeiScreen = () => {
  const [imei, setImei] = useState('');
  const [scanning, setScanning] = useState(false);
  const { requestPermission } = useCameraPermission();

  useEffect(() => {
    const handleDeepLink = async (event) => {
      const url = event?.url || await Linking.getInitialURL();
      if (!url) return;

      try {
        const parsedUrl = new URL(url);
        const imeiFromLink = parsedUrl.searchParams.get('imei');
        if (imeiFromLink && isValidImei(imeiFromLink)) {
          setImei(imeiFromLink);
          Alert.alert('Deep Link', `IMEI set from deep link: ${imeiFromLink}`);
        } else if (imeiFromLink) {
          Alert.alert('Invalid Deep Link', 'The provided IMEI is invalid.');
        }
      } catch (err) {
        console.error('Deep link parse error:', err);
      }
    };

    handleDeepLink();
    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => subscription.remove();
  }, []);

  const handleManualChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setImei(numericText);
    if (numericText.length === 15 && !isValidImei(numericText)) {
      Alert.alert('Warning', 'IMEI must be a valid 15-digit number.');
    }
  };

  const startScanning = async () => {
    if (await requestPermission()) {
      setScanning(true);
    }
  };

  const handleScanSuccess = (e) => {
    const scannedData = e.data;
    setScanning(false);
    if (isValidImei(scannedData)) {
      setImei(scannedData);
      Alert.alert('Success', `Scanned IMEI: ${scannedData}`);
    } else {
      Alert.alert('Error', 'Invalid QR code. Please scan a valid IMEI.');
    }
  };

  return (
    <View style={styles.container}>
      {!scanning ? (
        <ImeiInput value={imei} onChange={handleManualChange} onScanPress={startScanning} />
      ) : (
        <ImeiScanner onScan={handleScanSuccess} onCancel={() => setScanning(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default ImeiScreen;
