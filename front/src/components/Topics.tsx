import styles from "./css/Topics.module.css";
interface Topics {
  fields: string[];
  colorsFields?: string[]; // uma cor para cada field
  position?: "center" | "spaced";
}



export function Topics({fields, colorsFields = [], position = "spaced"}: Topics) {
  return (
    <div className={`${styles.topics} ${styles[position]}`}>
      <>
        {fields.map((field, index) => {
          return (
            <p key={field} className={`${styles[colorsFields[index]]}`}>
              {field}
            </p>
          );
        })}
      </>
    </div>
  );
}
