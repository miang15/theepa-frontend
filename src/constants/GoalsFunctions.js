import {
  getDashboardAction,
  getWidgetsAction,
} from '../redux/Dashboard/DashboardAction';
import analytics from '@react-native-firebase/analytics';

const {GOALS} = require('../config/endpoint');
const {default: http} = require('../config/http');
const {
  setAppToast,
  setAppLoading,
} = require('../redux/AppLoader/appLoaderAction');
const {getGoalsAction} = require('../redux/Goals/GoalsAction');
const {store} = require('../redux/store');

export const handleGoalsStatus = async notify => {
  try {
    const res = await http.get(GOALS.getGoals);
    if (res?.data?.success) {
      const allgoals = res?.data?.data?.budget?.ActiveGoal;

      const todayDate = new Date();
      const currentDate = todayDate.toISOString().substring(0, 10);

      if (allgoals?.filter(val => val?.status === 'active')?.length) {
        for (const item of allgoals?.filter(val => val?.status === 'active')) {
          const endDate = new Date(item?.endDate);
          const targetDate = endDate.toISOString().substring(0, 10);
          if (currentDate > targetDate) {
            if (item?.currentAmount >= item?.targetAmount) {
              completedGoals(item, notify);
            } else {
              const data = {
                status: 'unachieved',
              };
              const res = await http.put(
                `goals/change-goal-status/${item?._id}`,
                data,
              );
              if (res?.data?.success) {
                if (!notify) {
                  const toast = {
                    title: 'Alert',
                    message: `Your ${item?.name} goal is Unachieved`,
                    status: 'danger',
                  };
                  await showPopUp(toast);
                }
              }
            }
          } else if (currentDate < targetDate) {
            if (item?.currentAmount >= item?.targetAmount) {
              completedGoals(item, notify);
            }
          } else {
            if (item?.currentAmount >= item?.targetAmount) {
              completedGoals(item, notify);
            }
          }
        }

        await analytics().logEvent('goals_status', {
          description: 'Update goals status',
        });

        store.dispatch(getGoalsAction());
        store.dispatch(getWidgetsAction());
      }
    }
  } catch (error) {
    console.log('goals status: ', error);
  }
};

const completedGoals = async (item, notify) => {
  const data = {
    status: 'completed',
  };
  const res = await http.put(`goals/change-goal-status/${item?._id}`, data);
  if (res?.data?.success) {
    if (!notify) {
      const toast = {
        title: 'Success!!!',
        message: `Your ${item?.name} goal is Completed`,
        status: 'success',
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
