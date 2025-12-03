type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ className, ...props }: LabelProps) => {
  return <label className={className} {...props} />;
};

export default Label;
