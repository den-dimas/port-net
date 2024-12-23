import Button from "./Button";

interface selectButtonParams {
  title: string;
  onClick?: () => any;
  className?: string;
  isSelected: boolean;
}

export default function SelectButton({
  title,
  onClick,
  className,
  isSelected,
}: selectButtonParams) {
  return (
    <Button
      title={title}
      onClick={onClick}
      className={
        (isSelected
          ? " text-white before:scale-x-100 border-black "
          : " !text-orange-main border-orange-main ") +
        " text-wrap bg-transparent border-2 hover:!text-white hover:border-black ease-in-out duration-100  " +
        className
      }
    />
  );
}
