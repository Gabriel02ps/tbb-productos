import { useEffect, useState } from "react";
import { Product } from "../../pages";
import Checkbox from "../Checkbox";

import styles from "./styles.module.scss";

type FiltersProps = {
  products: Product[] | null;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Filters({
  products,
  selectedFilters,
  setSelectedFilters,
}: FiltersProps) {
  const [filters, setFilters] = useState<string[] | null>(null);

  useEffect(() => {
    const filtersList: string[] = [];

    if (products) {
      products.forEach((product) => {
        if (!filtersList.includes(product.category.name)) {
          filtersList.push(product.category.name);
        }
      });
    }

    setFilters(filtersList);
  }, [products]);

  return (
    <div className={`${styles.checkboxGroup} animeUp`}>
      <strong>Filtros</strong>

      {filters &&
        filters.map((filter, index) => (
          <Checkbox
            key={index}
            text={filter}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        ))}
    </div>
  )
}
