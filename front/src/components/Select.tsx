import styles from "./css/Select.module.css";
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  optionsDouble?: any[][];
  optionsUnique?: string[] | number[];
  sizeSelect?: "Big" | "Medium" | "Small";
  width?: "Big" | "Medium" | "Small";
  optionDisabled?: string;
}
// cada option do array de options é constituido por duas opções, cpf e nome
export function Select({
  optionsDouble = [],
  optionsUnique = [],
  sizeSelect = "Medium",
  width = "Big",
  onChange,
  value,
  placeholder,
  disabled,
  optionDisabled,
}: SelectProps) {
  const sizeWidth = "width" + width;
  if (disabled==true) {
    return (
      <select
        onChange={onChange}
        disabled={disabled}
        className={`${styles.Select} ${styles[sizeSelect]} ${styles[sizeWidth]}`}
      >
        <option value={optionDisabled} selected>
          {optionDisabled}
        </option>
      </select>
    );
  }
  if (optionsDouble.length > 0) {
    return (
      <select
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.Select} ${styles[sizeSelect]} ${styles[sizeWidth]}`}
      >
        {optionsDouble.map((option) => {
          return (
            <option key={option[0]} value={option[0]}>
              {option[1]}
            </option>
          );
        })}
      </select>
    );
  } else {
    return (
      <select
        onChange={onChange}
        className={`${styles.Select} ${styles[sizeSelect]} ${styles[sizeWidth]}`}
      >
        {optionsUnique.map((option) => {
          return value == option ? (
            <option key={option} value={option} selected>
              {option}
            </option>
          ) : (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    );
  }
}
