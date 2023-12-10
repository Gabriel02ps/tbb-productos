import styles from "./styles.module.scss";

type ProductProps = {
  image: string;
  alt: string;
  name: string;
};

export default function Product({ image, alt, name }: ProductProps) {
  return (
    <div className={`${styles.product} animeUp`}>
      <img src={image} alt={alt} />
      <p>{name}</p>
    </div>
  );
}
