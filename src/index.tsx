import { createRoot } from "react-dom/client";
import { Board } from "./components/Board";
import "./styles/_all.sass";

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<Board />);
