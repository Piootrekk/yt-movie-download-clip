import clsx from "clsx";
import buttonStyles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={clsx(buttonStyles.button, className)}>
      {children}
    </button>
  );
};

export default Button;
