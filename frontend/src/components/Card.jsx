import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};


export const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`border-b pb-2 mb-2 font-semibold text-lg ${className}`}>
      {children}
    </div>
  );
};


export const CardTitle = ({ children, className = "" }) => {
  return (
    <h2 className={`text-xl font-bold text-gray-800 ${className}`}>
      {children}
    </h2>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`text-gray-700 ${className}`}>
      {children}
    </div>
  );
};
