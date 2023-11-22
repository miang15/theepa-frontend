export const AUTH = {
  socials: 'auth/signup-socials',
  facebook: 'auth/facebook',
  signup: 'auth/signup',
  signin: 'auth/signin',
  resetpass: 'reset-password',
  changepass: 'change-password',
  confirmotp: 'confirm-otp',
  update: 'profile/edit-profile',
  checkpass: 'reset-password/check-password',
};

export const USER = {
  getprofile: 'profile/',
  muteall: 'notificationsettings/mute-notifications',
  mutebudgetgoals: 'notificationsettings/mute-goalsbudget-notifications',
  mutetransaction:
    'notificationsettings/mute-uncategorizedtransactions-notifications',
};

export const ONBOARDING = {
  addBalance: 'onboarding/balance',
  addGoal: 'onboarding/add-goal',
  getallGoals: 'goals/',
  getCategories: 'categories',
  addcategory: 'onboarding/add-category',
};

export const DASHBOARD = {
  getDashboardData: 'dashboard/',
  getAllWidgets: 'dashboard/cards',
  addWidgets: 'dashboard/add-card',
  removeWidgets: 'dashboard/remove-card',
};

export const ACCOUNT = {
  addaccount: 'account/add-account',
  getAccount: 'account',
  editAccount: 'account/edit-account',
  setPrimary: 'account/set-primary',
  deleteAccount: 'account/delete-account',
};

export const TRANSACTION = {
  addincome: 'transactions/add-income',
  addexpense: 'transactions/add-expense',
};

export const CATEGORIES = {
  deletecategory: 'categories/delete-category',
  updatecategory: 'categories/edit-category',
  getCategoryIcons: 'get-icons',
};

export const BUDGET = {
  getBudgets: 'budget/',
  addBudget: 'budget/add-category-budget/',
  editBudget: 'budget/edit-budget/',
  deleteBudget: 'budget/delete-budget/',
};

export const GOALS = {
  getGoals: 'goals/',
  addGoals: 'goals/add-goal',
  editGoals: 'goals/edit-goal/',
  deleteGoals: 'goals/delete-goal/',
};

export const REGEX = {
  getRegex: 'sms/',
  addRegex: 'sms/add-bank-regex',
  deleteRegex: 'sms/delete-regex',
  allSms: 'unmatchedsms/add-unmatchedsms',
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  LASTSEEN: 'lastseen',
  SIGNED_UP: 'signedup',
  SOCIAL_SIGNED_UP: 'socialsignedup',
  ONBOARDING_PAGE: 'ONBOARDING_PAGE',
  SIGNUP_FLOW: 'SIGNUP_FLOW',
  CATEGORY_PROMPT: 'CATEGORY_PROMPT',
  ALL_REGEX: 'ALL_REGEX',
  USER_BANKS: 'USER_BANKS',
  PRIMARY_BANK: 'PRIMARY_BANK',
  EXTRA_SMS: 'EXTRA_SMS',
  SYNCED_DASHBOARD: 'SYNCED_DASHBOARD',
  LATEST_SYNCED_TIME: 'LATEST_SYNCED_TIME',
  SOCIAL_EMAIL: 'SOCIAL_EMAIL',
  RESET_EMAIL: 'RESET_EMAIL',
  SKIP_UPDATE: 'SKIP_UPDATE',
};
