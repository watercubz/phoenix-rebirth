import { setCookie, deleteCookie } from 'cookies-next';
import { Configuration } from '../../types';
;

export function useAuth({ sdk }: Configuration) {
  async function login(email: string, password: string) {
    try {
      const response = await sdk!.auth.login(email, password);

      setCookie('refresh_token', {
        token: response.refresh_token,
        expires: response.refresh_token_expires,
      });
      setCookie('token', response.token);
      return response;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async function register({
    email,
    firstname,
    lastname,
    displayname,
    password,
    password_confirmation,
  }: Record<string, string>) {
    try {
      const response = await sdk!.users.register({
        email,
        firstname,
        lastname,
        displayname,
        password,
        password_confirmation,
      });
      // TODO(Kanvas core): Fix the response type on kanvas
      //@ts-ignore
      setCookie('token', response.register?.token?.token);
      return response;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async function logout(): Promise<void> {
    try {
      await sdk!.auth.logout();
      deleteCookie('token');
      deleteCookie('refresh_token');
    } catch (err) {
      console.error(err);
    }
  }

  async function forgotPassword(email: string) {
    try {
      const response = await sdk!.users.forgotPassword(email);
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async function resetPassword({
    hash_key,
    new_password,
    verify_password,
  }: Record<string, string>) {
    try {
      //@ts-ignore
      const response = await sdk.auth.resetPassword(
        hash_key,
        new_password,
        verify_password
      );
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  return {
    operations: {
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
    },
  };
}