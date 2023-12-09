import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import styles from "../styles/home.module.scss";
import axios, { AxiosResponse, AxiosError } from "axios";

type ProductImages = {
  alt: string;
  asset: {
    url: string;
  };
};

export type Product = {
  name: string;
  shortDescription: string;
  id: string;
  images: ProductImages[];
  category: {
    _id: string;
    name: string;
  };
};

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [inputSearch, setInputSearch] = useState<string>("");
  const handleInputSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('inputSearch', inputSearch);
    
  };
  
  const getProducts = async () => {
    await axios
      .get<Product[]>("/db/products.json")
      .then((response: AxiosResponse) => {
        setProducts(response.data.data.nodes);
      })
      .catch((error: AxiosError) => console.log(error));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.form}>
        <h2>Busca tus productos</h2>
          <form onSubmit={handleInputSearch} className={styles.search}>
              <SearchInput
                placeholder="Busca aquí..."	
                value={inputSearch}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputSearch(e.target.value);
                }}
              />
          </form>
        </div>

        <div>
          <span>Resultados: {products ? products.length : 0}</span>
          <ul>
            {products?.map((product, index) => (
              <li key={index}>{product.name}</li>
            ))}
          </ul>
        </div>
        
      </div>

    </div>
  )
}
