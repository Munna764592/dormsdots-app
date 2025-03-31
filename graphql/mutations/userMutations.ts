import { gql } from "@apollo/client";

export const SEND_OTP = gql`
  mutation SendOtp($input: SendOtpInput!) {
    sendOtp(input: $input)
  }
`;

