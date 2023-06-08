import styles from "./css/TextArea.module.css";
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  
  placeholder: string;
  title?:string;
}

export function TextArea({ placeholder, title="Mensagem",disabled,value, onChange }: TextAreaProps) {
  return (
    <div className={styles.divForText}>
    <span>{title}</span>
      <textarea onChange={onChange} value={value} disabled={disabled} className={styles.TextArea} placeholder={placeholder}></textarea>
    </div>
    // <button className={`${styles.button} ${styles[size]} ${styles[color]}`}>{content}</button>
  );
}
