import { PermissionsAndroid, Platform, Linking, Alert } from 'react-native';

export const useCameraPermission = () => {
  const requestPermission = async () => {
    if (Platform.OS === 'ios') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to scan QR codes.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Permission Denied',
          'Enable camera in settings',
          [{ text: 'Open Settings', onPress: () => Linking.openSettings() }]
        );
        return false;
      }
      return true;
    } catch (err) {
      console.error('Permission error:', err);
      return false;
    }
  };

  return { requestPermission };
};
