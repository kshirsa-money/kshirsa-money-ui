import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Colors from '../../styles/Colors';
import addTransactionStyles2 from '../../styles/stylesAddTransaction2';
import { TransactionTypesToMap } from '../../constants/utils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { KshirsaAlert } from '../../small-components/KshirsaAlert';
import deleteTransactionAction from '../../redux/actions/deleteTransactionAction';
import { handleBackNavigation } from '../../utils/utilityFunction';

const AddTransactionHeader = ({
  formData,
  setFormData,
  transactionTypeDropdownOpen,
  setTransactionTypeDropdownOpen,
  editTransaction
}) => {
  const router = useRouter();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dropdownAnim = useRef(new Animated.Value(0)).current;
  const dropdownScaleAnim = useRef(new Animated.Value(0)).current;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Separate visibility state
  const { transactionId } = useLocalSearchParams();
  const headerText = editTransaction ? 'Edit Your' : 'Add New';

  const dispatch = useDispatch();
  const { loading: viewTransactionLoading, success: viewTransactionSuccess } = useSelector((state) => state.getTransactionReducer);
  const disabledDelete = viewTransactionLoading || !viewTransactionSuccess;

  useEffect(() => {
    if (transactionTypeDropdownOpen) {
      setIsDropdownVisible(true); // Show dropdown
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      Animated.timing(dropdownAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();

      Animated.timing(dropdownAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setIsDropdownVisible(false); // Hide dropdown after animation
      });
    }
  }, [transactionTypeDropdownOpen]);

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      transactionType: type,
    }));
    setTransactionTypeDropdownOpen(false);
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const dropdownTranslateY = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  const dropdownScale = dropdownScaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1],
  });

  const handleDelete = () => {
    KshirsaAlert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(deleteTransactionAction({ transactionId: String(transactionId) }));
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleBackPress = () => {
    // if (editTransaction) {
      setFormData({});
      handleBackNavigation(router);
    // }
  }
  return (
    <KeyboardAvoidingView>
      <View>
        <View style={[addTransactionStyles2.headerContainer, {justifyContent: editTransaction ? 'space-between' : 'flex-start'}]}>
          <TouchableOpacity style={addTransactionStyles2.backButton} onPress={handleBackPress}>
            <Entypo name="chevron-left" size={24} color={Colors.white} />
          </TouchableOpacity>
          <View style={addTransactionStyles2.addNewTransactionTextWrapper}>
            <Text style={addTransactionStyles2.addText}>{headerText}</Text>
            <TouchableOpacity
              style={addTransactionStyles2.transactionTypeBtn}
              onPress={() =>
                setTransactionTypeDropdownOpen((prev) => !prev)
              }
            >
              <Text style={addTransactionStyles2.transactionTypeTxt}>
                {formData.transactionType?.toLowerCase()}
              </Text>
              <Animated.View
                style={{ transform: [{ rotate: rotateInterpolate }] }}
              >
                <Entypo
                  name="chevron-small-down"
                  size={24}
                  color={Colors.white}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
          {editTransaction &&
            <TouchableOpacity
              onPress={handleDelete}
              disabled={disabledDelete}
              style={[disabledDelete && { opacity: 0.2 },]}
            >
              <AntDesign
                name="delete"
                size={24}
                color={Colors.white}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>}
          {isDropdownVisible && (
            <Animated.View
              style={[
                addTransactionStyles2.transactionTypeDropdown,
                {
                  transform: [
                    { translateY: dropdownTranslateY },
                    { scale: dropdownScale }, // Add scale transformation
                  ],
                }, ,
              ]}
            >
              {TransactionTypesToMap.map((item, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    onPress={() => handleTypeChange(item)}
                  >
                    <Text
                      style={
                        formData.transactionType === item
                          ? addTransactionStyles2.transactionTypeTxtMap
                          : addTransactionStyles2.transactionTypeTxtnonSelected
                      }
                    >
                      {item?.toLowerCase()}
                    </Text>
                  </TouchableOpacity>
                  {index !== TransactionTypesToMap.length - 1 && (
                    <View
                      style={{
                        backgroundColor: Colors.darkGrey,
                        width: 2,
                        height: 20,
                        marginTop: 4,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Animated.View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddTransactionHeader;