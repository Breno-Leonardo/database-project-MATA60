import { useState } from "react";
import styles from "./css/Buton.module.css";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  size: "ExtraBig" | "Big" | "Medium" | "Small";
  color?: "Green" | "Red";
  visibility?: "Visible" | "Invisible";
}

export function Button({
  content,
  size,
  color = "Green",
  visibility = "Visible",
  onClick,
}: ButtonProps) {
  //avoid double click
  const [disable, setDisable] = useState(false);

  return (
    <button
      onClick={(e) => {
        if (onClick != undefined) {
          onClick(e);
        }
        setDisable(true);
        setTimeout(() => {
          setDisable(false);
        }, 3000);
      }}
      disabled={disable}
      className={`${styles.button} ${styles[size]} ${styles[color]} ${styles[visibility]}`}
    >
      {content}
    </button>
  );
}
