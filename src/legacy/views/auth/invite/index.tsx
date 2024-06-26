import { useClientContext } from "../../../../model/store/core.store/client.store";
import { Body, Button, Heading } from "../../../../legacy/components/atoms";
import Spinner from "../../../../legacy/components/atoms/icons/spinner";
import { useAuth } from "../../../../model/interactions/use-auth";
import { Form } from "../../../../legacy/components/molecules";
import { useUser } from "@/model/interactions/use-user";
import { useAsync, useUpdateEffect } from "react-use";
import { AuthPageTypes } from "@/model/types";
import { translate } from "@/translate";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";

interface User {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  password_confirmation?: string;
  phone_number?: string;
}

interface UseInviteProps {
  redirect: () => void;
  allow_phone?: boolean;
  hash: string;
}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  firstname: yup.string().required(translate("auth.signUp.requiredFirstName")),
  lastname: yup.string(),
  email: yup.string().email().required(translate("auth.signUp.requiredEmail")),
  password: yup
    .string()
    .min(8)
    .required(translate("auth.signUp.requiredPassword")),
  password_confirmation: yup
    .string()
    .required(translate("auth.signUp.requiredPasswordConfirmation"))
    .oneOf([yup.ref("password")], translate("auth.signUp.passwordMatch")),
  phone_number: yup
    .string()
    .matches(phoneRegExp, "Invalid Phone Format")
    .nullable(),
});

export function useInvite({ redirect, hash }: UseInviteProps) {
  const { sdk } = useClientContext();
  const { operations: authOperations } = useAuth({ sdk });
  const { operations: userOperations } = useUser({ sdk });

  const fetchUser = async (): Promise<User> => {
    if (!hash) {
      throw new Error(translate("auth.invite.hashError"));
    }
    const result = await userOperations.getInviteUserByHash(hash);
    return {
      email: result?.email as string,
      firstname: result?.firstname as string,
      lastname: result?.lastname as string,
      password: "",
      password_confirmation: "",
      phone_number: "",
    };
  };

  const userState = useAsync(fetchUser, [hash]);

  const onSubmit = async (values: User) => {
    if (!hash || !userState.value) {
      throw new Error(translate("auth.invite.hashError"));
    }
    await authOperations.processInvite({
      invite_hash: hash,
      password: values.password,
      lastname: values.lastname,
      firstname: values.firstname,
      //@ts-ignore
      phone_number: values.phone_number,
    });
    const profile = await userOperations.getUserInfo();
    localStorage.setItem("user", JSON.stringify(profile));
    redirect();
  };

  const formikProps = useFormik({
    initialValues: userState.value || {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit,
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
    isSubmitting,
    setValues,
  } = formikProps;

  useUpdateEffect(() => {
    if (userState.value) {
      setValues(userState.value);
    }
  }, [userState.value]);

  return {
    models: { values, errors, loading: isSubmitting || userState.loading },
    operations: { handleChange, handleSubmit, setErrors },
  };
}

export function InvitePage({ redirect, hash, allow_phone }: UseInviteProps) {
  const { models, operations } = useInvite({ redirect, hash });
  const { theme } = useClientContext();
  return (
    <div className={theme.auth.container}>
      <div>
        <Heading.Five className={theme.auth.title}>
          {translate("auth.signUp.title")}
        </Heading.Five>
      </div>

      <FormComponent
        theme={theme.auth}
        models={models}
        operations={operations}
        allow_phone={allow_phone}
      />
    </div>
  );
}

interface FormComponentProps {
  theme: AuthPageTypes;
  models: any;
  operations?: any;
  allow_phone?: boolean;
}

function FormComponent({
  theme,
  models,
  operations,
  allow_phone,
}: FormComponentProps) {
  return (
    <form className={theme.form.container} onSubmit={operations.handleSubmit}>
      <div className={theme.group.container}>
        <NameInputFields
          models={models}
          operations={operations}
          theme={theme}
        />
        <AuthInputFields
          models={models}
          operations={operations}
          theme={theme}
          allow_phone={allow_phone}
        />
      </div>

      <ActionForm models={models} theme={theme} />
    </form>
  );
}

function NameInputFields({ theme, models, operations }: FormComponentProps) {
  return (
    <div className={theme.group.rows}>
      <Form.TextInput
        theme={theme.textInput}
        type="text"
        label={translate("auth.firstName.label")}
        placeholder={translate("auth.firstName.placeholder")}
        value={models.values.firstname}
        onChange={operations.handleChange}
        name="firstname"
        helpText={models.errors.firstname}
        error={!!models.errors.firstname}
      />

      <Form.TextInput
        theme={theme.textInput}
        type="text"
        label={translate("auth.lastName.label")}
        placeholder={translate("auth.lastName.placeholder")}
        value={models.values.lastname}
        onChange={operations.handleChange}
        name="lastname"
      />
    </div>
  );
}

function AuthInputFields({
  theme,
  models,
  operations,
  allow_phone,
}: FormComponentProps) {
  return (
    <div className={theme.group.columns}>
      <Form.TextInput
        theme={theme.textInput}
        type="email"
        placeholder={translate("auth.email.placeholder")}
        label={translate("auth.email.label")}
        value={models.values.email}
        onChange={operations.handleChange}
        name="email"
        helpText={models.errors.email}
        error={!!models.errors.email}
        disabled={true}
      />

      {allow_phone && (
        <Form.TextInput
          theme={theme.textInput}
          type="text"
          label={translate("auth.phone.label")}
          placeholder={translate("auth.phone.placeholder")}
          value={models.values.phone_number}
          onChange={operations.handleChange}
          name="phone_number"
          helpText={models.errors.phone_number}
          error={!!models.errors.phone_number}
        />
      )}

      <Form.TextInput
        theme={theme.textInput}
        type="password"
        label={translate("auth.password.label")}
        placeholder={translate("auth.password.placeholder")}
        value={models.values.password}
        onChange={operations.handleChange}
        name="password"
        helpText={models.errors.password}
        error={!!models.errors.password}
      />

      <Form.TextInput
        theme={theme.textInput}
        type="password"
        label={translate("auth.password.confirm")}
        placeholder={translate("auth.password.placeholder")}
        value={models.values.password_confirmation}
        onChange={operations.handleChange}
        name="password_confirmation"
        helpText={models.errors.password_confirmation}
        error={!!models.errors.password_confirmation}
      />
    </div>
  );
}

function ActionForm({ theme, models }: FormComponentProps) {
  return (
    <div className={theme.group.columns}>
      <Button.Solid
        className={theme.form.button}
        size="small"
        type="submit"
        disabled={models.loading}
      >
        {models.loading ? <Spinner /> : translate("auth.signUp.buttonLabel")}
      </Button.Solid>

      <span className={theme.form.span}>
        <Body.Three className={theme.form.title}>
          {translate("auth.signIn.haveAccount")}
        </Body.Three>

        <Link className={theme.form.link} href="/sign-in">
          {translate("auth.signUp.signInLink")}
        </Link>
      </span>
    </div>
  );
}
