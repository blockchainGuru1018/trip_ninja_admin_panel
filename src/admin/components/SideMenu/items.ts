export default [
  {
    title: "Your Preferences",
    children: [
      {
        name: 'Basic Information',
        link: '/',
        access_level: 0,
      },
    ]
  },
  {
    title: "Company Defaults",
    children: [
      {
        name: 'General Info',
        link: '/general-info',
        access_level: 1,
      },
      {
        name: 'Content Sources',
        link: '/content-sources',
        access_level: 1,
      },
      {
        name: 'Search/ Booking Details',
        link: '/search-booking-detail',
        access_level: 1,
      },
      {
        name: 'Billing and Account Management',
        link: '/billing-account-management',
        access_level: 1,
      },
    ]
  },
  {
    title: "Settings",
    children: [
      {
        name: 'Users',
        link: '/users',
        access_level: 1,
      },
      {
        name: 'Teams',
        link: '/teams',
        access_level: 1,
      },
      {
        name: 'Agency Accounts',
        link: '/agency-accounts',
        access_level: 2,
      },
    ]
  },
];