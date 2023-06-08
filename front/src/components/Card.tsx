import styles from "./css/Card.module.css";
interface CardProps {
  content: string;
  title: string;
  size: "Big" | "Medium" | "Small";
  color?: "Green" | "Red" | "Blue";
  icon?: string;
  miniIcon?: string;
  initialDateContent?: string;
  finalDateContent?: string;
  fontSize?: "fontDate"| "Normal";
}
function setContent(
  content: string,
  initialDateContent: string,
  finalDateContent: string,
  fontSize= "Normal"
) {
  if (initialDateContent != "") {
    return (
      <div className={styles.divDates}>
        <p>{initialDateContent}</p>
        <p>até</p>
        <p>{finalDateContent}</p>
      </div>
    );
  } else {
    return <div className={`${styles.divDates} ${styles[fontSize]}`}>{content}</div>;
  }
}

export function Card({
  title,
  content,
  size,
  color = "Green",
  icon = "",
  miniIcon = "",
  initialDateContent = "",
  finalDateContent = "",
  fontSize = "Normal",
}: CardProps) {
  return icon != "" ? (
    <div className={`${styles.Card} ${styles[size]}  ${styles[color]} `}>
      <img className={styles.icon} src={icon}></img>
      <span>{title}</span>
    </div>
  ) : (
    <div
      className={`${styles.Card}  ${styles[size]}  ${styles[color]} `}
    >
      <span>{title}</span>
      {setContent(content, initialDateContent, finalDateContent,fontSize)}
    </div>
  );
}
