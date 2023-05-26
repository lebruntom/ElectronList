import { IoMdLock, IoMdMail } from "react-icons/io";

interface OtherProps {
  icon?: string;
  error?: {
    name: string;
    touched: boolean;
  };
}

const Input: React.FC<OtherProps> = ({ error, icon, ...props }) => {
  return (
    <div className="min-h-[75px]">
      <div className="relative flex align-center">
        <input
          className={`${
            icon && "pl-10"
          }  text-white bg-transparent border border-2 text-sm rounded-lg focus:ring-blue2 focus:border-blue2 focus:bg-secondary focus:outline-none block w-full p-2.5 ${
            (error && error.name && error.touched && "border-red-500 border") ||
            "border-secondary "
          } `}
          {...props}
        />
        {icon && icon === "IoMdMail" && (
          <IoMdMail className="text-white absolute left-[10px] top-[14px]" />
        )}
        {icon && icon === "IoMdLock" && (
          <IoMdLock className="text-white absolute left-[10px] top-[13px]" />
        )}
      </div>

      {error && error.name && error.touched ? (
        <div className="text-red-500 text-xs flex justify-end">
          {error.name}
        </div>
      ) : (
        <div className="">&nbsp;</div>
      )}
    </div>
  );
};

export default Input;
