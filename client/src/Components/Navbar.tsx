import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { LoginResponse, SetValue } from "../Utils/Types";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

interface MyNavbarProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
}

export default function MyNavbar(props: MyNavbarProps) {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    console.log(props.user);
    props.setUser({
      id: 0,
      userName: "",
      token: "",
    });
    navigate("/");
  }

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <Link to={`/`} className="flex items-center text-xl">
          Home
        </Link>
      </Typography>
      {props.user.token && (
        <Typography
          as="li"
          variant="small"
          color="white"
          className="p-1 font-normal"
        >
          <Link
            to={`/favorites`}
            state={{ favoriteIdWhenRouted: 0 }}
            className="flex items-center text-xl"
          >
            Favorite Recipes
          </Link>
        </Typography>
      )}
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-full py-2 px-4 lg:px-8 lg:py-4 bg-[#3459E6] rounded-none border-none">
      <div className="container max-w-full  mx-auto flex items-center justify-between text-white">
        <Link
          to={`/`}
          className="mr-4 cursor-pointer py-1.5 font-normal text-2xl"
        >
          <span>The Meal Spinner</span>
        </Link>
        <div className="hidden lg:block text-white">{navList}</div>
        <div className="hidden lg:block text-white">
          {!props.user.token ? (
            <>
              <Button
                variant="outlined"
                size="sm"
                color="white"
                className="hidden lg:inline-block text-md mr-2"
              >
                <Link to={`/login`}>
                  <span>
                    <LoginOutlinedIcon /> Sign in
                  </span>
                </Link>
              </Button>
              <Button
                variant="filled"
                size="sm"
                color="white"
                className="hidden lg:inline-block text-md"
              >
                <Link to={`/signup`}>
                  <span>Sign up</span>
                </Link>
              </Button>
            </>
          ) : (
            <Button
              variant="filled"
              type="button"
              size="sm"
              color="red"
              className="hidden lg:inline-block text-md"
              onClick={handleLogout}
            >
              <span>
                <LogoutOutlinedIcon /> Logout
              </span>
            </Button>
          )}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          {!props.user.token ? (
            <>
              <Button
                variant="outlined"
                size="sm"
                color="white"
                fullWidth
                className="mb-2 text-sm"
              >
                <Link to={`/login`}>
                  <span>Sign in</span>
                </Link>
              </Button>
              <Button
                variant="filled"
                size="sm"
                fullWidth
                className="mb-2 text-sm"
              >
                <Link to={`/signup`}>
                  <span>Sign up</span>
                </Link>
              </Button>{" "}
            </>
          ) : (
            <Button
              variant="filled"
              type="button"
              size="sm"
              color="red"
              fullWidth
              className="mb-2 text-sm"
              onClick={handleLogout}
            >
              <span>
                Logout <LogoutOutlinedIcon />
              </span>
            </Button>
          )}
        </div>
      </MobileNav>
    </Navbar>
  );
}
