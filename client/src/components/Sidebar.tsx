import { useContext, useState } from "react";
import { LogOut } from "react-feather";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AlertPopup from "./AlertPopup";
import { logOutAlertText } from "../constants";
import { signOut } from "../adapters/general";
import { ToastContext } from "./Toast/ToastProvider";


interface route {
  title: string;
  path: string;
  icon: any;
  cName: string;
}

interface Props {
  routes: route[];
}

const Sidebar: React.FC<Props> = ({ routes }) => {
  const [showPopup, setShowPopup] = useState<Boolean>(false);
  const { handleCreateToast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  return (
    <div className="z-50 min-w-[17%] bg-white">
      <div className="h-[10%] flex items-center gap-2 justify-center">
        <Link to="/" className="text-xl font-extrabold text-gray-900">
          PIMS
        </Link>
      </div>
      <div className="flex flex-col justify-between h-[90%]">
        <ul className="px-4">
          {routes.map((route, index) => {
            return (
              <li key={index} className={route.cName}>
                <NavLink
                  to={route.path}
                  className="py-3 px-4 my-4 flex items-center gap-2 rounded-md font-medium"
                >
                  {route.icon}
                  <span>{route.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div
          className="py-4 hover:cursor-pointer px-8 my-4 flex items-center gap-2 rounded-md font-medium"
          onClick={() => {
            setShowPopup(true);
          }}
        >
          <LogOut />
          logout
        </div>
        {showPopup ? (
          <AlertPopup
            message={logOutAlertText}
            Close={() => {
              setShowPopup(false);
            }}
            onSubmit={() => {
              setIsLoading(true);
              signOut(navigate, handleCreateToast, setIsLoading);
            }}
            isLoading={isLoading}
          ></AlertPopup>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
