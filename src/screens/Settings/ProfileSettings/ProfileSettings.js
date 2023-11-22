import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {styles} from './styles';
import theme from '../../../utils/theme';
import Images from '../../../constants/Images';
import ImageCropPicker from 'react-native-image-crop-picker';
import CustomText from '../../../components/CustomText/CustomText';
import ToggleSwitch from 'toggle-switch-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userUpdateAction} from '../../../redux/Auth/authAction';
import {BackButton, CustomGradient} from '../../../components';
import {margin} from '../../../utils/Layout';
import analytics from '@react-native-firebase/analytics';

const ProfileSettings = ({navigation}) => {
  const user = useSelector(state => state?.auth?.user);
  const [image, setimage] = useState(user?.profilepic || '');
  const [imagedata, setimagedata] = useState('');
  const [disable, setdisable] = useState(true);
  const [sync, setsync] = useState(user?.isSync || false);
  const [name, setname] = useState(user?.name || '');
  const inputref = useRef();
  const dispatch = useDispatch();

  const handlePickImage = async () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setimage(image?.path);
        setimagedata(image);
      })
      .catch(e => {
        console.log('pick image', e);
      });
  };

  const handleUpdate = async () => {
    try {
      const filename = image?.split('/').pop();

      const data = new FormData();
      if (image)
        data.append('Image', {
          uri: image,
          name: filename,
          type: imagedata.mime,
        });
      if (name.toString().trim()) data.append('name', name);
      data.append('isSync', sync);
      dispatch(userUpdateAction(data));
      setdisable(true);
      await analytics().logEvent('update_profile', {
        description: `update profile`,
      });
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 10}}>
        <BackButton />
        <CustomText style={styles.settingstitle}>Settings</CustomText>
        <View style={styles.container2}>
          <TouchableOpacity
            disabled={disable}
            onPress={handlePickImage}
            style={styles.imgview}
            activeOpacity={theme.opacity}>
            <Image
              resizeMode="cover"
              style={{...theme.img, tintColor: image ? null : theme.secondary}}
              source={image ? {uri: image} : Images.user}
            />
          </TouchableOpacity>
          <View style={{width: '60%', alignSelf: 'center'}}>
            <TextInput
              ref={inputref}
              value={name}
              onChangeText={setname}
              editable={!disable}
              placeholder="Your name"
              style={styles.input}
            />
            <CustomText
              textStyle={{
                ...margin(2, 0, 0, 10),
                fontSize: 12,
                fontFamily: theme.sandregular,
                color: theme.lightgray,
              }}>
              {user.email}
            </CustomText>
          </View>
          <TouchableOpacity
            activeOpacity={theme.opacity}
            onPress={() => {
              setdisable(false);
              setTimeout(() => {
                inputref.current.focus();
              }, 100);
            }}>
            <Image source={Images.editicon} style={styles.editicon} />
          </TouchableOpacity>
        </View>
        <View style={styles.row2}>
          <CustomText numberOfLines={1} textStyle={styles.sync}>
            Message syncing
          </CustomText>
          <ToggleSwitch
            isOn={sync}
            onColor={theme.secondary}
            offColor={theme.gray}
            size="small"
            onToggle={isOn => setsync(isOn)}
          />
        </View>
        <CustomGradient
          title={'Update'}
          onPress={handleUpdate}
          customView={{...margin(40, 0, 0, 0)}}
        />
      </View>
    </View>
  );
};

export default ProfileSettings;
