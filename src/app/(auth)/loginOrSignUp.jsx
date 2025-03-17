import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import imagePath from '../../constants/imagePath';
import logoStyles from '../../styles/logoStyles';
import loginOrSignupStyles from '../../styles/stylesLoginOrSignup';
import KshirsaButton from '../../small-components/KshirsaButton';
import KshirsaInput from '../../small-components/KshirsaInput';
import { STANDARD_EMAIL_REGEX } from '../../constants/utils';
import { INVALID_FORMAT_EMAIL } from '../../constants/validationMessage';
import { router, useRouter } from 'expo-router';
import uiRoutes from '../../constants/uiRoutes';
import Colors from '../../styles/Colors';
import { useDispatch, useSelector } from 'react-redux';
import generateOtpAction from '../../redux/actions/generateOtpAction';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import uiText from '../../constants/uiTexts';
import { saveAuthData } from '../../utils/database';
import AlertComponent, { KshirsaAlert } from '../../small-components/KshirsaAlert';
import KshirsaLoadingScreen from '../../small-components/KshirsaLoading';

const LoginOrSignUp = () => {
  const router = useRouter();
  const generateOtp = useSelector((state) => state.generateOtpReducer) || {};
  const { data, loading, success, error } = generateOtp;
  const dispatch = useDispatch();
  const [email, setEmail] = useState({
    value: '',
    isValid: false,
    errorMessage: '',
  });

  useEffect(() => { 
    if (success && !loading) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: uiText.OTP_SEND_SUCCESS,
        titleStyle: { color: Colors.secondary },
        })
      router.navigate(uiRoutes.otp)
    }
    if(!success && error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: uiText.OTP_SEND_ERROR,
        titleStyle: { color: Colors.red },
        toastStyle: { backgroundColor: Colors.moodyBlack },
        autoClose: false,
        })
    }
  }, [success])
 

    const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleEmailChange = (text) => {
    setEmail((prev) => ({ ...prev, value: text }));
    if (STANDARD_EMAIL_REGEX.test(text)) {
      setEmail({
        value: text,
        isValid: true,
        errorMessage: '',
      });
    } else {
      setEmail({
        value: text,
        isValid: false,
        errorMessage: INVALID_FORMAT_EMAIL,
      });
    }
  };

  const handleNextClick = () => {
    if (!email.isValid) {
      setEmail((prev) => ({ ...prev, errorMessage: INVALID_FORMAT_EMAIL }));
      return
    }
    dispatch(generateOtpAction({
      queryParams: { email: email.value?.toLocaleLowerCase()}
    }))
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} style={{ flex: 1, backgroundColor: Colors.moodyBlack }}>
        <View style={loginOrSignupStyles.mainContainer}>
            <View style={loginOrSignupStyles.container}>
              <Image source={imagePath.logoPath} style={logoStyles.mediumLogo} />
              <View style={loginOrSignupStyles.titleTextsWrapper}>
                <Text style={loginOrSignupStyles.titleText}>
                  {uiText.ENTER_EMAIL_BEGIN}
                </Text>
              </View>
              <KshirsaInput
                onChangeText={handleEmailChange}
                value={email.value}
                needSuccessSymbol={true}
                isValid={email.isValid}
                errorMessage={email.errorMessage}
                type="email"
              />
            </View>
          {loading &&<KshirsaLoadingScreen />}
        <View style={loginOrSignupStyles.buttonWrapper}>
          <Text style={loginOrSignupStyles.verifyText}>
            {uiText.VERIFY_EMAIL_SUB_TEXT}
          </Text>
          <KshirsaButton
            title="Next"
            onPress={handleNextClick}
            disabled={!email.isValid}
          />
        </View>
        </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginOrSignUp;


const styles = StyleSheet.create({
  dialogContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dialogButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});