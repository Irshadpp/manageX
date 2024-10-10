import React from "react";

const ErrorMessage = ({ errorMessage }: { errorMessage: string | null }) => {
  return (
    <div className="my-2">
      {errorMessage && (
        <p className="text-red-600 text-sm font-medium">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;
