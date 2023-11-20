// ErrorBoundary.tsx
import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorFallbackProps {
  error: Error;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => (
  <div>
    <p>An error occurred: {error.message}</p>
    {/* You can customize this fallback UI as needed */}
  </div>
);

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const handleError = (error: Error, info: { componentStack: string }) => {
    console.error("Error caught by ErrorBoundary:", error, info);
  };

  return (
    <ReactErrorBoundary onError={handleError} FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
