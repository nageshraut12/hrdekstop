import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';

export const Payroll = () => {
  const { employees, loading } = useContext(DataContext);
  const [payrollData, setPayrollData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    month: '',
    year: new Date().getFullYear(),
    baseSalary: '',
    bonuses: '',
    deductions: '',
    status: 'Pending'
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const netSalary = (parseInt(formData.baseSalary) || 0) + (parseInt(formData.bonuses) || 0) - (parseInt(formData.deductions) || 0);
    const newPayroll = { ...formData, netSalary };
    setPayrollData([...payrollData, newPayroll]);
    setFormData({
      employeeId: '',
      month: '',
      year: new Date().getFullYear(),
      baseSalary: '',
      bonuses: '',
      deductions: '',
      status: 'Pending'
    });
    setShowForm(false);
  };

  const getEmployeeName = (empId) => {
    return employees.find(e => e._id === empId)?.name || 'Unknown';
  };

  const getEmployeeSalary = (empId) => {
    return employees.find(e => e._id === empId)?.salary || 0;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll</h1>
          <p className="text-gray-600 text-sm mt-1">Manage employee salaries and payments</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          + Process Payroll
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Process Payroll</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                value={formData.employeeId}
                onChange={(e) => {
                  const empId = e.target.value;
                  setFormData({ ...formData, employeeId: empId, baseSalary: getEmployeeSalary(empId) });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp._id} value={emp._id}>{emp.name}</option>
                ))}
              </select>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Month</option>
                {months.map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Base Salary"
                value={formData.baseSalary}
                onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                placeholder="Bonuses"
                value={formData.bonuses}
                onChange={(e) => setFormData({ ...formData, bonuses: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Deductions"
                value={formData.deductions}
                onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="Processed">Processed</option>
                <option value="Paid">Paid</option>
              </select>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payroll Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {payrollData.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No payroll records found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Employee</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Month/Year</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Base Salary</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Bonuses</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Deductions</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Net Salary</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((payroll, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{getEmployeeName(payroll.employeeId)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{payroll.month} {payroll.year}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">₹{payroll.baseSalary}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">₹{payroll.bonuses || 0}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">₹{payroll.deductions || 0}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{payroll.netSalary}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      payroll.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : payroll.status === 'Processed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payroll.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
