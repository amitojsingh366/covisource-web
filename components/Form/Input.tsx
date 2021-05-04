import React from "react";

interface Props {
  className?: string;
  subClassName?: string;
  prepend?: any;
  append?: any;
  placeholder?: string;
  id?: string;
  onChange?: any;
  onKeyDown?: any;
  name?: string;
  type?: string;
}

const Input = (props: Props) => {
  return (
    <div className={"relative flex items-center " + props.className}>
      {props.prepend ? (
        <div className="absolute left-3">{props.prepend}</div>
      ) : (
        ""
      )}
      <input
        type={props.type || "text"}
        name={props.name}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder || ""}
        id={props.id || ""}
        className={`w-full bg-gray-200 placeholder-gray-700 border-none rounded-lg h-12 focus:ring-0 text-sm ${
          props.prepend ? "pl-10" : ""
        } ${props.append ? "pr-8" : ""} ${props.subClassName || ""}`}
      />
      {props.append ? (
        <div className="absolute right-2">{props.append}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
