import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "../field";
import { SubmitButton } from "../submit-button";
import { ErrorBoundary } from "./error-boundary";
import { PUBLIC_FORMSPREE_URL } from "astro:env/client";
import { toast } from "@/stores/toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters"),
  email: z.email("That doesn't look like a valid email address"),
  message: z.string().min(10, "Tell me a bit more - at least 10 characters"),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const MAX_MESSAGE_LENGTH = 500;

export function ContactForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: undefined,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) {
      toast.info("Not sure what happened here :/");
      return;
    }

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

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      reset();
      toast.success("Sent! I'll get back to you soon.");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      toast.error(errorMessage);
    }
  };

  return (
    <ErrorBoundary>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
        <FormField
          name="name"
          label="Your name"
          control={control}
          disabled={isSubmitting}
          autoComplete="name"
        />
        <FormField
          name="email"
          label="Your email"
          control={control}
          type="email"
          disabled={isSubmitting}
          autoComplete="email"
        />
        <FormField
          name="message"
          label="Your message"
          control={control}
          type="textarea"
          disabled={isSubmitting}
          maxLength={MAX_MESSAGE_LENGTH}
          rows={3}
        />
        <SubmitButton
          label="Send message"
          loadingLabel="Sending…"
          isSubmitting={isSubmitting}
        />
      </form>
    </ErrorBoundary>
  );
}
