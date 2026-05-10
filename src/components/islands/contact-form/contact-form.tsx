import { useId } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./contact-form.module.css";
import { Field, FieldError, FieldLabel } from "../field";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { SubmitButton } from "../submit-button";
import { FormMessage } from "../form-message";
import { ErrorBoundary } from "./error-boundary";
import { PUBLIC_FORMSPREE_URL } from "astro:env/client";

const contactSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters"),
  email: z.email("That doesn't look like a valid email address"),
  message: z.string().min(10, "Tell me a bit more - at least 10 characters"),
  honeypot: z.string().optional(),
});

function ariaProps(
  fieldName: keyof ContactFormData,
  fieldId: string,
  errors: FieldErrors<ContactFormData>,
) {
  const error = errors[fieldName];

  return {
    "aria-describedby": error ? `${fieldId}-err` : undefined,
    "aria-invalid": !!error || undefined,
    "aria-label": `${fieldName} input`,
  };
}

type ContactFormData = z.infer<typeof contactSchema>;

const MAX_MESSAGE_LENGTH = 400;

export function ContactForm() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const message = useWatch({ control, name: "message" });

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) {
      reset();
      return;
    }

    clearErrors("root");

    try {
      const response = await fetch(PUBLIC_FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `New message from ${data.name}`,
        }),
      });

      if (!response.ok) throw new Error();

      reset(undefined, { keepIsSubmitSuccessful: true });
      setTimeout(() => reset(), 5000);
    } catch {
      setError("root", {
        message: "Something went wrong — please try again.",
      });
      setTimeout(() => clearErrors("root"), 5000);
    }
  };

  const messageLength = message?.length ?? 0;

  return (
    <ErrorBoundary>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={styles.form}
      >
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            top: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
          {...register("honeypot")}
        />
        <Field invalid={!!errors.name}>
          <FieldLabel htmlFor={nameId}>Your name</FieldLabel>
          <Input
            id={nameId}
            placeholder="Your name"
            autoComplete="name"
            {...ariaProps("name", nameId, errors)}
            {...register("name")}
          />
          <FieldError id={`${nameId}-err`} message={errors.name?.message} />
        </Field>
        <Field invalid={!!errors.email}>
          <FieldLabel htmlFor={emailId}>Your email</FieldLabel>
          <Input
            id={emailId}
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            {...ariaProps("email", emailId, errors)}
            {...register("email")}
          />
          <FieldError id={`${emailId}-err`} message={errors.email?.message} />
        </Field>
        <Field invalid={!!errors.message}>
          <FieldLabel htmlFor={messageId}>Your message</FieldLabel>
          <Textarea
            id={messageId}
            placeholder="Tell me about your project..."
            length={messageLength}
            maxLength={MAX_MESSAGE_LENGTH}
            rows={3}
            {...ariaProps("message", messageId, errors)}
            {...register("message")}
          />
          <FieldError
            id={`${messageId}-err`}
            message={errors.message?.message}
          />
        </Field>
        <SubmitButton isSubmitting={isSubmitting} />
        <FormMessage visible={isSubmitSuccessful} variant="success" />
        <FormMessage
          visible={!!errors.root}
          variant="error"
          message={errors.root?.message}
        />
      </form>
    </ErrorBoundary>
  );
}
