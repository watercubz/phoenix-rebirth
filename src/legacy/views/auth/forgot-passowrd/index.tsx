import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Form } from "../../../../legacy/components/molecules";
import { useAuth } from "@/model/interactions";
import { useClientContext } from "@/client";
import { toast } from "react-hot-toast";
import { translate } from "@/translate";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";

import {
  Body,
  Button,
  Heading,
  Icons,
} from "../../../../legacy/components/atoms";

interface props {
  router: AppRouterInstance;
}

export function useForgotPassword({ router }: props) {
  const { sdk } = useClientContext();

  const initialValues = {
    email: "",
  };

  const { operations } = useAuth({ sdk });
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(translate("auth.email.required")),
  });

  async function onSubmit(values: typeof initialValues) {
    const { email } = values;

    try {
      await operations.forgotPassword(email);
      router.push(`/forgot-password/${email}`);
      toast.success(translate("auth.sendEmail.success"));
    } catch {
      setErrors({
        email: translate("auth.sendEmail.error"),
      });
      toast.error(translate("auth.sendEmail.error"));
    }
  }
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
    isSubmitting,
  } = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit,
  });

  return {
    models: {
      values,
      errors,
      loading: isSubmitting,
    },
    operations: {
      handleChange,
      handleSubmit,
    },
  };
}

export function ForgotPasswordPage({ router }: props) {
  const { models, operations } = useForgotPassword({ router });
  const { theme } = useClientContext();
  return (
    <div className={theme.auth.container}>
      <section className={theme.auth.group.columns}>
        <Link href="/sign-in">
          <Button.Link>
            <Icons.ArrowLeft />
          </Button.Link>
        </Link>
        <Heading.Four className={theme.auth.title}>
          {translate("auth.forgotPassword.title")}
        </Heading.Four>

        <Body.Two>{translate("auth.forgotPassword.description")}</Body.Two>
      </section>
      <form
        className={theme.auth.form.container}
        onSubmit={operations.handleSubmit}
      >
        <Form.TextInput
          theme={theme.auth.textInput}
          label={translate("auth.email.label")}
          placeholder={translate("auth.email.placeholder")}
          name="email"
          value={models.values.email}
          error={!!models.errors.email}
          helpText={models.errors.email}
          onChange={operations.handleChange}
          required
        />

        <Button.Solid
          className={theme.auth.form.button}
          size="small"
          type="submit"
        >
          {translate("auth.sendEmail.buttonLabel")}
        </Button.Solid>
      </form>
    </div>
  );
}
