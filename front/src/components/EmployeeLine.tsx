import styles from "./css/EmployeeLine.module.css";
import accountIcon from "../assets/account.svg";
interface EmployeeLine {
  fields: string[];
  colorsFields?: string[]; // uma cor para cada field
  attentionFlag?: boolean;
  position?: "center" | "spaced";
  hasIcon?: boolean;
}

// retorna a flag de atenção para caso o funcionario esteja em até dois meses da data final do periodo concessivo
function isFlaged(attentionFlag: boolean) {
  if (attentionFlag) return <span className={styles.alertSpan}>Atenção</span>;
}



export function EmployeeLine({
  fields,
  attentionFlag = false,
  colorsFields = [],
  position = "spaced",
  hasIcon = true,
}: EmployeeLine) {
  return (
    <div key={fields.toString()+Math.floor(Math.random() * 101).toString()} className={`${styles.employeeLine} ${styles[position]}`}>
      <>
        {/* Checando se tem que colocar o icone */}
        {hasIcon ? (
          <div className={styles.nameDiv}>
            <img className={styles.icon} src={accountIcon}></img>
            <p className={`${styles[colorsFields[0]]}`}>{fields[0]}</p>
          </div>
        ) : (
          <p className={`${styles[colorsFields[0]]}`}>{fields[0]}</p>
        )}

        {/* Checando se tem que por a flag */}
        {fields.map((field, index) => {
          if (index > 0 && index < fields.length - 1) {
            return (
              <p  key={field.toString()+Math.floor(Math.random() * 101).toString()} className={`${styles[colorsFields[index]]}`}>
                {field}
              </p>
            );
          } else if (index == fields.length - 1) {
            if (attentionFlag) {
              return (
                <div key={field.toString()+Math.floor(Math.random() * 101).toString()} className={styles.alertDiv}>
                  <>
                    {isFlaged(attentionFlag)}
                    <p className={`${styles[colorsFields[index]]}`}>{field}</p>
                  </>
                </div>
              );
            } else {
              return (
                <p key={field.toString()+Math.floor(Math.random() * 101).toString()} className={`${styles[colorsFields[index]]}`}>
                  {field}
                </p>
              );
            }
          }
        })}
        
      </>
    </div>
  );
}
