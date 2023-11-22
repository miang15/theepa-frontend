import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {
  AllAccounts,
  BackButton,
  CategoryCard,
  CustomGradient,
  CustomVendors,
  HeadingCross,
  LabelInput,
} from '../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import http from '../../../config/http';
import {CATEGORIES, ONBOARDING, STORAGE_KEYS} from '../../../config/endpoint';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {Modal, Portal} from 'react-native-paper';
import CustomText from '../../../components/CustomText/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import {useDispatch, useSelector} from 'react-redux';
import {setAppLoading} from '../../../redux/AppLoader/appLoaderAction';
import theme from '../../../utils/theme';
import {getDashboardAction} from '../../../redux/Dashboard/DashboardAction';
import {
  getLocalStorage,
  removeLocalStorage,
} from '../../../constants/functions';
import {Checkbox} from 'react-native-paper';
import {margin, scaleHeight} from '../../../utils/Layout';
import Tooltip from 'react-native-walkthrough-tooltip';
import analytics from '@react-native-firebase/analytics';

const AllCategory = ({navigation}) => {
  const dashboardData = useSelector(
    state => state?.DashboardReducer?.dashboard,
  );
  const allIcons = useSelector(state => state?.CategoryReducer?.categoryIcons);
  const accounts = useSelector(state => state?.DashboardReducer?.accounts);
  const [visible, setVisible] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [categoryname, setcategoryname] = useState('');
  const [categoryIcon, setcategoryIcon] = useState('');
  const [error, seterror] = useState({type: '', msg: ''});
  const [prompt, setprompt] = useState(false);
  const [allVendors, setAllVendors] = useState([]);
  const [showvendor, setshowvendor] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selected, setselected] = useState('All');
  const [allCategoryIcons, setAllCategoryIcons] = useState([]);
  const [allCategory, setallCategory] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    handlePrompt();
  }, []);

  useEffect(() => {
    if (allIcons?.length) {
      setAllCategoryIcons(allIcons);
    }
  }, [allIcons]);

  useEffect(() => {
    const vendorsArray = dashboardData?.userData?.categories.flatMap(
      item => item?.vendors,
    );
    if (dashboardData?.userData?.categories?.length) {
      setallCategory(dashboardData?.userData?.categories);
    } else {
      setallCategory([]);
    }
    setAllVendors(vendorsArray);
  }, [dashboardData]);

  const handlePrompt = async () => {
    const signupflow = await getLocalStorage(STORAGE_KEYS.CATEGORY_PROMPT);
    if (signupflow) {
      setprompt(true);
      removeLocalStorage(STORAGE_KEYS.CATEGORY_PROMPT);
    }
  };

  const handleAddCategory = async () => {
    try {
      seterror({type: '', msg: ''});

      if (!categoryname.toString().trim()) {
        seterror({type: 'categoryname', msg: 'Category Name is Required'});
      } else if (!categoryIcon) {
        seterror({type: 'icon', msg: 'Category Icon is Required'});
      } else {
        dispatch(setAppLoading(true));
        const addcategoryRes = await http.post(ONBOARDING.addcategory, {
          name: categoryname,
          icon: categoryIcon,
          vendors: selectedVendors,
        });

        if (addcategoryRes?.data?.success) {
          const result = dashboardData?.userData?.categories.reduce(
            (accumulator, category) => {
              const updatedVendors = category?.vendors.filter(vendor => {
                const matchIndex = selectedVendors.indexOf(vendor);
                if (matchIndex !== -1) {
                  selectedVendors.splice(matchIndex, 1);
                  return false;
                }
                return true;
              });

              if (updatedVendors.length !== category?.vendors.length) {
                accumulator.push({_id: category?._id, vendors: updatedVendors});
              }

              return accumulator;
            },
            [],
          );

          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            const updatecategoryRes = await http.put(
              `${CATEGORIES.updatecategory}/${element?._id}`,
              {vendors: element?.vendors},
            );
          }

          dispatch(getDashboardAction());
          setVisible(false);
          await analytics().logEvent('new_category', {
            description: `New category added by all category screen`,
          });
        }
      }
    } catch (error) {
      console.log('add category: ', error);
    }
  };

  const handleVendorSelection = vendor => {
    if (selectedVendors.includes(vendor)) {
      setSelectedVendors(selectedVendors.filter(item => item !== vendor));
    } else {
      setSelectedVendors([...selectedVendors, vendor]);
    }
  };
  const handleAddAccount = async () => {
    try {
      navigation.navigate('ManualAccount');
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <AllAccounts
        onPlus={handleAddAccount}
        data={accounts?.UserAccounts}
        onPress={val => {
          setselected(val);
        }}
        onPressAll={() => {
          setselected('All');
        }}
        selected={selected}
      />

      <CustomText textStyle={styles.category}>All Categories</CustomText>

      {allCategory?.length ? (
        <Tooltip
          contentStyle={styles.content}
          parentWrapperStyle={styles.accountwrapper}
          isVisible={prompt}
          onClose={() => setprompt(false)}
          arrowStyle={{
            marginTop: scaleHeight(0),
          }}
          childContentSpacing={scaleHeight(-15)}
          placement={'bottom'}
          content={
            <View>
              <AntDesign
                onPress={() => {
                  setprompt(false);
                }}
                style={styles.cross}
                name="closecircleo"
                size={18}
                color="black"
              />
              <CustomText
                textStyle={
                  styles.desc
                }>{`Set a monthly budget for each Category`}</CustomText>
              <CustomGradient
                onPress={() => {
                  setprompt(false);
                  navigation.navigate('BudgetStackScreens', {
                    screen: 'AddNewBudget',
                  });
                }}
                title={'Set now'}
                customView={{...margin(15, 0, 10, 0)}}
              />
            </View>
          }>
          <FlatList
            style={styles.expenselist}
            data={prompt ? allCategory?.slice(0, 6) : allCategory}
            numColumns={3}
            columnWrapperStyle={{alignSelf: 'center'}}
            renderItem={({item, index}) => {
              const imagePathRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
              const result =
                item?.budgets[0]?.spend > 0 && item?.budgets[0]?.amount > 0
                  ? item?.budgets[0]?.spend / item?.budgets[0]?.amount
                  : 0;
              const progress = result > 1 ? 1 : result;
              if (!imagePathRegex.test(item?.icon)) {
                return (
                  <CategoryCard
                    onPress={() =>
                      navigation.navigate('CategoryDetails', {details: item})
                    }
                    key={index}
                    category={item?.name}
                    emoji={item?.icon}
                    budget={item?.budgets[0]?.amount || null}
                    progress={progress}
                    spent={
                      item?.budgets?.length
                        ? item?.budgets[0]?.spend
                        : item?.spend
                    }
                  />
                );
              }
              return (
                <>
                  <CategoryCard
                    onPress={() =>
                      navigation.navigate('CategoryDetails', {details: item})
                    }
                    key={index}
                    category={item?.name}
                    Icon={{uri: item?.icon}}
                    budget={item?.budgets[0]?.amount || null}
                    progress={progress}
                    spent={
                      item?.budgets?.length
                        ? item?.budgets[0]?.spend
                        : item?.spend
                    }
                  />
                </>
              );
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </Tooltip>
      ) : null}
      <CustomGradient
        customView={styles.btn}
        onPress={() => setVisible(true)}
        title={'+ Add New Category'}
      />

      <Portal>
        <Modal
          style={styles.modalView}
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.containerStyle}>
          <HeadingCross
            label={'Create Category'}
            onCross={() => setVisible(false)}
          />
          <LabelInput
            label={'Category Name'}
            placeholder={'Write Category Name'}
            value={categoryname}
            onChangeText={setcategoryname}
            customView={styles.modalinput}
          />

          {error?.type == 'categoryname' ? (
            <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
          ) : null}
          <CustomVendors
            vendors={allVendors}
            selectedvendor={selectedVendors}
            handleVendor={val => handleVendorSelection(val)}
            onCross={ind => {
              const updatedArray = [...selectedVendors];
              updatedArray.splice(ind, 1);
              setSelectedVendors(updatedArray);
            }}
          />

          <Portal>
            <Modal
              style={styles.vendorView}
              visible={showvendor}
              onDismiss={() => setshowvendor(false)}
              contentContainerStyle={styles.vendorContainer}>
              <Ionicons
                style={styles.vendorclose}
                onPress={() => setshowvendor(false)}
                name="close-sharp"
                size={24}
                color={theme.black}
              />
              <CustomText
                textStyle={
                  styles.vendordesc
                }>{`Which of these vendors should we categorize under ${categoryname}?`}</CustomText>
              <FlatList
                style={styles.vendorlist}
                data={allVendors}
                renderItem={({item, index}) => {
                  return (
                    <View key={index} style={styles.vendorrow}>
                      <Checkbox
                        status={
                          selectedVendors.includes(item)
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          handleVendorSelection(item);
                        }}
                        color={theme.skyblue}
                        uncheckedColor={theme.black}
                      />
                      <CustomText
                        textStyle={styles.vendorItem}
                        numberOfLines={1}>
                        {item}
                      </CustomText>
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
              />
              <CustomButton
                onPress={() => setshowvendor(false)}
                title={'Done'}
                customStyle={styles.done}
              />
            </Modal>
          </Portal>
          {error?.type == 'vendors' ? (
            <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
          ) : null}
          <CustomText textStyle={styles.selecticon}>Select an icon</CustomText>
          {allCategoryIcons?.length ? (
            <FlatList
              numColumns={5}
              style={styles.iconlist}
              data={allCategoryIcons}
              renderItem={({item, index}) => {
                const imagePathRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setcategoryIcon(item?.Url)}
                    activeOpacity={theme.opacity}
                    style={{
                      ...styles.iconview,
                      backgroundColor:
                        categoryIcon == item?.Url
                          ? theme.brightgreen
                          : theme.offwhite,
                    }}>
                    {imagePathRegex.test(item?.Url) ? (
                      <Image
                        style={{
                          ...styles.img,
                          tintColor:
                            categoryIcon == item?.Url
                              ? theme.white
                              : theme.secondary,
                        }}
                        source={{uri: item?.Url}}
                        resizeMode="contain"
                      />
                    ) : (
                      <CustomText textStyle={styles.emoji}>
                        {item?.Url}
                      </CustomText>
                    )}
                  </TouchableOpacity>
                );
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
            />
          ) : null}
          <CustomText
            onPress={() => setShowEmoji(true)}
            textStyle={styles.viewmore}>
            view more
          </CustomText>
          <Portal>
            <Modal
              visible={showEmoji}
              onDismiss={() => setShowEmoji(false)}
              contentContainerStyle={styles.emojiModal}>
              <Entypo
                onPress={() => setShowEmoji(false)}
                style={styles.cross}
                name="cross"
                size={24}
                color={theme.black}
              />
              <EmojiSelector
                category={Categories.symbols}
                showSearchBar={false}
                showSectionTitles={false}
                onEmojiSelected={emoji => {
                  setcategoryIcon(emoji);
                  setAllCategoryIcons([...allCategoryIcons, {Url: emoji}]);
                  setShowEmoji(false);
                }}
              />
            </Modal>
          </Portal>
          {error?.type == 'icon' ? (
            <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
          ) : null}
          <CustomGradient
            customView={styles.setcategory}
            onPress={handleAddCategory}
            title={'Add Category'}
          />
        </Modal>
      </Portal>
    </View>
  );
};

export default AllCategory;
