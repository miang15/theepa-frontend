import {BUDGET} from '../config/endpoint';
import http from '../config/http';
import {setAppToast} from '../redux/AppLoader/appLoaderAction';
import {getBudgetAction} from '../redux/Budget/BudgetAction';
import {
  getDashboardAction,
  getWidgetsAction,
} from '../redux/Dashboard/DashboardAction';
import {store} from '../redux/store';
import analytics from '@react-native-firebase/analytics';

export const handleBudgetStatus = async notify => {
  try {
    const res = await http.get(BUDGET.getBudgets);

    if (res?.data?.success) {
      const allBudgets = res?.data?.data?.budget?.UserBudget;
      const todayDate = new Date();
      const currentDate = todayDate.toISOString().substring(0, 10);

      if (allBudgets?.filter(val => val?.status === 'active')?.length) {
        for (const item of allBudgets?.filter(
          val => val?.status === 'active',
        )) {
          const endDate = new Date(item?.end_date);
          const targetDate = endDate.toISOString().substring(0, 10);
          if (currentDate > targetDate) {
            if (item?.spend > item?.amount) {
              exceededBudget(item, notify);
            } else if (item?.spend <= item?.amount) {
              const data = {
                status: 'completed',
              };
              const res = await http.put(
                `budget/change-budget-status/${item?._id}`,
                data,
              );
              if (res?.data?.success) {
                if (!notify) {
                  const toast = {
                    title: 'Success!!!',
                    message: `Your ${item?.category?.name} budget is Completed`,
                    status: 'success',
                  };
                  await showPopUp(toast);
                }
              }
            }
          } else if (currentDate < targetDate) {
            if (item?.spend > item?.amount) {
              exceededBudget(item, notify);
            } else if (item?.spend == item?.amount) {
              if (!notify) {
                const toast = {
                  title: 'Alert',
                  message: `Your ${item?.category?.name} budget has been fully utilized.`,
                  status: 'danger',
                };
                await showPopUp(toast);
              }
            }
          } else {
            if (item?.spend > item?.amount) {
              exceededBudget(item, notify);
            } else if (item?.spend == item?.amount) {
              if (!notify) {
                const toast = {
                  title: 'Alert',
                  message: `Your ${item?.category?.name} budget has been fully utilized.`,
                  status: 'danger',
                };
                await showPopUp(toast);
              }
            }
          }
        }

        await analytics().logEvent('budget_status', {
          description: 'Update budget status',
        });
        store.dispatch(getBudgetAction());
        store.dispatch(getWidgetsAction());
      }
    }
  } catch (error) {
    console.log('budget status', error);
  }
};

const exceededBudget = async (item, notify) => {
  const data = {
    status: 'incompleted',
  };
  const res = await http.put(`budget/change-budget-status/${item?._id}`, data);
  if (res?.data?.success) {
    if (!notify) {
      const toast = {
        title: 'Alert',
        message: `Your ${item?.category?.name} budget is Exceeded`,
        status: 'danger',
      };
      await showPopUp(toast);
    }
  }
};

const showPopUp = async data => {
  return new Promise(resolve => {
    setTimeout(() => {
      store.dispatch(
        setAppToast({
          title: data?.title,
          description: data?.message,
          status: data?.status,
          showToast: true,
        }),
      );
      resolve();
    }, 1500);
  });
};
