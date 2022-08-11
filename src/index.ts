import "./styles/_all.sass";

const component = () => {
  console.log("component");
  const element = document.createElement("span");
  return element;
};

document.body.appendChild(component());
