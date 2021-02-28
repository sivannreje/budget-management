import React from "react";
import EmptyState from "./EmptyState";

export default function Table({ columns, data, onEdit, onDelete }) {
  console.log(data);
  return (
    <div className="table-area">
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.title}</th>
              ))}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, itemIndex) => (
              <tr key={itemIndex}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>{item[column.key]}</td>
                ))}
                <td>
                  <button
                    className="bp3-button bp3-minimal bp3-icon-edit"
                    onClick={() => onEdit(item)}
                  ></button>
                </td>
                <td>
                  <button
                    className="bp3-button bp3-minimal bp3-icon-trash"
                    onClick={() => onDelete(item.id)}
                  ></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {data.length === 0 && <EmptyState />}
    </div>
  );
}
