const urls = {
   baseUrl : 'https://kshirsa-money-backend-dev.onrender.com/kshirsa',
   generateOtp: '/api/v1/auth/otp',
   validateOtp: '/api/v1/auth/otp/validate',
   getUserDetails: '/api/v1/my/get/details',
   updateUserDetails: '/api/v1/my/update/details',
   logout: '/api/v1/auth/logout',
   addTransaction: '/api/v1/track/add/transaction',
   getRecentTransactions: '/api/v1/track/get/transaction/recent',
   deleteTransaction: '/api/v1/track/delete/transaction',
   getTransaction: '/api/v1/track/get/transaction',
   updateTransaction: '/api/v1/track/update/transaction',
   getCategories: '/api/v1/track/get/category',
}
export default urls;