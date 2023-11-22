import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import SmsAndroid from 'react-native-get-sms-android';
import http from '../config/http';
import {ACCOUNT, REGEX, STORAGE_KEYS} from '../config/endpoint';
import theme from '../utils/theme';
import {BankKeywords} from '../DummyData/DummyData';
import {store} from '../redux/store';
import {setAppLoading} from '../redux/AppLoader/appLoaderAction';
import analytics from '@react-native-firebase/analytics';

export const setLocalStorage = async (key, value) => {
  return await AsyncStorage.setItem(key, value);
};

export const removeLocalStorage = async key => {
  return await AsyncStorage.removeItem(key);
};

export const clearLocalStorage = async () => {
  return await AsyncStorage.clear();
};

export const getLocalStorage = async key => {
  return await AsyncStorage.getItem(key);
};

export const checksmspermission = async () => {
  const granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_SMS,
  );

  return granted;
};

export const getRandomRelatedColor = () => {
  const randomColor = getRandomElement(theme.graphcolors);
  const relatedColor = theme.graphcolors.reduce((acc, curr) =>
    getColorDifference(randomColor, curr) < getColorDifference(randomColor, acc)
      ? curr
      : acc,
  );

  return relatedColor;
};

const getRandomElement = array =>
  array[Math.floor(Math.random() * array.length)];

const getColorDifference = (color1, color2) =>
  Math.abs(parseInt(color1.slice(1), 16) - parseInt(color2.slice(1), 16));

export const getRandomColor = () => {
  const graphColors = theme.graphcolors;

  let availableColors = [...graphColors];

  if (availableColors.length === 0) {
    const baseColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return baseColor;
  }

  const randomIndex = Math.floor(Math.random() * availableColors.length);
  const color = availableColors[randomIndex];
  availableColors.splice(randomIndex, 1); // Remove the selected color from available colors

  return color;
};

export const requestSmsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'SMS Read Permission',
        message:
          'To automatically record your expenses, we need to read your SMS Notifications',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Add Expenses Manually',
        buttonPositive: 'Automatically Add Expenses',
      },
    );

    await analytics().logEvent('request_sms_permission', {
      description: 'Request sms permission for sms syncing',
      value: granted,
    });

    return granted;
  } catch (err) {
    console.log('request permission ', err);
  }
};

function filterSMSWithOTP(smsList) {
  const otpKeywords = ['otp', 'one time password'];

  const filteredSMS = smsList.filter(item => {
    const smsBody = item?.sms.toLowerCase();

    const containsOTP = otpKeywords.some(keyword => smsBody.includes(keyword));

    return !containsOTP; // Return messages that do not contain OTP keywords
  });

  return filteredSMS;
}

export const handleExtraSms = async (data, newsms) => {
  try {
    const transactionsms = await filterSMSWithOTP(data);

    const sms = await getLocalStorage(STORAGE_KEYS.EXTRA_SMS);
    const parseSms = JSON.parse(sms);

    if (parseSms?.length && !newsms) return;
    if (transactionsms?.length) {
      const sendAll = await http.post(REGEX.allSms, {smsArray: transactionsms});
      if (sendAll?.data?.success) {
        await setLocalStorage(
          STORAGE_KEYS.EXTRA_SMS,
          JSON.stringify(transactionsms),
        );
      }
      await analytics().logEvent('unmatched_sms', {
        description: 'Bank SMS not be processed',
      });
    }
  } catch (error) {
    console.log('extra sms', error);
  }
};

export const getDeviceSms = async () => {
  try {
    const currentDate = new Date();
    const sevenDaysBeforeDate = new Date(
      currentDate.getTime() - 30 * 24 * 60 * 60 * 1000,
    );
    const timestamp = sevenDaysBeforeDate.getTime();

    var filter = {
      box: 'inbox',
      maxDate: Date.now(),
      minDate: timestamp,
    };

    return new Promise((resolve, reject) => {
      SmsAndroid.list(
        JSON.stringify(filter),
        fail => {
          console.log('Failed with this error: ' + fail);
          reject(fail);
        },
        async (count, smsList) => {
          const arr = JSON.parse(smsList);
          const currentDateTime = new Date().getTime();
          await setLocalStorage(
            STORAGE_KEYS.LATEST_SYNCED_TIME,
            currentDateTime.toString(),
          );
          await analytics().logEvent('initial_sms_syncing', {
            description: 'Syncing sms of last 30 days',
          });
          resolve(arr);
        },
      );
    });
  } catch (error) {
    console.log('get device sms: ', error);
  }
};

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${word}&inputtype=textquery&key=YOUR_API_KEY`
//       );

//       if (response.data && response.data.candidates.length > 0) {
//         const { types } = response.data.candidates[0];
//         const isStore = types.includes('store');
//         setPlaceType(isStore ? 'Store' : 'Place');
//       } else {
//         setPlaceType('Unknown');
//       }
//     } catch (error) {
//       console.log('Error fetching place details:', error);
//     }
//   };

//   fetchData();
// }, [word]);

export const compareAccountNumbers = (accountNumber1, accountNumber2) => {
  if (accountNumber1?.length !== accountNumber2?.length) {
    if (accountNumber1?.slice(-3) !== accountNumber2?.slice(-3)) {
      return false;
    }
  } else {
    for (let i = 0; i < accountNumber1?.length; i++) {
      const char1 = accountNumber1.charAt(i);
      const char2 = accountNumber2.charAt(i);

      if (
        char1 !== char2 &&
        char1 !== '*' &&
        char2 !== '*' &&
        char1 !== '.' &&
        char2 !== '.' &&
        char1 !== '-' &&
        char2 !== '-' &&
        char1.toLowerCase() !== 'x' &&
        char2.toLowerCase() !== 'x'
      ) {
        return false;
      }
    }
  }

  return true;
};

export const countMatchingKeywords = sms => {
  const smsWords = sms.toLowerCase().split(/\W+/);
  let matchCount = 0;

  BankKeywords.forEach(keyword => {
    if (smsWords.includes(keyword)) {
      matchCount++;
    }
  });

  return matchCount;
};
