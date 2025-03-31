import { gql } from "@apollo/client";

// Mutation to send OTP
export const SEND_OTP_MUTATION = gql`
  mutation SendOTP($phone: String!) {
    sendOTP(phone: $phone) {
      success
      message
    }
  }
`;

// Mutation to verify OTP
export const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOTP($phone: String!, $otp: String!) {
    verifyOTP(phone: $phone, otp: $otp) {
      success
      token
      user {
        id
        phone
      }
    }
  }
`;
