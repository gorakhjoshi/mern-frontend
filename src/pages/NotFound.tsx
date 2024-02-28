import Image404 from "../assets/404.png";

function NotFound() {
  return (
    <div className="text-center mt-[90px] mx-auto flex flex-col justify-center">
      <img
        src={Image404}
        alt="404-not-found"
        className="object-contain h-[550px]"
      />
    </div>
  );
}

export default NotFound;
