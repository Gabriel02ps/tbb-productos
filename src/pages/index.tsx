import { useCallback, useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import axios, { AxiosResponse, AxiosError } from "axios";
import Product from "../components/Product";
import Filters from "../components/Filters";

import styles from "../styles/home.module.scss";

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
  const [inputSearch, setInputSearch] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsBackup, setProductsBackup] = useState<Product[]>([]);
  const getProducts = async () => {
    await axios
      .get<Product[]>("/db/products.json")
      .then((response: AxiosResponse) => {
        setProducts(response.data.data.nodes);
        setProductsBackup(response.data.data.nodes);
      })
      .catch((error: AxiosError) => console.log(error));
  };

  useEffect(() => {
    getProducts();
  }, []);
  
  const filterProducts = useCallback(() => {
    if (inputSearch === "" && selectedFilters.length === 0) {
      return productsBackup;
    }
  
    if (inputSearch !== "" && selectedFilters.length) {
      return productsBackup?.filter((product) =>
        selectedFilters.includes(product.category.name) &&
        product.name.toLowerCase().includes(inputSearch.toLowerCase())
      );
    }
  
    if (inputSearch === "" && selectedFilters.length) {
      return productsBackup?.filter((product) =>
        selectedFilters.includes(product.category.name)
      );
    }
  
    if (inputSearch !== "" && selectedFilters.length === 0) {
      return productsBackup?.filter((product) =>
        product.name.toLowerCase().includes(inputSearch.toLowerCase())
      );
    }
  
    return [];
  }, [inputSearch, productsBackup, selectedFilters]);
  
  useEffect(() => {
    setProducts(filterProducts());
  }, [filterProducts]);
  
  const handleInputSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    setProducts(filterProducts());
  };
  
  if (!products) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.products}>
            <h1>Nuestros</h1>
            <h2>Productos</h2>
              <form onSubmit={handleInputSearch} className={styles.search}>
                  <SearchInput
                    placeholder="Busca aquí..."	
                    value={inputSearch}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setInputSearch(e.target.value);
                    }}
                  />
              </form>
            <Filters
              products={productsBackup}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </div>

          <div className="animeUp">
            <span>Resultados: {products ? products.length : 0}</span>
              <div className={styles.productsGrid}>
                  {products.map((product, index) => (
                    <Product
                      key={index}
                      image={product.images[0].asset.url}
                      alt={product.images[0].alt}
                      name={product.name}
                    />
                  ))}
            </div>
         </div>
        </div>
      </div>
    </div>
  )
}
