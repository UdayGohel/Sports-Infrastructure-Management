import React, { useState, useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Link } from "react-router-dom";
import { LeaderboardServices } from "./LeaderboardServices";
export default function LeaderboardDataTable({ selectedOption }) {
  const [deleterefresh, setdeleterefresh] = useState(true);
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValues, setGlobalFilterValues] = useState({
    SportName: "",
    Category: "",
  });

  useEffect(() => {
    LeaderboardServices.getCustomersXLarge(selectedOption).then((data) => {
      setCustomers(getCustomers(data));
      setLoading(false);
    });
    initFilters();
  }, [selectedOption]);

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;
    // Update the global filter value for all fields
    setGlobalFilterValues({
      SportName: value,
      Category: value,
    });

    setFilters(_filters);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    // Set the global filter values for all fields to empty strings
    setGlobalFilterValues({
      Name: "",
      ContactNum: "",
      Email: "",
    });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between mr-2">
        <Button
          type="button"
          label="Clear"
          outlined
          className="px-4 py-2 rounded-lg text-blue-800 ring-0 border-2 border-blue-700 hover:bg-gray-200"
          onClick={clearFilter}
        />
        <span className="p-input-icon-left">
          <InputText
            value={globalFilterValues.Name}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className="p-2 ring-1 ring-opacity-50 ring-black focus:ring-blue-600 focus:ring-2 focus:ring-opacity-70 hover:ring-opacity-100 hover:ring-blue-400"
          />
        </span>
      </div>
    );
  };

  const dateBodyTemplate = (rowData) => {
    const date = new Date(rowData.dob);
    return formatDate(date);
  };

  const formatDate = (value) => {
    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-between">
        <Link to={"/admin/blogsedit"} state={{ data: rowData }}>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 p-1"
          >
            {/* Your SVG icon for editing */}
          </button>
        </Link>
        <button
          type="button"
          //   onClick={() => DeleteHandler(rowData)}
          className="text-red-500 hover:text-red-700 p-1"
        >
          {/* Your SVG icon for deleting */}
        </button>
      </div>
    );
  };

  const header = renderHeader();
  const [first, setFirst] = useState(0);

  const calculateIndex = (currentPage, rowIndex) => {
    return currentPage * 10 + rowIndex + 1;
  };

  return (
    <div className="card">
      <DataTable
        value={customers}
        paginator
        showGridlines
        stripedRows
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        loading={loading}
        dataKey="_id"
        filters={filters}
        globalFilterFields={["SportName", "Category"]}
        header={header}
        emptyMessage="No Data found."
      >
        <Column
          field="index"
          header="Index"
          style={{ width: "4rem" }}
          body={(rowData) => {
            const rowIndex = customers.indexOf(rowData);
            return calculateIndex(Math.floor(first / 10), rowIndex);
          }}
        />

        <Column
          header="Athelte Name"
          field="name"
          filterField="name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Athelte Rating"
          field="rating"
          filterField="rating"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Photo"
          field="image"
          filterField="image"
          body={(rowdata) => {
            return (
              <img
                className="w-full h-56"
                src={`http://localhost:9999/${rowdata.image.slice(1)}`}
                alt="Sport Facility Pic"
              />
            );
          }}
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Athelte Email"
          field="email"
          filterField="email"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Athelte Number"
          field="contact"
          filterField="contact"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Athelte Rating"
          field="dob"
          filterField="dob"
          body={(rowData) => {
            return <h2>{dateBodyTemplate(rowData)}</h2>;
          }}
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Athelte Address"
          field="address"
          filterField="address"
          style={{ minWidth: "12rem" }}
        />
      </DataTable>
    </div>
  );
}