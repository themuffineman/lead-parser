import React from "react";

interface LeadData {
  name: string;
  jobTitle: string | null;
  company: string | null;
  location: string | null;
  employees: number | null;
  linkedin: string | null;
}

interface DataTableProps {
  data: LeadData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  // Get all unique keys from the data to create table headers
  const headers = Array.from(new Set(data.flatMap((obj) => Object.keys(obj))));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-black text-green-400 border border-green-400/30">
        <thead>
          <tr className="border-b border-green-400/30">
            {headers.map((header) => (
              <th
                key={header}
                className="py-2 px-4 text-left min-w-max font-semibold uppercase text-sm"
              >
                {header.replace(/([A-Z])/g, " $1").trim()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-900/50" : "bg-gray-800/50"}
            >
              {headers.map((header) => (
                <td
                  key={`${index}-${header}`}
                  className="py-2 px-4 border-b min-w-max border-green-400/10"
                >
                  {row[header as keyof LeadData]?.toString() || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export function arrayToCSV(data: Record<string, any>[]): string {
  if (!data.length) return "";

  // Get all unique keys from all objects
  const headers = Array.from(new Set(data.flatMap((obj) => Object.keys(obj))));

  // Create CSV header row
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const val = row[header] ?? "";
          // Escape quotes and commas
          if (typeof val === "string") {
            return `"${val.replace(/"/g, '""')}"`;
          }
          return `"${val}"`;
        })
        .join(",")
    ),
  ];

  return csvRows.join("\n");
}

export default DataTable;
