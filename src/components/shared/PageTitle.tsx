const PageTitle = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return <h1 className={`text-4xl font-semibold text-secondary ${className}`}>{children}</h1>;
};

export default PageTitle;
