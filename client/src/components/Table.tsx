import React from "react";
import clsx from "clsx";

export const Table = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <table className={clsx("w-full text-sm text-left rtl:text-right text-gray-500", className)}>
    {children}
  </table>
);

export const TableHead = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <thead className={clsx("text-xs text-gray-700 uppercase bg-gray-50", className)}>
    {children}
  </thead>
);

export const TableHeaderRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <tr className={clsx("", className)}>{children}</tr>;

export const TableHeaderCell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <th scope="col" className={clsx(" py-3 font-dm", className)}>
    {children}
  </th>
);

export const TableBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <tbody className={clsx("", className)}>{children}</tbody>;

export const TableRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <tr className={clsx("bg-white border-b border-gray-200 hover:bg-gray-50", className)}>
    {children}
  </tr>
);

export const TableCell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <td className={clsx("", className)}>{children}</td>;
