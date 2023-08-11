export * from '../model/store/core.store/client.store';
import { Table } from '../components/organism/table/base';
import { useAuth } from '../model/interactions/use-auth';
import TableComponents from "../components/organism/table"
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  EmailPage,
  ResetPasswordPage,
} from '../pages/(auth)';

export const Auth = {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  EmailPage,
  ResetPasswordPage,
  useAuth,
};

export { Table, TableComponents };
