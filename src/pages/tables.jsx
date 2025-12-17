import React, { useState } from "react";
import Pagination from "../components/pagination";
import "../styles/tables.css"; // 自定义 CSS

const generateFakeData = () => {
    const data = [];
    for (let i = 1; i <= 150; i++) {
        data.push({
            id: i,
            name: `Name ${i}`,
            age: 20 + (i % 10),
            email: `user${i}@example.com`,
            role: `Role ${i % 5}`,
            department: `Dept ${i % 3}`,
            status: i % 2 === 0 ? "Active" : "Inactive",
            location: `City ${i % 4}`,
        });
    }
    return data;
};

const data = generateFakeData();
const columns = [
    "ID",
    "Name",
    "Age",
    "Email",
    "Role",
    "Department",
    "Status",
    "Location",
];

export default function TablePage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPage(1);
    };

    const filteredData = data.filter((row) => {
        const matchesSearch =
            row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter ? row.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const currentData = filteredData.slice((page - 1) * pageSize, page * pageSize);

    const totalPagesFilter = Math.ceil(filteredData.length / pageSize);

    const handlePrev = () => setPage(Math.max(page - 1, 1));
    const handleNext = () => setPage(Math.min(page + 1, totalPagesFilter));

    return (
        <div className="page-container">
            {/* ===== Light Table ===== */}
            <div className="table-card light-table">
                <h2>Light Table</h2>
                <div className="table-controls">
                    <div className="control-left">
                        <label>Rows per page:</label>
                        <select className="input-select" value={pageSize} onChange={handlePageSizeChange}>
                            {[5, 10, 20, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="record-info">
                        Showing {(page - 1) * pageSize + 1} -{" "}
                        {Math.min(page * pageSize, filteredData.length)} of {filteredData.length} records
                    </div>
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead className="sticky-header">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.age}</td>
                                    <td>{row.email}</td>
                                    <td>{row.role}</td>
                                    <td>{row.department}</td>
                                    <td>
                                        <span className={row.status === "Active" ? "status-active" : "status-inactive"}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td>{row.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination page={page} totalPages={totalPagesFilter} setPage={setPage} />
            </div>

            {/* ===== Dark Table ===== */}
            <div className="table-card dark-table">
                <h2>Dark Table</h2>
                <div className="table-controls">
                    <div className="control-left">
                        <label>Rows per page:</label>
                        <select className="input-select" value={pageSize} onChange={handlePageSizeChange}>
                            {[5, 10, 20, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="record-info">
                        Showing {(page - 1) * pageSize + 1} -{" "}
                        {Math.min(page * pageSize, filteredData.length)} of {filteredData.length} records
                    </div>
                </div>
                <div className="table-wrapper dark-wrapper">
                    <table>
                        <thead className="sticky-header-dark">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.age}</td>
                                    <td>{row.email}</td>
                                    <td>{row.role}</td>
                                    <td>{row.department}</td>
                                    <td>
                                        <span className={row.status === "Active" ? "status-dark-active" : "status-dark-inactive"}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td>{row.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination page={page} totalPages={totalPagesFilter} setPage={setPage} />
            </div>

            {/* ===== Glass Table ===== */}
            <div className="table-card glass-table">
                <h2>Glass Table</h2>
                <div className="table-controls">
                    <div className="control-left">
                        <label>Rows per page:</label>
                        <select className="input-select" value={pageSize} onChange={handlePageSizeChange}>
                            {[5, 10, 20, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="record-info">
                        Showing {(page - 1) * pageSize + 1} -{" "}
                        {Math.min(page * pageSize, filteredData.length)} of {filteredData.length} records
                    </div>
                </div>
                <div className="table-wrapper glass-wrapper">
                    <table>
                        <thead className="sticky-header-glass">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.age}</td>
                                    <td>{row.email}</td>
                                    <td>{row.role}</td>
                                    <td>{row.department}</td>
                                    <td>
                                        <span className={row.status === "Active" ? "status-glass-active" : "status-glass-inactive"}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td>{row.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination page={page} totalPages={totalPagesFilter} setPage={setPage} />
            </div>

            {/* ===== Sticky Last Column Table ===== */}
            <div className="table-card sticky-table">
                <h2>Sticky Last Column Table</h2>
                <div className="table-controls">
                    <div className="control-left">
                        <label>Rows per page:</label>
                        <select className="input-select" value={pageSize} onChange={handlePageSizeChange}>
                            {[5, 10, 20, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="record-info">
                        Showing {(page - 1) * pageSize + 1} -{" "}
                        {Math.min(page * pageSize, filteredData.length)} of {filteredData.length} records
                    </div>
                </div>
                <div className="table-wrapper sticky-wrapper">
                    <table>
                        <thead className="sticky-header-gray">
                            <tr>
                                {columns.map((col, idx) => (
                                    <th key={col} className={`table-cell-base ${idx === columns.length - 1 ? "table-cell-sticky-right" : ""}`}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((row) => (
                                <tr key={row.id}>
                                    {columns.map((col, idx) => {
                                        const value = row[col.toLowerCase()];
                                        return (
                                            <td key={col} className={`table-cell-base ${idx === columns.length - 1 ? "table-cell-sticky-rightbody" : ""}`}>
                                                {value}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination page={page} totalPages={totalPagesFilter} setPage={setPage} />
            </div>

            {/* ===== Card Style Table ===== */}
            <div className="table-card card-table">
                <h2>Card Style Table</h2>
                <div className="table-controls card-controls">
                    <div className="control-left">
                        <label>Rows per page:</label>
                        <select className="input-select" value={pageSize} onChange={handlePageSizeChange}>
                            {[5, 10, 20, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="card-filters">
                        <input
                            className="input-select"
                            type="text"
                            placeholder="Search by Name or Email..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                        />
                        <select className="input-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="record-info">
                        Showing {(page - 1) * pageSize + 1} -{" "}
                        {Math.min(page * pageSize, filteredData.length)} of {filteredData.length} records
                    </div>
                </div>

                <div className="card-grid">
                    {filteredData.slice((page - 1) * pageSize, page * pageSize).map((row) => (
                        <div key={row.id} className="card-item">
                            <div className="card-header">
                                <h3>{row.name}</h3>
                                <span className={row.status === "Active" ? "status-active" : "status-inactive"}>{row.status}</span>
                            </div>
                            <div className="card-body">
                                <div><strong>Email:</strong> {row.email}</div>
                                <div><strong>Age:</strong> {row.age}</div>
                                <div><strong>Role:</strong> {row.role}</div>
                                <div><strong>Department:</strong> {row.department}</div>
                                <div><strong>Location:</strong> {row.location}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination page={page} totalPages={totalPagesFilter} setPage={setPage} />
            </div>
        </div>
    );
}
