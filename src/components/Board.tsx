import React, { useEffect, useState } from "react";
import { Button } from "./Button";

const Board = () => {
  const [pressKeys, setPressKeys] = useState<string[]>([]);

  //if you want to check web, enable below(+unable below code)
  /*const setKeys = ({ shiftKey, altKey, ctrlKey, key }: KeyboardEvent) => {
    const keys = [];
    if (/^[a-z]$/.test(key)) keys.push(key);
    if (shiftKey) keys.push("shift");
    if (altKey) keys.push("alt");
    if (ctrlKey) keys.push("ctrl");
    setPressKeys(keys);
  };

  useEffect(() => {
    window.document.addEventListener("keydown", setKeys);
    return () => {
      window.document.removeEventListener("keydown", setKeys);
    };
  });*/

  //if you want to check vscode, enable below(+unable upper code)
  const setKeyPress = (ev: MessageEvent<any>) => {
    const data = ev.data;
    if ("keys" in data) {
      const keys = data["keys"] as string[];
      setPressKeys(keys);
    }
  };

  useEffect(() => {
    window.addEventListener("message", setKeyPress);
    return () => {
      window.removeEventListener("message", setKeyPress);
    };
  });

  const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  return (
    <div className="board">
      <div className="board board__line">
        {keys[0].map((key) => (
          <Button
            character={key}
            press={pressKeys.includes(key)}
            key={key}
          ></Button>
        ))}
      </div>
      <div className="board__line">
        {keys[1].map((key) => (
          <Button
            character={key}
            press={pressKeys.includes(key)}
            key={key}
          ></Button>
        ))}
      </div>
      <div className="board__line">
        {keys[2].map((key) => (
          <Button
            character={key}
            press={pressKeys.includes(key)}
            key={key}
          ></Button>
        ))}
      </div>
    </div>
  );
};

export { Board };
