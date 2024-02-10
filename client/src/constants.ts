

const passwordLength = 8;
const accFirstName = 20;
const accLastName = 40;

const logOutAlertText =
  "Are you sure you want to Logout?";

const somethingIsWrong = "Something is Wrong";


enum UserType{
  USER="User",
  SENDER="Sender",
  RECIEVER='Reciever'
}

const success = "success";
const warning = "warning";
const error = "error";
const notice = "notice";

const variantSuccess = "bg-green-300";
const variantWarning = "bg-orange-300";
const variantError = "bg-red-300";
const variantNotice = "bg-gray-300";
const reviewReportedChat = "/api/v1/reportedChats/reviewReportedChat";
const reviewReportedUser = "/api/v1/userReport/reviewReport";
const findAllUserReportApi = "/api/v1/userReport/findAllReports";
const findReportedUserApi = "/api/v1/userReport/findReport/";
const findAllReportedChatApi = "/api/v1/reportedChats/findAllReportedChats";
const findReportedChatApi = "/api/v1/reportedChats/findReportedChat/";
const reviewVerificationImgApi = "/api/v1/verifImgReq/reviewVerificationImg";
const findVerifyImgRequestApi = "/api/v1/verifImgReq/findVerifyImgReq/";
const findAllVerifyImgRequestApi = "/api/v1/verifImgReq/findAllVerifyImgReq";

const SUCCESS_STATUS_CODE = 200;
const FAILED_STATUS_CODE = 201;

const getEnumKeyFromValue = (enumObject: any, targetValue: any) => {
  for (let key in enumObject) {
    if (enumObject[key] === targetValue) {
      return key;
    }
  }
  return null;
};

const REVIEWER_DASHBOARD_ROUTE = "reviewer/*";
const ADMIN_MANAGER_DASHBOARD_ROUTE = "adminManager/*";
const SIGN_IN_ROUTE = "/signIn";
const SIGN_UP_ROUTE = "/signUp";
const VERIFY_SIGN_UP_ROUTE = `/api/v1/admin/verifyAndSignUp/*`;
const FORGET_PASSWORD_ROUTE = "/forgotPassword";
const VERIFY_FORGET_PASSWORD_ROUTE = `/api/v1/admin/verifyAdminForgotPassword/*`;

const NAME = "name";
const EMAIL = "email";
const PASSWORD = "password";
const LAST_NAME = "lastName";
const TEXT = "text";

const PASSWORD_IS_MANDATORY = "Password is mandatory";
const PASSWORD_MAX_CHAR_LENGTH = `Password must be at ${passwordLength} char long`;
const FIRST_NAME_IS_MANDATORY = "First name is mandatory";
const FIRST_NAME_MAX_CHAR_LENGTH = `First name must be at ${accFirstName} char long`;
const LAST_NAME_IS_MANDATORY = "Last name is mandatory";
const LAST_NAME_MAX_CHAR_LENGTH = `Last name must be at ${accLastName} char long`;
const ENTER_VALID_EMAIL = "Please enter a valid email format !";
const EMAIL_IS_MANDATORY = "Email is mandatory";

export {
  passwordLength,
  accFirstName,
  accLastName,
  success,
  warning,
  error,
  notice,
  variantError,
  variantNotice,
  variantSuccess,
  variantWarning,
  reviewReportedChat,
  reviewReportedUser,
  somethingIsWrong,
  SUCCESS_STATUS_CODE,
  FAILED_STATUS_CODE,
  findAllUserReportApi,
  findReportedUserApi,
  findAllReportedChatApi,
  findReportedChatApi,
  reviewVerificationImgApi,
  findAllVerifyImgRequestApi,
  findVerifyImgRequestApi,
  REVIEWER_DASHBOARD_ROUTE,
  ADMIN_MANAGER_DASHBOARD_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  VERIFY_SIGN_UP_ROUTE,
  FORGET_PASSWORD_ROUTE,
  VERIFY_FORGET_PASSWORD_ROUTE,
  NAME,
  EMAIL,
  PASSWORD,
  LAST_NAME,
  TEXT,
  PASSWORD_IS_MANDATORY,
  PASSWORD_MAX_CHAR_LENGTH,
  FIRST_NAME_IS_MANDATORY,
  FIRST_NAME_MAX_CHAR_LENGTH,
  LAST_NAME_IS_MANDATORY,
  LAST_NAME_MAX_CHAR_LENGTH,
  ENTER_VALID_EMAIL,
  EMAIL_IS_MANDATORY,
  getEnumKeyFromValue,
  UserType,
  logOutAlertText,
};
