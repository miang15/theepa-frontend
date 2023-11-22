import {View, Image} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styles} from './styles';
import theme from '../../utils/theme';
import Images from '../../constants/Images';
import CustomText from '../CustomText/CustomText';

const CustomPicker = ({
  placeholder,
  customContainer,
  customDropDown,
  data,
  setdata,
  height,
  title,
  setPickerValue,
  pickervalue,
  selectItem,
  label,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <View style={[styles.topview, customContainer]}>
      <CustomText textStyle={styles.label}>{label}</CustomText>
      <DropDownPicker
        maxHeight={height}
        open={open}
        disabled={disabled}
        value={pickervalue}
        placeholder={placeholder}
        placeholderStyle={styles.placeholderStyle}
        items={data}
        listItemLabelStyle={styles.listItemLabelStyle}
        setOpen={setOpen}
        setValue={setPickerValue}
        setItems={setdata}
        onSelectItem={selectItem}
        containerStyle={styles.containerview}
        style={styles.dropdown}
        listMode="MODAL"
        modalTitle={title}
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        dropDownContainerStyle={[styles.dropdowncontainer, customDropDown]}
        showTickIcon
        ArrowDownIconComponent={() => (
          // <View style={styles.imgview}>
          <Image
            source={Images.dropdown}
            // style={theme.img}
            resizeMode="cover"
          />
          // </View>
        )}
        TickIconComponent={() => (
          <AntDesign name="checkcircle" color={theme.secondary} size={20} />
        )}
      />
    </View>
  );
};

export default CustomPicker;
