interface ButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, "className"> {
  //nos attributs custom
  type: "reset" | "submit" | "button";
}

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <>
      <button {...props} className="w-full bg-blue text-white p-2 rounded-lg" />
    </>
  );
};

export default Button;
