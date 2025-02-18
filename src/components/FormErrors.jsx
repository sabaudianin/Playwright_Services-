import React from "react";
import { useFormikContext } from "formik";
import { isEmpty } from "lodash-es";

export function FormErrors() {
  const { errors } = useFormikContext();

  if (isEmpty(errors)) {
    return null;
  }

  return (
    <ul className="error-messages">
      {Object.entries(errors).map(([key, messages]) =>
        messages.map((message) => (
          <li key={`${key} ${message}`}>
            {key} {message}
          </li>
        ))
      )}
    </ul>
  );
}
