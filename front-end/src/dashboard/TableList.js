import React from "react";
import { useHistory } from "react-router";
import { unassignTable } from "../utils/api";

function FinishButton({ status, table, loadDashboard }) {
  const history = useHistory();

  async function handleClick() {
    return window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    )
      ? await handleFinish(table.table_id, table.reservation_id)
      : null;
  }

  async function handleFinish(table_id, reservation_id) {
    await unassignTable(table_id, reservation_id);
    await loadDashboard();
    history.push("/dashboard");
  }

  return (
    status === "Occupied" && (
      <td>
        <button
          data-table-id-finish={table.table_id}
          type="button"
          onClick={handleClick}
          className="btn btn-sm btn-primary"
        >
          Finish
        </button>
      </td>
    )
  );
}


function TableInfo({ table, loadDashboard }) {
    const status = table.reservation_id ? "Occupied" : "Free";
    return (
      <>
        <tr>
          <th scope="row">{table.table_id}</th>
          <td>{table.table_name}</td>
          <td>{table.capacity}</td>
          <td data-table-id-status={table.table_id}>{status}</td>
          <FinishButton
            status={status}
            table={table}
            loadDashboard={loadDashboard}
          />
        </tr>
      </>
    );
  }

export default function TableList({ tables, loadDashboard }) {
  if (!tables) {
    return null;
  }

  const formatted = tables.map((table) => {
    return (
      <TableInfo key={table.table_id} table={table} loadDashboard={loadDashboard} />
    );
  });

  return (
    <div>
      <table className="table table-sm table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Table</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
            <th scope="col">Finish</th>
          </tr>
        </thead>
        <tbody>{formatted}</tbody>
      </table>
    </div>
  );
}