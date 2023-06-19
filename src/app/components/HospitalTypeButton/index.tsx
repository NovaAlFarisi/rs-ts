import { HospitalCategoryType } from "@/interfaces/hospital";
import { ButtonHTMLAttributes } from "react";

interface HospitalTypeProps {
    type: HospitalCategoryType
    selectedType: string,
    onClick: (type: 'covid' | 'non-covid') => void;
}

const HospitalTypeButton = ({ type, selectedType, onClick }: HospitalTypeProps) => {
    const isActive = type === selectedType;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        onClick(type);
      };

    return (
      <button
        onClick={handleClick}
        className={`bg-blue-500 text-white rounded-md py-2 px-4 ${isActive ? 'bg-red-500 bg-white text-gray-700 bg-opacity-75 shadow-lg' : ''} text-base font-bold w-full bg-transparent border-0`}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    );
  };

export default HospitalTypeButton