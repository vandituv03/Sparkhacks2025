import React from "react";

// ✅ Main Table Component
export const Table = ({ children, className = "" }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse border border-gray-300 ${className}`}>
        {children}
      </table>
    </div>
  );
};

// ✅ Table Header Component
export const TableHeader = ({ children, className = "" }) => {
  return <thead className={`bg-gray-100 text-gray-700 ${className}`}>{children}</thead>;
};

// ✅ Table Body Component
export const TableBody = ({ children, className = "" }) => {
  return <tbody className={className}>{children}</tbody>;
};

// ✅ Table Row Component
export const TableRow = ({ children, className = "" }) => {
  return <tr className={`border-b border-gray-300 ${className}`}>{children}</tr>;
};

// ✅ Table Head Component (Column Titles)
export const TableHead = ({ children, className = "" }) => {
  return <th className={`px-4 py-2 font-medium text-left border border-gray-300 ${className}`}>{children}</th>;
};

// ✅ Table Cell Component (Data Cells)
export const TableCell = ({ children, className = "" }) => {
  return <td className={`px-4 py-2 border border-gray-300 ${className}`}>{children}</td>;
};
