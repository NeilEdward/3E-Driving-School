type CHeadingProps = {
  title: string;
};

const CHeading = ({ title }: CHeadingProps) => {
  return <h1 className="font-bold text-2xl">{title}</h1>;
};

export default CHeading;
