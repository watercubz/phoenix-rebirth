import { deleteCookie, setCookie } from "cookies-next";
import { Configuration } from "../../types";
import { removeSubdomain } from "../remove-subdomain";
import { CreateUserParams, InviteProcessParams } from "@kanvas/core";

export function useAuth({ sdk }: Configuration) {
  async function login(email: string, password: string) {
    try {
      const { models } = removeSubdomain(window.location.hostname);
      const response = await sdk!.auth.login(email, password);
      setCookie(
        "refresh_token",
        {
          token: response.refresh_token,
          expires: response.refresh_token_expires,
        },
        {
          domain: models.onlyDomain,
        },
      );
      setCookie("token", response.token, {
        domain: models.onlyDomain,
      });
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
    custom_fields,
    phone_number,
  }: CreateUserParams) {
    try {
      const { models } = removeSubdomain(window.location.hostname);
      const response = await sdk!.users.register({
        email,
        firstname,
        lastname,
        displayname,
        password,
        password_confirmation,
        custom_fields,
        phone_number: String(phone_number),
      });
      // TODO(Kanvas core): Fix the response type on kanvas of register
      setCookie("refresh_token", {
        // @ts-ignore
        token: response.register?.token?.refresh_token,
        // @ts-ignore
        expires: response.register?.token?.refresh_token_expires,
        domain: models.onlyDomain,
      });
      //@ts-ignore
      setCookie("token", response.register?.token?.token, {
        domain: models.onlyDomain,
      });

      return response;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async function logout(): Promise<void> {
    try {
      const { models } = removeSubdomain(window.location.hostname);
      await sdk!.auth.logout();
      deleteCookie("token", {
        domain: models.onlyDomain,
      });
      deleteCookie("refresh_token", {
        domain: models.onlyDomain,
      });
      localStorage.clear();
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
        verify_password,
      );
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async function changePassword({
    current_password,
    new_password,
    confirm_new_password,
  }: Record<string, string>) {
    try {
      const response = await sdk!.auth.changePassword(
        current_password,
        new_password,
        confirm_new_password,
      );
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async function processInvite(user: InviteProcessParams) {
    try {
      const { models } = removeSubdomain(window.location.hostname);
      const response = await sdk!.users.processInvite(user);
      setCookie("refresh_token", {
        token: response?.refresh_token,
        expires: response?.refresh_token_expires,
        domain: models.onlyDomain,
      });
      setCookie("token", response?.token, {
        domain: models.onlyDomain,
      });
      return response;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  return {
    operations: {
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      changePassword,
      processInvite,
    },
  };
}
