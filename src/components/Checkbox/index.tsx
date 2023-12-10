import styles from "./styles.module.scss";

type CheckboxProps = {
  text: string;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Checkbox({
  text,
  selectedFilters,
  setSelectedFilters,
}: CheckboxProps) {

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedList = [...selectedFilters];
    if (event.target.checked) {
      updatedList = [...selectedFilters, event.target.value];
    } else {
      updatedList.splice(selectedFilters.indexOf(event.target.value), 1);
    }
    setSelectedFilters(updatedList);
  };

  return (
    <div className={styles.checkbox}>
      <input type="checkbox" id={text} value={text} onChange={handleCheck} />
      <label htmlFor={text}>{text}</label>
    </div>
  )
}
