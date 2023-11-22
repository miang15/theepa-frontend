import SmsAndroid from 'react-native-get-sms-android';
import {
  compareAccountNumbers,
  countMatchingKeywords,
  getLocalStorage,
  handleExtraSms,
  setLocalStorage,
} from './functions';
import {STORAGE_KEYS} from '../config/endpoint';
import {useSelector} from 'react-redux';
import {handleAllTransactions} from './Transactions';
import {BankRegex, ignoreNumbers} from '../DummyData/DummyData';
import {AllRegex} from '../DummyData/AllRegex';
import analytics from '@react-native-firebase/analytics';

export const getNewSms = async (allBanksRegex, accounts, allCategory) => {
  try {
    const getCurrentDateStartTimestamp = () => {
      const currentDate = new Date(); // Get current date and time
      currentDate.setHours(0, 0, 0, 0); // Set the time to the start of the day (00:00:00)

      const timestamp = currentDate.getTime(); // Get the timestamp in milliseconds

      return timestamp;
    };

    const todayStartTimestamp = getCurrentDateStartTimestamp();

    const prevTime = await getLocalStorage(STORAGE_KEYS.LATEST_SYNCED_TIME);
    const currentDate = todayStartTimestamp;

    // 2 hours
    // const currentDate2 = new Date(); // Get the current date and time
    // const twoHoursAgo = new Date(currentDate2.getTime() - 3 * 60 * 60 * 1000); // Subtract 2 hours (2 * 60 minutes * 60 seconds * 1000 milliseconds)

    // const timestamp = twoHoursAgo.getTime();

    // 30 days
    // const currentDate3 = new Date();
    // const thirtyDaysBeforeDate = new Date(
    //   currentDate3.getTime() - 30 * 24 * 60 * 60 * 1000,
    // );
    // const timestamp = thirtyDaysBeforeDate.getTime();
    var filter = {
      box: 'inbox',
      maxDate: Date.now(),
      minDate: prevTime ? prevTime : currentDate,
      // minDate: currentDate,
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      async (count, smsList) => {
        const currentDateTime = new Date().getTime();
        await setLocalStorage(
          STORAGE_KEYS.LATEST_SYNCED_TIME,
          currentDateTime.toString(),
        );
        const arr = JSON.parse(smsList);
        if (arr?.length) {
          syncMessage(arr, allBanksRegex, accounts, allCategory);
        }
      },
    );
  } catch (error) {
    console.log('get new sms error: ', error);
  }
};

const syncMessage = async (sms, allBanksRegex, accounts, allCategory) => {
  if (sms?.length) {
    let banksms = [];
    let extraSms = [];
    let checked = [];
    await analytics().logEvent('get_new_sms', {
      description: 'Fetch new bank sms',
    });
    sms.forEach((item, index) => {
      allBanksRegex?.forEach(val => {
        if (
          val?.bankNumber?.includes(Number(item?.address?.replace(/^\+/, '')))
        ) {
          const date = new Date(item?.date);
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString();

          banksms.push({
            address: item?.address,
            body: item?.body,
            date: formattedDate,
            time: formattedTime,
            timestamp: item?.date.toString(),
            bankIcon: val?.bankIcon,
          });
          checked.push(index);
        }
      });
      if (!checked.includes(index)) {
        const matchCount = countMatchingKeywords(item?.body);

        if (
          matchCount >= 2 &&
          !ignoreNumbers?.includes(item?.address?.toLowerCase())
        ) {
          extraSms.push({
            bankNumber: item?.address.toString(),
            sms: item?.body,
          });
          checked.push(index);
        }
      }
    });

    if (banksms?.length) {
      let matchedSmS = [];
      const groupedMessages = allBanksRegex.map(bank => {
        return {
          ...bank,
          messages: banksms.filter(message =>
            bank?.bankNumber?.includes(
              Number(message?.address?.replace(/^\+/, '')),
            ),
          ),
        };
      });

      groupedMessages?.forEach(bank => {
        bank?.messages?.forEach(sms => {
          let matchedInDebit = false;
          let matchedInCredit = false;
          bank?.regex?.debit.forEach((item, index) => {
            const newRegex = new RegExp(item);

            const matched = sms?.body.match(newRegex);
            if (matched && !matchedInDebit) {
              matchedSmS?.push({
                ...matched?.groups,
                bankName: bank?.bankName,
                bankIcon: bank?.bankIcon,
                date: sms?.date,
                time: sms?.time,
                timestamp: sms?.timestamp,
                type: 'debit',
                matchedRegex: newRegex,
              });
              matchedInDebit = true;
            }
          });
          if (!matchedInDebit) {
            bank?.regex?.credit.forEach((item, index) => {
              const newRegex = new RegExp(item);
              const matched = sms?.body.match(newRegex);
              if (matched) {
                matchedSmS?.push({
                  ...matched?.groups,
                  bankName: bank?.bankName,
                  bankIcon: bank?.bankIcon,
                  date: sms?.date,
                  time: sms?.time,
                  timestamp: sms?.timestamp,
                  type: 'credit',
                  matchedRegex: newRegex,
                });
                matchedInCredit = true;
              }
            });
          }
          if (!matchedInDebit && !matchedInCredit) {
            const matchCount = countMatchingKeywords(sms?.body);

            if (
              matchCount >= 2 &&
              !ignoreNumbers?.includes(sms?.address?.toLowerCase())
            ) {
              const isSmsAlreadyPresent = extraSms.some(
                existingSms => existingSms?.sms === sms?.body,
              );

              if (!isSmsAlreadyPresent) {
                extraSms.push({
                  bankNumber: sms?.address.toString(),
                  sms: sms?.body,
                });
              }
            }
          }
        });
      });

      if (matchedSmS?.length) {
        let sms = [];

        const sortedSmsArray = matchedSmS
          .sort((a, b) => {
            const dateA = new Date(`${a?.date} ${a?.time}`);
            const dateB = new Date(`${b?.date} ${b?.time}`);

            return dateA - dateB;
          })
          .reverse();

        sortedSmsArray.map(item => {
          // const numericValue = item?.account_no.replace(/[^0-9]/g, '');
          const remaining_balance = parseInt(
            item?.remaining_balance?.replace(/,/g, '').split('.')[0],
            10,
          );
          const amount = parseInt(
            item?.transaction_amount?.replace(/,/g, '').split('.')[0],
            10,
          );

          sms.push({
            ...item,
            account_no: item?.account_no, //account no
            remaining_balance: remaining_balance,
            transaction_amount: amount,
          });
        });

        //   dispatch(setAllBankSms(sms));
        if (sms?.length) {
          const filteredSmsArray = sms?.filter(val => {
            return accounts?.UserAccounts?.some(bank => {
              if (
                (compareAccountNumbers(val?.account_no, bank?.accountID) &&
                  bank?.isSync) ||
                (val?.bankName == bank?.accountName &&
                  bank?.isSync &&
                  val?.account_no == undefined)
              ) {
                val.bankName = bank?.accountName;
                return true;
              }
              return false;
            });
          });
          handleAllTransactions(
            filteredSmsArray,
            accounts?.UserAccounts,
            allCategory,
            'uncategorize',
          );
        }
      }
    }

    if (extraSms?.length) {
      handleExtraSms(extraSms, 'newsms');
    }
  }
};
