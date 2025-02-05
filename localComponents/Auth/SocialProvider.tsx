import { signIn } from "next-auth/client";
import React from "react";

interface Props {
  provider: string;
}

const SocialProvider = (props: Props) => {
  let icon;
  let color;
  let clickHandler;

  switch (props.provider) {
    case "twitter":
      icon = <i className="fab fa-twitter"></i>;
      color = "blue-400";
      clickHandler = () =>
        signIn("twitter", { callbackUrl: `${process.env.BASE_URL}/` });
      break;
    case "google":
      icon = <i className="fab fa-google"></i>;
      color = "red-400";
      clickHandler = () =>
        signIn("google", { callbackUrl: `${process.env.BASE_URL}/` });
      break;
    case "facebook":
      icon = <i className="fab fa-facebook-f"></i>;
      color = "blue-500";

      break;
    default:
      break;
  }

  return (
    <span
      className={`cursor-pointer transition-all w-12 h-12 grid place-items-center mr-2 border-2 border-gray-200 p-2 text-xl text-gray-600 rounded-full hover:border-transparent hover:text-gray-50 hover:bg-${color}`}
      onClick={clickHandler}
    >
      {icon}
    </span>
  );
};

export default SocialProvider;
