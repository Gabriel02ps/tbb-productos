import styles from "./styles.module.scss";

type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({ placeholder, value, onChange }: SearchInputProps) {
  return (
    <div className={styles.inputSearch}>
    <input
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={onChange}
    />
    <img src="/icons/search.svg" alt="Ícone de pesquisa"/>
  </div>
  )
}

