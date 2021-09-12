export const Button = ({
  children,
  onClick = () => {},
  type = "primary",
  className = "",
}) => {
  let defaultClassName =
    className +
    ` font-medium rounded px-3 py-2 text-white transform duration-100`;

  if (type === "secondary") {
    defaultClassName += ` bg-indigo-500 hover:bg-indigo-400`;
  } else {
    defaultClassName += ` bg-green-500 hover:bg-green-400`;
  }

  return (
    <button onClick={onClick} className={defaultClassName}>
      {children}
    </button>
  );
};
