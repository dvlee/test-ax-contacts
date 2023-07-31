import { ComponentPropsWithoutRef, FC } from "react";

interface Props extends ComponentPropsWithoutRef<"input"> {
  label: string;
  error?: string;
}

const FormInput: FC<Props> = (props) => {
  const { label, error, ...rest } = props;

  const inputClasses = ["p-2", "w-full", "border", "border-gray-400"];

  if (error) inputClasses.push("border-red-500");

  return (
    <div>
      <label>{label}</label>
      <input className={inputClasses.join(" ")} {...rest} />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default FormInput;
