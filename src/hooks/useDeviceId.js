import { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import { setDeviceId } from '../utils/storage';

const useDeviceId = () => {
  const [deviceId, setDeviceIdState] = useState(null);

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        let id = 'Unknown';

        if (Device.isDevice) {
          id = Device.osBuildId || Device.osInternalBuildId || 'Unknown';
        } else {
          id = 'Simulator';
        }

        setDeviceIdState(id);
        await setDeviceId(id) // Save to Secure Storage
      } catch (error) {
        console.error('Error fetching device ID:', error);
        setDeviceIdState('Error');
      }
    };

    fetchDeviceId();
  }, []);

  return deviceId;
};

export default useDeviceId;
