import { FC } from "react";

interface Props {
  isLoading?: boolean;
  className?: string;
}

const LoadingSpinner: FC<Props> = ({ children, isLoading, className }) => (
  <>
    {isLoading ? (
      <div className="spinner-border mt-5 ml-5" role="status">
        <span className="sr-only" />
      </div>
    ) : (
      <span className={className}>{children}</span>
    )}
  </>
);

export default LoadingSpinner;
