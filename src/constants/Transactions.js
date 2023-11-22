import {TRANSACTION} from '../config/endpoint';
import http from '../config/http';
import {
  setAppLoading,
  setAppProgress,
} from '../redux/AppLoader/appLoaderAction';
import {editAccountAction} from '../redux/Dashboard/DashboardAction';
import {setUncategorizedTransactions} from '../redux/SMSParsing/SMSParsingAction';
import {store} from '../redux/store';
import {compareAccountNumbers} from './functions';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

export const handleAllTransactions = async (
  filteredSmsArray,
  accounts,
  allCategory,
  uncategorize,
  updateProgress,
) => {
  try {
    if (filteredSmsArray?.length) {
      store.dispatch(setAppProgress(0));
      const checked = [];
      const uncategorizeData = [];
      let totalIterations = filteredSmsArray?.length;
      let loopCounter = 0;

      for (let index = 0; index < filteredSmsArray.length; index++) {
        loopCounter++;
        var percentage = (loopCounter / totalIterations) * 100;
        store.dispatch(setAppProgress(percentage));
        const item = filteredSmsArray[index];
        if (!checked.includes(index)) {
          for (let ind = 0; ind < allCategory.length; ind++) {
            const val = allCategory[ind];
            if (val?._id && item?.location && !checked.includes(index)) {
              if (
                val?.vendors?.some(location =>
                  item?.location.toLowerCase().includes(location.toLowerCase()),
                )
              ) {
                let acc = '';
                if (item?.account_no == undefined) {
                  acc = accounts?.find(
                    acc => acc?.accountName == item?.bankName,
                  );
                } else {
                  acc = accounts?.find(acc =>
                    compareAccountNumbers(acc?.accountID, item?.account_no),
                  );
                }
                const data = {
                  type: 'expense',
                  time: item?.transaction_date || item?.date,
                  createdAt: item?.timestamp,
                  amount: Number(item?.transaction_amount),
                  accountID: acc?._id,
                  note: undefined,
                  category: val?._id,
                };

                await analytics().logEvent('categorized_transaction', {
                  description: 'Categorize transactional sms processed',
                  value: val?.name,
                });

                const addRes = await http.post(TRANSACTION.addexpense, data);

                if (addRes?.data?.success && item?.remaining_balance) {
                  const data = {
                    amount: item?.remaining_balance,
                  };
                  await store.dispatch(editAccountAction(data, acc?._id));
                }
                checked.push(index);
              }
            }
          }
        }

        if (item?.type == 'debit' && !checked.includes(index)) {
          let acc = '';
          if (item?.account_no == undefined) {
            acc = accounts?.find(acc => acc?.accountName == item?.bankName);
          } else {
            acc = accounts?.find(acc =>
              compareAccountNumbers(acc?.accountID, item?.account_no),
            );
          }
          const data = {
            type: 'expense',
            time: item?.transaction_date || item?.date,
            createdAt: item?.timestamp,
            amount: Number(item?.transaction_amount),
            accountID: acc?._id,
            note: undefined,
          };

          await analytics().logEvent('uncategorized_transaction', {
            description: 'Debit transactional sms processed',
          });
          const addRes = await http.post(TRANSACTION.addexpense, data);
          if (addRes?.data?.success && item?.remaining_balance) {
            const data = {
              amount: item?.remaining_balance,
            };
            await store.dispatch(editAccountAction(data, acc?._id));
          }

          if (addRes?.data?.success && uncategorize) {
            const budget = addRes?.data?.data?.budget?.history;
            const details = {
              ...budget,
              location: item?.location || undefined,
            };
            uncategorizeData.push(details);
          }
          checked.push(index);
        } else if (item?.type == 'credit' && !checked.includes(index)) {
          let acc = '';
          if (item?.account_no == undefined) {
            acc = accounts?.find(acc => acc?.accountName == item?.bankName);
          } else {
            acc = accounts?.find(acc =>
              compareAccountNumbers(acc?.accountID, item?.account_no),
            );
          }

          const category = allCategory.find(
            cat => cat?.name.toLowerCase() == 'income',
          );
          const data = {
            type: 'income',
            time: item?.transaction_date || item?.date,
            createdAt: item?.timestamp,
            amount: Number(item?.transaction_amount),
            accountID: acc?._id,
            note: undefined,
            goals: undefined,
            exclude_from_income: false,
            category: category?._id,
          };

          await analytics().logEvent('income_transaction', {
            description: 'Income Category transactional sms processed',
            value: category?.name,
          });

          checked.push(index);
          const addRes = await http.post(TRANSACTION.addincome, data);
          if (addRes?.data?.success && item?.remaining_balance) {
            const data = {
              amount: item?.remaining_balance,
            };
            await store.dispatch(editAccountAction(data, acc?._id));
          }
        }
      }

      if (uncategorizeData?.length) {
        store.dispatch(setUncategorizedTransactions(uncategorizeData));
      }
    }
  } catch (error) {
    // Handle error here
    console.log('transaction: ', error);
  }
};
