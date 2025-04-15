import clsx from "clsx";
import cardStyles from "./Card.module.css";
import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return <div className={clsx(cardStyles.card, className)}>{children}</div>;
};

export default Card;
