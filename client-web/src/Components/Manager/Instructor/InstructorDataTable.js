import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { InstructorService } from "./InstructorServices";
import { useSelector } from "react-redux";

export default function InstructorDataTable() {
  const { _id } = useSelector((state) => state.user.user);
  const [deleterefresh, setdeleterefresh] = useState(true);
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValues, setGlobalFilterValues] = useState({
    Name: "",
    ContactNum: "",
    Email: "",
    District: "",
  });
  const [cookies] = useCookies(["token"]);

  const DeleteHandler = (rowdata) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        var myHeaders = new Headers();
        myHeaders.append("token", cookies.token);
        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow",
        };
        fetch(`http://localhost:9999/deleteblog/${rowdata._id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            setdeleterefresh(!deleterefresh);
          })
          .catch((error) => console.log("error", error));
        console.log("Deleted !!");
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    InstructorService.getCustomersXLarge(_id).then((data) => {
      setCustomers(getCustomers(data));
      setLoading(false);
    });
    initFilters();
  }, [deleterefresh]);

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
      Name: value,
      ContactNum: value,
      Email: value,
      District: value,
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
      District: "",
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
    const date = new Date(rowData.CreatedAt);
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
          onClick={() => DeleteHandler(rowData)}
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

  const representativeBodyTemplate = (rowData) => {
    return rowData.Category.join(", ");
  };

  // const DistrictBodyTemplete = (rowdata) => {
  //   const data = district.find((c) => c._id === rowdata.DistrictId);
  //   return data.District;
  // };

  // const getDistrictName = (id) => {
  //   const data = district.find((c) => c._id === id);
  //   return data.District;
  // };

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
        globalFilterFields={["Name", "ContactNum", "Email"]}
        header={header}
        emptyMessage="No Blogs found."
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
          header="Instructor Name"
          field="userId.Name"
          filterField="Name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Intructor Contact Number"
          field="userId.ContactNum"
          filterField="ContactNum"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Instructor Email"
          field="userId.Email"
          filterField="Email"
          style={{ minWidth: "12rem" }}
        />

        <Column
          header="Sports"
          field="sports"
          filterField="Email"
          style={{ minWidth: "12rem" }}
          body={(rowData) => {
            const sports = rowData.sports;
            if (Array.isArray(sports) && sports.length > 0) {
              return (
                <ul>
                  {sports.map((sport, sportIndex) => (
                    <li key={sportIndex} className="flex border-2">
                      <div className="flex flex-col mx-4">
                        <span className="font-bold text-black">{`Sport: ${sport.sport.SportName}`}</span>
                        <span className="font-bold text-red-400">{`Experince : ${sport.experience}`}</span>
                      </div>
                      <ul className="justify-center mb-2 ">
                        {sport.timeSlot.map((timeSlot, timeSlotIndex) => (
                          <li
                            key={timeSlotIndex}
                            className="font-bold text-blue-600"
                          >
                            {`Time Slot ${timeSlotIndex + 1}: From ${
                              timeSlot.from
                            } to ${timeSlot.to}`}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              );
            }
            return "No sports available";
          }}
        />

        {/* <Column
          header="District"
          field="DistrictId.District" // Replace 'districtName' with the actual field name
          filterField="District" // Make sure this matches the actual field name
          style={{ minWidth: "12rem" }}
          // body={DistrictBodyTemplete}
          filterMatchMode={FilterMatchMode.CONTAINS}
          filterValue={globalFilterValues.District}
        /> */}
      </DataTable>
    </div>
  );
}
