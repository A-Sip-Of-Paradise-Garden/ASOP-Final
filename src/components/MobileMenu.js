import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const MobileMenu = ({ URLS, toggleMenu }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
      <div className="flex flex-col gap-2 bg-white p-4 rounded shadow-lg max-w-md w-full overflow-auto">
        <AiOutlineCloseCircle
          onClick={toggleMenu}
          className=" text-red-500 hover:bg-red-100 hover:cursor-pointer rounded-full text-2xl ml-auto"
        />
        {URLS.map((path) => (
          <Link
            className={`border-2 hover:bg-gray-100 text-center rounded py-2`}
            to={path.path}
            onClick={toggleMenu}
          >
            {path.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
