import { IoMdCart } from "react-icons/io";

interface productProps {
  name: string;
  image: string;
  price: number;
  stock: number;
  id: string;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
}
function ProductCard({
  name,
  image,
  price,
  handleClick,
}: productProps) {
  return (
    <div
      className="w-[15rem] p-2 m-3 bg-white rounded-lg shadow-lg relative"
      onClick={handleClick}
    >
      {/* <div className="absolute bg-slate-700 w-full h-full  z-10 top-0 left-0 opacity-0 hover:opacity-30 hover:cursor-pointer"></div> */}
      <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0 z-10 bg-slate-700 opacity-0 hover:opacity-30 flex justify-center items-center hover:cursor-pointer" title="Add to cart">
        <IoMdCart className="text-3xl bg-white rounded-[100%] z-30" />
      </div>

      {/* <div className="absolute top-[50%] left-[50%] ml-[-25px] mt-[-25px] z-20">
        </div> */}
      <div className="space-y-2 flex flex-col justify-center items-center relative">
        <img
          src={`${image}`}
          alt="product-image"
          className="w-[200px] h-[200px] object-contain"
        />
        <h5 className="text-xl text-center">{name}</h5>
        <p className="font-bold text-center text-lg">&#8377;{price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
