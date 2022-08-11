import React, { useState } from "react";

type Props = { character: string; press?: boolean };
const Button = (props: Props) => {
  //const [isPressed, setPress] = useState(false);

  return (
    <button className={`button ${props.press ?? false ? "button--pressed" : ""}`}>
      <span className="button__text">{props.character}</span>
    </button>
  );
};

export { Button };
