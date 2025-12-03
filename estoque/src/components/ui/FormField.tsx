import React from "react";
import { useId } from "react";

type FormFieldProps = {
  label?: string;
  error?: string;
  children: React.ReactNode;
};

export const FormField = ({ label, error, children }: FormFieldProps) => {
  const id = useId();

  let child = children;
  if (React.isValidElement<HTMLInputElement>(children)) {
    child = React.cloneElement(children, { id });
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium" htmlFor={id}>
          {label}
        </label>
      )}

      {child}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
