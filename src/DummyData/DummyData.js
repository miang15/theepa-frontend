import Images from '../constants/Images';
import theme from '../utils/theme';

export const allBanks = [
  {
    id: 1,
    bank: 'Meezan Bank',
    mark: true,
  },
  {
    id: 2,
    bank: 'Allied Bank',
    mark: false,
  },
  {
    id: 3,
    bank: 'Habib Bank Limited',
    mark: false,
  },
];

export const allCategories = [
  {
    id: 1,
    category: 'Grocery',
    img: Images.cart,
  },
  {
    id: 2,
    category: 'Bills',
    img: Images.bills,
  },
  {
    id: 3,
    category: 'Petrol',
    img: Images.car,
  },
  {
    id: 4,
    category: 'Clothes',
    img: Images.spy,
  },
  {
    id: 5,
    category: 'Foods',
    img: Images.foods,
  },
  {
    id: 6,
    category: 'Add New',
    img: Images.plus,
  },
];
export const allDropdownCategories = [
  {
    label: 'Grocery',
    value: 'Grocery',
  },
  {
    label: 'Bills',
    value: 'Bills',
  },
  {
    label: 'Petrol',
    value: 'Petrol',
  },
  {
    label: 'Clothes',
    value: 'Clothes',
  },
  {
    label: 'Foods',
    value: 'Foods',
  },
];

export const expensedata = [
  {
    name: 'Food',
    population: 21500000,
    color: '#6091BA',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
    legendwidth: 50,
  },
  {
    name: 'Bills',
    population: 2800000,
    color: theme.gray,
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Grocery',
    population: 527612,
    color: 'red',
    legendFontColor: '#542287F3',
    legendFontSize: 15,
  },
  {
    name: 'Clothes',
    population: 8538000,
    color: theme.blue,
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Petrol',
    population: 11920000,
    color: '#6C7BA8EF',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

export const ignoreNumbers = [
  'jazz offer',
  'jazz',
  'easypaisa',
  'makeuroffer',
  'jazztunes',
  'telenor',
  '3737',
  '5797',
  '5005',
  '8148',
  'zong',
  'jazz cares',
  '8645',
  '3015',
  '8558',
  'ufone',
  '5466',
  '90179',
];

export const BankRegex = [
  {
    bankNumber: [4250],
    bankIcon: `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/HBL.png`,
    bankName: 'HBL',
    regex: {
      debit: [
        '^Your HBL (A\\/C|a\\/c) (?<account_no>\\d+\\*{5}\\d+) has been debited with PKR (?<transaction_amount>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+) on (?<transaction_date>\\d{2}\\/\\d{2}\\/\\d{4}) (?<transaction_time>\\d{2}:\\d{2}:\\d{2}) ([\\w\\s]+) ([\\w\\s]+)\\. [\\w\\s]+ is PKR (?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)(\\.?)$',
        '^[\\w\\s]+ PKR (?<transaction_amount>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+) on (?<transaction_date>\\d+\\/\\d+\\/\\d+) (?<transaction_time>\\d+:\\d+:\\d+|\\d+:\\d+)\\. [\\w\\s]+ PKR (?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)(\\.?)$',
        '^[\\w\\s]+ PKR (?<transaction_amount>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+) [\\w\\s#\\d+]+ from A\\/C (?<account_no>\\d+[a-zA-Z]+\\d+) [\\w\\s]+ on (?<transaction_date>\\d+-\\d+-\\d+) (?<transaction_time>\\d+:\\d+:\\d+|\\d+:\\d+)(\\.?)$',
        '^[\\w\\s]+\\r?\\s+?\\n?PKR\\r?\\s+?\\n?(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\s+?\\n?on\\r?\\s+?\\n?(?<transaction_date>\\d+-\\d+-\\d+)\\r?\\s+?\\n?(?<transaction_time>\\d+:\\d+:\\d+)\\r?\\s+?\\n?[\\w\\s]+(\\.?)$',
        '^PKR\\r?\\s+?\\n?(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\s+?\\n?[\\w\\s]+\\r?\\s+?\\n?A\\/C\\r?\\s+?\\n?(?<account_no>\\.+\\d+)\\r?\\s+?\\n?[\\w\\s\\/\\.+]+\\r?\\s+?\\n?via\\r?\\s+?\\n?(?<location>[\\w\\s]+)\\r?\\s+?\\n?using\\r?\\s+?\\n?[\\w\\s]+\\r?\\s+?\\n?on\\r?\\s+?\\n?(?<transaction_date>\\d+-\\d+-\\d+)\\r?\\s+?\\n?(?<transaction_time>\\d+:\\d+:\\d+)(,?)\\r?\\s+?\\n?[\\w\\s]+(\\.?)$',
      ],
      credit: [
        '^Your HBL (A\\/C|a/c) (?<account_no>\\d+\\*{5}\\d{5}) has been credited with PKR (?<transaction_amount>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+) on (?<transaction_date>\\d{2}\\/\\d{2}\\/\\d{4}) (?<transaction_time>\\d{2}:\\d{2}:\\d{2}) ([\\w\\]) ([A-Z\\s]+) ([\\w\\s]+) ([A-Za-z]+)\\. For details, call (\\d+)(\\.?)$',
        '^Your HBL (A\\/C|a/c) (?<account_no>\\d+\\*{5}\\d+) has been credited with PKR (?<transaction_amount>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+) on (?<transaction_date>\\d{2}\\/\\d{2}\\/\\d{4}) (?<transaction_time>\\d{2}:\\d{2}:\\d{2}) ([\\w\\s]+) ([\\w\\s]+)\\. [\\w\\s]+ is PKR (?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)(\\.?)$',
      ],
    },
  },
  {
    bankName: 'Meezan Bank',
    bankIcon: `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/MB+Logo.png`,
    bankNumber: [8079, 9779],
    regex: {
      credit: [
        '^PKR (?<transaction_amount>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+) is credited as ([a-zA-Z ]+) in your A\\/C (?<account_no>[a-z]+\\d+) of (?<location>[\\w\\s-]+|([\\w\\s\\W]+)) on (?<transaction_date>\\d+-[a-zA-Z]+-\\d+) at (?<transaction_time>\\d+:\\d+:\\d+|\\d+:\\d+). Bal: PKR (?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)$',
        '^PKR\\r?\\s+?\\n?(?<transaction_amount>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)\\r?\\s+?\\n?[\\w\\s]+\\r?\\s+?\\n?[\\w\\s-]+\\r?\\s+?\\n?(A\\/C|a\\/c)\\r?\\s+?\\n?(?<account_no>[a-zA-Z]+\\d+)\\r?\\s+?\\n?[\\w\\s]+\\r?\\s+?\\n?on\\r?\\s+?\\n?(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\s+?\\n?at\\r?\\s+?\\n?(?<transaction_time>\\d+:\\d+)\\r?\\s+?\\n?Bal:\\r?\\s+?\\n?PKR\\r?\\s+?\\n?(?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)$',
      ],
      debit: [
        '^PKR\\r?\\s+?\\n?(?<transaction_amount>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)\\r?\\s+?\\n?(sent\\r?\\s+?\\n?to|SENT\\r?\\s+?\\n?TO)\\r?\\s+?\\n?(([A-Z ]+-)|([A-Z\\s]+)\\(([\\w\\s]+)\\)\\s[\\w\\s]+-)\\r?\\s+?\\n?(\\d+)\\r?\\s+?\\n?to\\r?\\s+?\\n?your\\r?\\s+?\\n?A\\/C\\r?\\s+?\\n?(?<account_no>[a-z]+\\d+)\\r?\\s+?\\n?(?<location>[\\w\\s-]+|([\\w\\s\\W]+))\\r?\\s+?\\n?on\\r?\\s+?\\n?(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\s+?\\n?at\\r?\\s+?\\n?(?<transaction_time>\\d{2}:\\d+)\\r?\\s+?\\n?Bal:\\r?\\s+?\\n?PKR\\r?\\s+?\\n?(?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)$',
        '^PKR\\r?\\n?\\s+?(?<transaction_amount>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)\\r?\\n?\\s+?charged\\r?\\n?\\s+?at\\r?\\n?\\s+?(?<location>[\\w\\s]+|([\\w\\s\\W]+))\\r?\\n?\\s+?[\\w\\s]+\\r?\\n?\\s+?(([a-zA-Z]+)\\r?\\n?\\s+?([a-zA-Z]+),)\\r?\\n?\\s+?from\\r?\\n?\\s+?(A\\/C|a\\/c)\\r?\\n?\\s+?(?<account_no>[a-z]+\\d+)\\r?\\n?\\s+?\\(([\\w\\s\\W]+)\\)\\r?\\n?\\s+?on\\r?\\n?\\s+?(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\n?\\s+?at\\r?\\n?\\s+?(?<transaction_time>\\d{2}:\\d+)\\r?\\n?\\s+?Balance:\\r?\\n?\\s+?(?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)$',
        '^PKR (?<transaction_amount>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+) is debited as ([\\w\\s]+) \\d+ \\w+ ([a-zA-Z]+) from your (A\\/C|a\\/c) (?<account_no>[a-z]+\\d+) of (?<location>[\\w\\s]+|([\\w\\s\\W]+)) on (?<transaction_date>\\d+-[a-zA-Z]+-\\d+) at (?<transaction_time>\\d{2}:\\d+) Bal: PKR (?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)$',
        '^PKR\\r?\\n?\\s+?(?<transaction_amount>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)\\r?\\n?\\s+?(sent\\r?\\n?\\s+?to|SENT\\r?\\n?\\s+?TO)\\r?\\n?\\s+?(([A-Z ]+-)|([A-Z\\s]+)\\(([\\w\\s]+)\\)\\s[\\w\\s]+-)(\\d+)\\r?\\n?\\s+?from\\r?\\n?\\s+?your\\r?\\n?\\s+?A\\/C\\r?\\n?\\s+?(?<account_no>[a-z]+\\d+)\\r?\\n?\\s+?of\\r?\\n?\\s+?(?<location>[\\w\\s-]+|([\\w\\s\\W]+))\\r?\\n?\\s+?on\\r?\\n?\\s+?(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\n?\\s+?at\\r?\\n?\\s+?(?<transaction_time>\\d{2}:\\d+)\\r?\\n?\\s+?[a-zA-Z]+:\\r?\\n?\\s+?[a-zA-Z]+.(\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)\\r?\\n?\\s+?Bal:\\r?\\n?\\s+?PKR\\r?\\n?\\s+?(?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)$',
        'PKR\\r?\\n?\\s+?(?<transaction_amount>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)\\r?\\n?\\s+?cash\\r?\\n?\\s+?withdrawn\\r?\\n?\\s+?from\\r?\\n?\\s+?(?<location>[\\w\\s]+|([\\w\\s\\W]+))from\\r?\\n?\\s+?(A\\/C|a\\/c)\\r?\\n?\\s+?(?<account_no>[a-zA-Z]+\\d+)\\r?\\n?\\s+?([\\w\\s]+)\\r?\\n?\\s+?on\\r?\\n?\\s+?(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\n?\\s+?at\\r?\\n?\\s+?(?<transaction_time>\\d{2}:\\d+)\\r?\\n?\\s+?Balance:\\r?\\n?\\s+?PKR\\r?\\n?\\s+?(?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)$',
        '^PKR\\r?\\s+?\\n?(?<transaction_amount>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)\\r?\\s+?\\n?(sent\\r?\\s+?\\n?to|SENT\\r?\\s+?\\n?TO)\\r?\\s+?\\n?(([A-Z ]+-)|([A-Z\\s-]+\\d+))\\r?\\s+?\\n?[\\w\\s\\/]+\\r?\\s+?\\n?(?<account_no>[a-zA-Z]+\\d+)\\r?\\s+?\\n?(?<location>[\\w\\s]+)\\r?\\s+?\\n?on\\r?\\s+?\\n?(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\s+?\\n?at\\r?\\s+?\\n?(?<transaction_time>\\d+:\\d+)\\r?\\s+?\\n?Bal:\\r?\\s+?\\n?PKR\\r?\\s+?\\n?(?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+)$',
      ],
    },
  },
  {
    bankName: 'Bank Alfalah',
    bankIcon: `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/Bank+Alfalah+Logo.png`,
    bankNumber: [8287],
    regex: {
      credit: [
        '^[\\w\\s:]+,\\r?\\n?\\s+?PKR\\r?\\n?\\s+?(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\n?\\s+?has\\r?\\n?\\s+?been\\r?\\n?\\s+?Credited\\r?\\n?\\s+?[\\w\\s\\/:]+\\r?\\n?\\s+?(?<account_no>\\d+\\-\\d+\\*+\\d+)\\r?\\n?\\s+?[\\w\\s\\/]+\\r?\\n?\\s+?(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\n[\\w\\s:]+\\r?\\n?\\s+?PKR\\r?\\n?\\s+?(?<remaining_balance>\\d+,\\d+\\.?\\d+|\\d+|\\d+,\\d+)+\\r?\\n?\\s+?[\\w\\s:\\/\\/.]+(\\.?)$',
      ],
      debit: [
        '^[\\w\\s]+,\\r?\\n?(\\s?|\\s+?)PKR\\r?\\n?\\s+(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\n?\\s+has\\r?\\n?\\s+been\\r?\\n?\\s+Debited\\r?\\n?\\s+[\\w\\s\\/:]+\\r?\\n?\\s+(?<account_no>\\d+-\\d+\\*+\\d+)\\r?\\n?\\s+[\\w\\s]+\\r?\\n?\\s+(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\n?\\s+[\\w\\s]+\\r?\\n?\\s+at\\r?\\n?\\s+(?<location>[\\w\\s]+)\\r?(\\n|\\n?)Current[\\w\\s:]+\\r?\\n?\\s+[a-zA-Z]+\\r?\\n?\\s+(?<tranasction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\n?\\r?\\s+[\\w\\s:\\/\\/.]+(\\.?)$',
        '^[\\w\\s:]+,\\r?\\n?(\\s+?|\\s?)PKR (?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\n?\\s+?has\\r?\\n?\\s+?been\\r?\\n?\\s?Debited\\r?\\n?\\s+?[\\w\\s\\/\\:]+\\r?\\n?\\s+?(?<account_no>\\d+\\-\\d+\\*+\\d+)\\r?\\n?\\s?[\\w\\s\\/]+\\r?\\n?\\s+?(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\n?\\s+[\\w\\s:]+\\r?\\n?\\s?PKR\\r?\\n?\\s?(?<remaining_balance>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\n?\\s+?\\r?[\\w\\s:\\/\\/.]+(\\.?)$',
        '^[\\w\\s:]+,\\r?\\n?(\\s+?|\\s?)PKR\\r?\\n?\\s+(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\n?\\s+has\\r?\\n?\\s+been\\r?\\n?\\s+Debited\\r?\\n?\\s+[\\w\\s\\/\\:]+\\r?\\n?\\s+(?<account_no>\\d+\\-\\d+\\*+\\d+)\\r?\\n?\\s+on\\r?\\n?\\s+(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\n?\\s+?[\\w\\s:]+\\r?\\n?\\s+?PKR\\r?\\n?\\s+(?<remaining_balance>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\n?\\s+[\\w\\s:\\/\\/.]+(\\.?)$',
        '^[\\w\\r?\\n?\\s+?\\,]+PKR\\r?\\n?\\s+?(?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)[\\w\\r?\\n?\\s+?]+Debited[\\w\\r?\\n?\\s+?\\/]+\\:\\r?\\n?\\s+?(?<account_no>\\d+\\-\\d\\*+\\d+)\\r?\\n?\\s+?on\\r?\\n?\\s+?(?<transaction_date>\\d+\\-[A-Za-z]+\\-\\d+)[\\w\\r?\\n?\\s+?]+at\\r?\\n?\\s+?(?<location>[A-Z]+\\r?\\n?\\s+?[A-Z]+\\r?\\n?\\s+?[A-Z]+\\r?\\n?\\s+?)[\\w\\r?\\n?\\s+?:]+PKR\\r?\\n?\\s+?\\#(?<remaining_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)[\\w\\r?\\n?\\s+?\\:\\/\\.]+\\/$',
      ],
    },
  },
  {
    bankName: 'Bank Of Punjab',
    bankIcon: `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/BOP.png`,
    bankNumber: [],
    regex: {
      credit: [
        '^[\\w\\s]+,\\s[\\w\\s\\:\\#]+(?<account_no>\\*+\\d+) has been credited [\\w\\s]+PKR (?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+) \\w+ (?<transaction_time>\\d+:\\d+:\\d+) (?<transaction_date>\\d+ [A-Za-z]+ \\d+)[\\.\\w\\s]+PKR (?<remaining_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)(\\.?)$',
      ],
      debit: [
        '^[\\w\\s,]+Your\\r?\\s+?\\n?[\\w\\s]+\\r?\\s+?\\n?(?<account_no>[a-zA-z]+\\d+)\\?has\\r?\\s+?\\n?been\\r?\\s+?\\n?[\\w\\s]+\\r?\\s+?\\n?by\\r?\\s+?\\n?PKR\\r?\\s+?\\n?(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\s+?\\n?on\\r?\\s+?\\n?(?<transaction_date>\\d+-[a-zA-Z]+)\\r?\\s+?\\n?at\\r?\\s+?\\n?(?<transaction_time>\\d+:\\d+:\\d+)\\r?\\s+?\\n?via\\r?\\s+?\\n?(?<location>[A-Z\\s\\/]+\\.)(\\.?)$',
        '^[\\w\\s,]+Your\\r?\\s+?\\n?(A\\/C|a\\/c)\\r?\\s+?\\n?no\\.?\\r?\\s+?\\n?(?<account_no>\\d+[a-zA-z]+\\d+)\\r?\\s+?\\n?has\\r?\\s+?\\n?been\\r?\\s+?\\n?(?<transaction_type>[a-zA-Z]+)\\r?\\s+?\\n?by\\r?\\s+?\\n?PKR\\r?\\s+?\\n?(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\s+?\\n?on\\r?\\s+?\\n?(?<transaction_date>\\d+-[a-zA-Z]+)\\r?\\s+?\\n?at\\r?\\s+?\\n?\\d+:\\d+:\\d+\\r?\\s+?\\n?[\\w\\s ]+\\r?\\s+?\\n?at\\r?\\s+?\\n?(?<location>[\\w\\s]+)(\\.?)$',
      ],
    },
  },
  {
    bankName: 'Soneri',
    bankIcon: `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/Vector.png`,
    bankNumber: [9293],
    regex: {
      credit: [
        '^[\\w\\s]+,\\r?\\s+?\\n?[\\w\\s\\:\\#]+(?<account_no>\\*+\\d+)\\r?\\s+?\\n?has\\r?\\s+?\\n?been\\r?\\s+?\\n?credited\\r?\\s+?\\n?[\\w\\s]+PKR\\r?\\s+?\\n?(?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)\\r?\\s+?\\n?\\w+\\r?\\s+?\\n?(?<transaction_time>\\d+:\\d+:\\d+)\\r?\\s+?\\n?(?<transaction_date>\\d+\\r?\\s+?\\n?[A-Za-z]+\\r?\\s+?\\n?\\d+)[\\.\\w\\s]+PKR\\r?\\s+?\\n?(?<remaining_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)(\\.?)$',
      ],
      debit: [
        '^[\\w\\s]+,\\r?\\s+?\\n?[\\w\\s\\:\\#]+(?<account_no>\\*+\\d+)\\r?\\s+?\\n?has\\r?\\s+?\\n?been\\r?\\s+?\\n?debited\\r?\\s+?\\n?via\\r?\\s+?\\n?(?<location>[\\w]+)[\\w\\s]+PKR\\r?\\s+?\\n?(?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)\\r?\\s+?\\n?\\w+\\r?\\s+?\\n?(?<transaction_time>\\d+:\\d+:\\d+)\\r?\\s+?\\n?(?<transaction_date>\\d+\\r?\\s+?\\n?[A-Za-z]+\\r?\\s+?\\n?\\d+)[\\.\\w\\s]+PKR (?<remaining_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)(\\.?)$',
      ],
    },
  },
  {
    bankName: 'Allied Bank',
    bankIcon:
      'https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/Alied+Bank.png',
    bankNumber: [9080],
    regex: {
      credit: [],
      debit: [
        '^[\\w\\s]+Fund\\r?\\s+?\\n?Transfer:\\r?\\s+?\\n?PKR.(?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)[\\w\\s\\/]+:(?<account_no>\\d+\\*+\\d+)[\\s\\w\\/\\d\\:\\*\\(\\)]+on\\r?\\s+?\\n?(?<transaction_date>\\d+\\/\\d+\\/\\d+)\\r?\\s+?\\n?(?<transaction_time>\\d+:\\d+)[\\.\\w\\/\\s]+:\\d+(\\.?)$',
        '^[\\w\\s]+\\r?\\s+?\\n?PKR.\\r?\\s+?\\n?(?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)\\r?\\s+?\\n?at\\r?\\s+?\\n?(?<location>[\\w\\s\\.]+)\\r?\\s+?\\n?[\\w\\/]+\\r?\\s+?\\n?(?<account_no>\\d+\\*+\\d+)\\r?\\s+?\\n?on\\r?\\s+?\\n?(?<transaction_date>\\d+\\/\\d+\\/\\d+)\\r?\\s+?\\n?(?<transaction_time>\\d+\\:\\d+)[\\w\\s]+PKR.\\r?\\s+?\\n?(?<remaining_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)[\\w\\s]+\\d+(\\.?)$',
      ],
    },
  },
  {
    bankName: 'United Bank Ltd ',
    bankIcon:
      'https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/UBL+Logo.png',
    bankNumber: [8257],
    regex: {
      credit: [
        '^[\\w\\s,]+\\r?\\s+?\\n?(A\\/C|a\\/c)\\r?\\s+?\\n?(?<account_no>\\d+\\*+\\d+)\\r?\\s+?\\n?has\\r?\\s+?\\n?been\\r?\\s+?\\n?(?<transaction_type>[a-zA-Z]+)\\r?\\s+?\\n?[\\w\\s]+\\r?\\s+?\\n?PKR\\r?\\s+?\\n?(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\s+?\\n?on\\r?\\s+?\\n?(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\s+?\\n?at\\r?\\s+?\\n?(\\d+:\\d+:\\d+|\\d+:\\d+)\\r?\\s+?\\n?[\\w\\s ((\\w\\s))]+(\\.?)\\r?\\s+?\\n?Bal\\r?\\s+?\\n?PKR\\r?\\s+?\\n?(?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+).\\r?\\s+?\\n?[\\w\\s]+,\\r?\\s+?\\n?[\\w\\s]+(\\.?)$',
      ],
      debit: [
        '^[\\w\\s,]+\\r?\\s+?\\n?(A\\/C|a\\/c)\\r?\\s+?\\n?(?<account_no>\\d+\\*+\\d+)\\r?\\s+?\\n?has\\r?\\s+?\\n?been\\r?\\s+?\\n?[a-zA-Z]+\\r?\\s+?\\n?[\\w\\s]+\\r?\\s+?\\n?PKR\\r?\\s+?\\n?(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\s+?\\n?on\\r?\\s+?\\n?(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\s+?\\n?at\\r?\\s+?\\n?(\\d+:\\d+:\\d+|\\d+:\\d+)\\r?\\s+?\\n?[\\w\\s,.]+.\\r?\\n?\\s?Bal\\r?\\s+?\\n?PKR\\r?\\s+?\\n?(?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+\\d+).\\r?\\n?\\s?[\\w\\s]+,\\r?\\s+?\\n?[\\w\\s]+(\\.?)$',
      ],
    },
  },
  {
    bankName: 'MCB Bank Limited ',
    bankIcon:
      'https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/MCB+Bank+Logo.png',
    bankNumber: [6222],

    regex: {
      credit: [
        '^[\\w\\r?\\n?\\s+?\\,]+PKR\\r?\\n?\\s+?(?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)[\\w\\r?\\n?\\s+?]+received[\\w\\r?\\n?\\s+?\\/\\#\\*]+on\\r?\\n?\\s+?(?<transaction_date>\\d+\\-\\d+\\-\\d+)\\r?\\n?\\s+?(?<transaction_time>\\d+:\\d+)\\.?[\\w\\r?\\n?\\s+?\\:\\.]+$',
      ],
      debit: [
        '^[\\w\\s,]+\\r?\\n?\\s+?PKR(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\n?\\s+?has\\r?\\n?\\s+?been\\r?\\n?\\s+?(?<transaction_type>[a-zA-Z]+)\\r?\\n?\\s+?[\\w\\s\\/#]+\\r?\\n?\\s+?(?<account_no>[a-zA-Z]+\\d+)\\r?\\n?\\s+?for\\r?\\n?\\s+?payment\\r?\\n?\\s+?of\\r?\\n?(\\s?|\\s+?)(?<location>[\\w\\s]+\\r?\\n?\\s?)(-?\\r?\\n?\\s+?[\\w\\s&]+|[\\w\\s]+\\r?\\n?\\s+?)\\r?\\n?\\s+?(?<transaction_date>\\d+-\\d+-\\d+)\\r?\\n?\\s+?(?<transaction_time>\\d+:\\d+:\\d+)[\\w\\s.:,]+(\\.?)$',
        '^[\\w\\s]+\\r?\\n?(\\s+?|\\s?)(?<account_no>\\.+\\d+)\\r?\\n?(\\s+?|\\s?)is\\r?\\n?(\\s+?|\\s?)(?<transaction_type>[a-zA-Z]+)\\r?\\n?\\s+?[\\w\\s]+\\r?\\n?\\s+?(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\n?\\s+?[\\w\\s]+\\r?\\n?\\s+?(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\n?\\s+?at\\r?\\s+?\\n?(?<transaction_time>\\d+:\\d+:\\d+)[\\w\\s]+\\r?\\n?\\s+?at\\r?\\n?\\s+?97(?<location>[\\w\\s]+)\\.?\\r?\\n?\\s+?Call\\r?\\n?\\s+?[\\w\\s]+(\\.?)$',
        '^[\\w\\r?\\n?\\s+?\\,]+PKR(?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)[\\w\\r?\\n?\\s+?,]+sent[\\w\\r?\\n?\\s+?\\,\\(?\\)?\\/\\#]+on\\r?\\n?\\s+?(?<transaction_date>\\d+\\-\\d+\\-\\d+)\\r?\\n?\\s+?(?<transaction_time>\\d+:\\d+:\\d+)[\\w\\r?\\n?\\s+?\\.\\:]+$',
        '^[\\w\\r?\\n?\\s+?\\,]+PKR\\r?\\n?\\s+?(?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)[\\w\\r?\\n?\\s+?\\,+]+withdrawn\\r?\\n?\\s+?[\\w]+\\r?\\n?\\s+?[\\w]+?\\r?\\n?\\s+?(?<location>[\\w]+)[\\w\\r?\\n?\\s+?]+\\r?\\n?\\s+?(?<account_no>\\d+\\*+\\d+)\\r?\\n?\\s+?on\\r?\\n?\\s+?(?<transaction_date>\\d+\\-\\d+\\-\\d+)\\r?\\n?\\s+?(?<transaction_time>\\d+:\\d+)\\.[\\w]+\\r?\\n?\\s+?[\\w]+$',
        '^[\\w\\r?\\n?\\s+?\\,]+PKR\\r?\\n?\\s+?(?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)[\\w\\r?\\n?\\s+?]+charged\\r?\\n?\\s+?at\\r?\\n?\\s+?(?<location>[A-Z]+\\r?\\n?\\s+?[A-Z]+\\r?\\n?\\s+?[A-Z]+\\r?\\n?\\s+?)[\\w\\r?\\n?\\s+?]+\\r?\\n?\\s+?(?<account_no>\\d+\\*+\\d+)\\r?\\n?\\s+?on\\r?\\n?\\s+?(?<transaction_date>\\d+\\-\\d+\\-\\d+)\\r?\\n?\\s+?(?<transaction_time>\\d+:\\d+)[\\r?\\n?\\s+?\\.]+[A-Za-z]+\\r?\\n?\\s+?\\d+$',
      ],
    },
  },
  {
    bankName: 'Silk Bank ',
    bankIcon: `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/Vector.png`,
    bankNumber: [],
    regex: {
      credit: [
        '^[\\w\\s]+\\r?\\n?\\s+?A\\/C No\\.\\r?\\n?\\s+?ending (?<account_no>\\d+)\\r?\\n?\\s+?has\\r?\\n?\\s+?been\\r?\\n?\\s+?(?<transaction_type>[a-zA-Z]+)\\r?\\n?\\s+?by\\r?\\n?\\s+?Rs\\.(?<tranascton_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\n?\\s+?on\\r?\\n?\\s+?(?<transaction_date>\\d+-\\d+-\\d+)\\r?\\n?\\s+?[\\w\\s]+\\r?\\n?\\s+?\\d{2}:\\d{2}:\\d{2}\\.\\r?\\n?\\s+?[\\w\\s.]+\\r?\\n?\\s+?(?<remaining_balance>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)(\\.?)$',
      ],
      debit: [
        '^[\\w\\s,.]+\\r?\\n?\\s+?Rs.(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\n?\\s+?[\\w\\s\\/.ending]+\\r?\\n?\\s+?(?<account_no>\\d+)\\r?\\n?\\s+?[\\w\\s]+\\r?\\n?\\s+?(?<transaction_date>\\d+-\\d+-\\d+)[\\w\\s:.]+\\r?\\n?\\s+?(?<remaining_balance>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)(\\.?)$',
        '/^[\\w\\s]+\\r?\\n?\\s+?A\\/C No\\.\\r?\\n?\\s+?ending (?<account_no>\\d+)\\r?\\n?\\s+?was\\r?\\n?\\s+?charged\\r?\\n?\\s+?for\\r?\\n?\\s+?PKR\\r?\\n?\\s+?Rs\\.(?<tranascton_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\n?\\s+?on\\r?\\n?\\s+?(?<transaction_date>\\d{2}-\\d{2}-\\d{2})\\r?\\n?\\s+?[\\w\\s]+\\r?\\n?\\s+?(?<transaction_time>\\d{2}:\\d{2})\\.\\r?\\n?\\s+?Balance\\r?\\n?\\s+?Rs\\.\\r?\\n?\\s+?(?<remaining_balance>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)(\\.?)$/',
        '/^Dear customer,[\\w\\s]+\\r?\\n?\\s+?(?<account_no>\\d{4}\\*{4}\\d{4})\\r?\\n?\\s+?[\\w\\s#:]+\\r?\\n?\\s+?\\d+\\r?\\n?\\s+?[\\w\\s:]+\\r?\\n?\\s+?\\(\\d+\\)\\r?\\n?\\s+?[\\w\\s]+\\r?\\n?\\s+?\\([a-zA-Z]+\\):\\r?\\n?\\s+?[A-Z\\s]+\\(\\d+\\)\\r?\\n?\\s+?Amount:\\r?\\n?\\s+?Rs\\.\\r?\\n?\\s+?(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\n?\\s+?Date\\/Time:\\r?\\n?\\s+?(?<transaction_date>\\d+\\/\\d+\\/\\d+)\\s(?<transaction_time>\\d{2}:\\d{2}:\\d{2})(\\.?)$/',
      ],
    },
  },
  {
    bankName: 'Faysal Bank ',
    bankIcon:
      'https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/Faysal+Bank+Logo.png',
    bankNumber: [8756],
    regex: {
      credit: [
        '^[\\w\\s,]+\\n?\\r?\\s+?A\\/C\\n?\\r?\\s+?No.\\n?\\r?\\s+?(?<account_no>\\*+\\d+)\\n?\\r?\\s+?[\\w\\s]+\\n?\\r?\\s+?by\\n?\\r?\\s+?PKR\\n?\\r?\\s+?(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\n?\\r?\\s+?on\\n?\\r?\\s+?dated\\n?\\r?\\s+?(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\n?\\r?\\s+?(?<transaction_time>\\d+:\\d+)\\n?\\r?\\s+?[\\w\\s \\/.().]+(\\.?)$',
      ],
      debit: [
        '^[\\w\\s]+\\r?\\s+?\\n?been\\r?\\s+?\\n?(?<transaction_type>[a-zA-Z]+)\\r?\\s+?\\n?[\\w\\s]+\\r?\\s+?\\n?(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\s+?\\n?on\\r?\\s+?\\n?(?<transaction_date>\\d+-[a-zA-Z]+-\\d+)\\r?\\s+?\\n?at\\r?\\s+?\\n?(?<transaction_time>\\d+:\\d+:\\d+)\\r?\\s+?\\n?[a-zA-Z]+\\s+?\\n?\\r?via\\s+?\\r?\\n?(?<location>[\\w\\s]+)\\r?\\s+?\\n?[\\w\\s.-]+(\\.?)$',
      ],
    },
  },
  {
    bankName: 'Standard Chartered',
    bankNumber: [],
    bankIcon:
      'https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/Standard+Chartered+Logo.png',
    regex: {
      credit: [
        '^[\\w\\s]+,\\s[\\w\\s]+\\n?\\r?\\s+?(?<account_no>\\d+\\-\\d+\\*+\\d+\\-\\d+)\\n?\\r?\\s+?has\\n?\\r?\\s+?been\\n?\\r?\\s+?credited\\n?\\r?\\s+?[\\w\\s]+\\n?\\r?\\s+?PKR\\n?\\r?\\s+?(?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)\\n?\\r?\\s+?[\\w\\s\\d\\-\\*]+on\\n?\\r?\\s+?(?<transaction_date>\\d+\\/\\d+\\/\\d+)[\\.\\w\\s]+:PKR\\n?\\r?\\s+?(?<remaining_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)\\.?$',
      ],
      debit: [
        '^[\\w\\s]+,\\n?\\r?\\s+?PKR\\n?\\r?\\s+?(?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)\\n?\\r?\\s+?have\\n?\\r?\\s+?been\\n?\\r?\\s+?paid\\n?\\r?\\s+?at\\n?\\r?\\s+?(?<location>[\\w\\.\\/\\s]+)on\\n?\\r?\\s+?(?<transaction_date>\\d+\\-\\d+\\-\\d+)\\n?\\r?\\s+?[\\w\\s]+\\n?\\r?\\s+?(?<account_no>\\d+).[\\s\\w]+PKR(?<remaining_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+).\\n?\\r?\\s+?[a-zA-Z]+$',
      ],
    },
  },
  {
    bankName: 'JS Bank ',
    bankIcon:
      'https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/JS+Bank+Logo.png',
    bankNumber: [],
    regex: {
      credit: [
        '^A\\/C|a\\/c|[\\w\\s]+(\\.?)\\r?\\s+?\\n?(?<account_no>\\d+[a-zA-Z]+\\d+)-[\\w\\s]+\\r?\\n?\\s?[a-zA-Z]+\\r?\\s+?\\n?[\\w\\s]+\\r?\\n?\\s?PKR\\r?\\s+?\\n?(?<transaction_amount>\\d+|\\d+,\\d+|\\d+,\\d+.\\d+|\\d+.\\d+)\\r?\\s?\\n?[\\w\\s]+\\r?\\s+?\\n?\\d+[a-zA-Z]+\\d+-[\\w\\s]+\\r?\\s+?\\n?(?<transaction_time>\\d+:\\d+)\\r?\\s+?\\n?[\\w\\s]+\\r?\\s+?\\n?(?<transaction_date>\\d+-\\d+-\\d+.)\\r?\\s+?\\n?[\\w\\s]+:\\r?\\s+?\\n?(?<remaining_balance>\\d+,\\d+.\\d+|\\d+|\\d+,\\d+|\\d+.\\d+).\\r?\\s+?\\n?[\\w\\s]+:\\d+-\\d+-\\d+(\\.?)$',
      ],
      debit: [
        '^[\\w\\s\\.]+\\r?\\s+?\\n?(?<account_no>\\d+X+\\d+)[\\-\\w\\s]+debited\\r?\\s+?\\n?by\\r?\\s+?\\n?PKR (?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)\\r?\\s?\\n?[a-zA-Z]+\\r?\\s+?\\n?to\\r?\\s+?\\n?(?<location>[A-Za-z]+)[\\w\\s]+at\\r?\\s+?\\n?(?<transaction_time>\\d+\\:\\d+)\\r?\\s+?\\n?[\\w\\s]+ (?<transaction_date>\\d+\\-\\d+\\-\\d+).[\\w\\s]+:\\r?\\s?\\n?(?<remaining_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)[\\w\\.\\s\\:\\-]+(\\.?)$',
        '^[\\w\\s\\.]+\\r?\\s+?\\n?(?<account_no>\\d+X+\\d+)[\\-\\w\\s]+debited\\r?\\s+?\\n?by\\r?\\s+?\\n?PKR\\r?\\s+?\\n?(?<transaction_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)\\r?\\s+?\\n?[a-zA-Z]+\\r?\\s?\\n?to\\r?\\s?\\n?Mobile\\r?\\s?\\n?(?<location>[A-Za-z]+)[\\s\\w\\-]+at\\r?\\s?\\n?(?<transaction_time>\\d+\\:\\d+)\\r?\\s?\\n?[\\w\\s]+\\r?\\s?\\n?(?<transaction_date>\\d+\\-\\d+\\-\\d+).[\\w\\s]+:\\r?\\s?\\n?(?<remaining_amount>\\d+\\s?\\.?\\,?\\d+\\.?\\d+)[\\w\\.\\s\\:\\-]+(\\.?)',
      ],
    },
  },
];

export const BankKeywords = [
  'a/c',
  'charged',
  'balance',
  'card used',
  'bal',
  'withdrawn',
  'atm',
  'credited',
  'debited',
  'salary trf',
  'pkr',
  'debit card',
  'transaction',
  'remaining',
  'withdrawal',
  'fund',
  'transfer',
  'trx id',
  'txn',
  'sent from',
  'pos',
  'funds',
  'tid',
  'payment',
  'purchased',
  'received',
  'account',
];

export const allBankIcons = [
  `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/Vector.png`,
  `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/UBL+Logo.png`,
  `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/Standard+Chartered+Logo.png`,
  `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/MCB+Bank+Logo.png`,
  `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/MB+Logo.png`,
  `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/JS+Bank+Logo.png`,
  `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/HBL.png`,
  `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/Faysal+Bank+Logo.png`,
  `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/BOP.png`,
  `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/Bank+Alfalah+Logo.png`,
  `https://theepa-storage.s3.eu-central-1.amazonaws.com/uploads/Alied+Bank.png`,
];
