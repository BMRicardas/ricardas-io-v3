import { Button } from "../button/button";

type Props = {
  label: string;
  loadingLabel?: string;
  isSubmitting: boolean;
};

export function SubmitButton({ label, loadingLabel, isSubmitting }: Props) {
  return (
    <Button type="submit" disabled={isSubmitting} fullWidth>
      {isSubmitting && loadingLabel ? loadingLabel : label}
    </Button>
  );
}
