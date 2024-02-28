import { ChangeEventHandler } from "react";

function Input({
  type,
  id,
  name,
  value,
  labelText,
  classesForLabel,
  classesForInput,
  placeholder,
  isRequired = true,
  handleChange,
}: {
  type: string;
  id: string;
  name: string;
  value?: string | number;
  labelText?: string;
  classesForLabel?: string;
  classesForInput: string;
  placeholder?: string;
  isRequired?: boolean;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <>
      {labelText && (
        <label htmlFor={id} className={classesForLabel}>
          {labelText}
        </label>
      )}
      <input
        required={isRequired}
        type={type}
        name={name}
        id={id}
        value={value}
        className={classesForInput}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </>
  );
}

export default Input;
