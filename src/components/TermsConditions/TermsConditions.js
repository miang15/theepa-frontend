import React from 'react';
import CustomText from '../CustomText/CustomText';
import {styles} from './styles';
import {Linking} from 'react-native';

const TermsConditions = ({customDesc, customTerms}) => {
  return (
    <CustomText textStyle={[styles.desc, customDesc]}>
      {`By using this app you agree to our `}
      <CustomText
        onPress={() =>
          Linking.openURL(`https://theepa.app/terms-and-conditions/`)
        }
        textStyle={[
          styles.terms,
          customTerms,
        ]}>{`terms and conditions`}</CustomText>
      {` and `}
      <CustomText
        onPress={() => Linking.openURL(`https://theepa.app/privacy-policy/`)}
        textStyle={[styles.terms, customTerms]}>{`privacy policy`}</CustomText>
    </CustomText>
  );
};

export default TermsConditions;
