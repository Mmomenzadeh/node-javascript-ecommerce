import { CardProduct } from "Components";
import "../../Assets/Styles/Components/ProductsList/index.scss";
export const ProductsList = ({productData}) => {
  return (
    <div className="ProductsList">
      {productData.map((product) => {
        return <CardProduct product={product} size="Large" />;
      })}
    </div>
  );
};
