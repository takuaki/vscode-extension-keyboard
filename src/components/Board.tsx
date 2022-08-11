import React from "react";
import { Button } from "./Button";

const Board = () => {
  const onPressKey = [];

  return (
    <div className="board">
      <div className="board board__line">
        <Button character="q" press></Button>
        <Button character="w"></Button>
        <Button character="e"></Button>
        <Button character="r"></Button>
        <Button character="t"></Button>
        <Button character="y"></Button>
        <Button character="u"></Button>
        <Button character="i"></Button>
        <Button character="o"></Button>
        <Button character="p"></Button>
      </div>
      <div className="board__line"></div>
      <div className="board__line"></div>
    </div>
  );
};

export { Board };
