import { FC } from "react";

interface CustomFileInputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  className?: string;
  acceptedFormats?: string; // Nueva prop
}

const CustomFileInput: FC<CustomFileInputProps> = ({
  onChange,
  children,
  className,
  acceptedFormats = "*/*", // Valor por defecto
}) => {
  return (
    <label
      style={{ cursor: "pointer" }}
      className={`${className} relative overflow-hidden w-fit p-[0.4rem] text-white flex justify-center items-center bg-[#2ecc71] rounded-[0.3rem]`}
    >
      {children}
      <input
        onChange={onChange}
        className="absolute opacity-0 cursor-pointer file:w-[100%] file:h-[100%]"
        type="file"
        accept={acceptedFormats}
      />
    </label>
  );
};

export default CustomFileInput;
