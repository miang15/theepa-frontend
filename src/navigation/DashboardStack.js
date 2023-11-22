import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddExpense,
  AddIncome,
  AddNewBudget,
  AddNewGoal,
  AllAccounts,
  AllCategory,
  AllWidgets,
  BudgetDetails,
  BudgetsPage,
  CategoryDetails,
  Dashboard,
  EditGoal,
  EditNewBudget,
  GoalDetails,
  GoalsPage,
  ManualAccount,
  SelectCategory,
  SyncAccount,
  SyncLoading,
  SyncedAccount,
} from '../screens';

const DashboardStack = createNativeStackNavigator();

export const DashboardStackScreens = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Dashboard">
      <DashboardStack.Screen name="Dashboard" component={Dashboard} />
      <DashboardStack.Screen
        name="CategoryStackScreens"
        component={CategoryStackScreens}
      />
      <DashboardStack.Screen name="AllWidgets" component={AllWidgets} />
      <DashboardStack.Screen
        name="BudgetStackScreens"
        component={BudgetStackScreens}
      />
      <DashboardStack.Screen
        name="GoalsStackScreens"
        component={GoalsStackScreens}
      />
      <DashboardStack.Screen name="AddIncome" component={AddIncome} />
      <DashboardStack.Screen name="ManualAccount" component={ManualAccount} />
      <DashboardStack.Screen name="AddExpense" component={AddExpense} />
      <DashboardStack.Screen name="SyncAccount" component={SyncAccount} />
      <DashboardStack.Screen name="AllAccounts" component={AllAccounts} />
      <DashboardStack.Screen name="SyncLoading" component={SyncLoading} />
      <DashboardStack.Screen name="SyncedAccount" component={SyncedAccount} />
      <DashboardStack.Screen
        name="CategoryDetails"
        component={CategoryDetails}
      />
    </DashboardStack.Navigator>
  );
};

const BudgetStack = createNativeStackNavigator();

export const BudgetStackScreens = () => {
  return (
    <BudgetStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="BudgetsPage">
      <BudgetStack.Screen name="BudgetsPage" component={BudgetsPage} />
      <BudgetStack.Screen name="AddNewBudget" component={AddNewBudget} />
      <BudgetStack.Screen name="BudgetDetails" component={BudgetDetails} />
      <BudgetStack.Screen name="EditNewBudget" component={EditNewBudget} />
    </BudgetStack.Navigator>
  );
};

const GoalsStack = createNativeStackNavigator();

export const GoalsStackScreens = () => {
  return (
    <GoalsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="GoalsPage">
      <GoalsStack.Screen name="GoalsPage" component={GoalsPage} />
      <GoalsStack.Screen name="AddNewGoal" component={AddNewGoal} />
      <GoalsStack.Screen name="GoalDetails" component={GoalDetails} />
      <GoalsStack.Screen name="EditGoal" component={EditGoal} />
    </GoalsStack.Navigator>
  );
};

const CategoryStack = createNativeStackNavigator();

export const CategoryStackScreens = () => {
  return (
    <CategoryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="AllCategory">
      <CategoryStack.Screen name="AllCategory" component={AllCategory} />
      <CategoryStack.Screen
        name="CategoryDetails"
        component={CategoryDetails}
      />
      <CategoryStack.Screen name="SelectCategory" component={SelectCategory} />
    </CategoryStack.Navigator>
  );
};
