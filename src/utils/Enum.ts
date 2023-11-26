export enum TransactionType {
  Deposit = "deposit",
  WithdrawalRequested = "withdrawal-requested",
  WithdrawalApproved = "withdrawal-approved",
  WithdrawalDone = "withdrawal-done",
  WithdrawalFailed = "withdrawal-failed",
}
export enum ErrorCode {
  UNKNOWN_ERROR,
  TOKEN_IS_INVALID,
  UPDATE_ZERO_FIELD,
  TOO_MANY_REQUEST,
  OTP_INVALID_OR_EXPIRED,
  FILE_NOT_EXIST,
  CONTRACT_NOT_EXISTED,
  REQUEST_SPAM,
  NOT_FOUND,

  // User
  USER_INVALID = 1000,
  ADDRESS_EXISTS,
  USER_EMAIL_VERIFIED,
  EMAIL_EXISTS,
  PASSWORD_IS_INVALID,
  USER_NOT_FOUND,
  NONCE_INVALID,
  ADDRESS_INVALID,
  EMAIL_ACTIVATED,
  EMAIL_EXIST,
  USER_BANNED,
}
export enum TokenType {
  LOGIN = 1,
  ACTIVE_USER,
  RESET_PASSWORD,
}

export enum UserType {
  NORMAL = 1,
  ADMIN = 2,
}

export enum StatusCode {
  SUCCESS = 200
}