import { OrderItem } from "../types/types";

function OrderedProductCard({ photo, name, price, quantity }: OrderItem) {
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <img
          src={`${photo}`}
          alt="product-image"
          className="w-[50px] h-[50px] object-contain"
        />
      </div>
      <div>{name}</div>
      <div>
        {price} * {quantity} = {price * quantity}
      </div>
    </div>
  );
}

export default OrderedProductCard;
