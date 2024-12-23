interface buttonParams {
  title: string;
  onClick?: () => any;
  className?: string;
}

export default function Button({ title, onClick, className }: buttonParams) {
  return (
    <button
      className={
        "bg-orange-main text-white font-bold px-2 py-1 relative block z-0 " +
        "before:absolute before:w-full before:scale-x-0 before:origin-left before:h-full before:top-0 before:left-0 before:bg-black before:block before:-z-10 " +
        "before:ease-in-out before:duration-200 hover:before:scale-x-100 " +
        className
      }
      onClick={onClick}
    >
      <p className="">{title}</p>
    </button>
  );
}
