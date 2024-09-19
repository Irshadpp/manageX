const InputBox = ({
    data,
    bg,
    noCapitalize,
  }: {
    data: any;
    bg?: string;
    noCapitalize?: boolean;
  }) => {
    return (
      <p
        className={`p-2 w-full rounded-md border border-border text-sm ${
          !noCapitalize && "capitalize"
        } ${bg === "black" ? "bg-background" : "bg-backgroundAccent"}`}
      >
        {data ?? "-"}
      </p>
    );
  };
  
  export default InputBox;
  