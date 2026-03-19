import React, { useState, useEffect } from 'react';
import { authService } from '../authService';
import { DailyProductionSummary, ChallanEntry } from '../types';

const DailyProduction: React.FC = () => {
  const [summaries, setSummaries] = useState<DailyProductionSummary[]>([]);
  const [challans, setChallans] = useState<ChallanEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'summary' | 'challan'>('summary');
  const [showSummaryForm, setShowSummaryForm] = useState(false);
  const [showChallanForm, setShowChallanForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSummaryId, setSelectedSummaryId] = useState<string>('');

  const [summaryData, setSummaryData] = useState<DailyProductionSummary>({
    date: new Date().toISOString().split('T')[0],
    mineralName: '',
    openingBalance: 0,
    production: 0,
    totalStocked: 0,
    dispatchRail: 0,
    dispatchTruck: 0,
    dispatchLocalSale: 0,
    dispatchOther: 0,
    totalChallanIssued: 0,
    totalQuantityDispatched: 0,
    closingBalance: 0,
  });

  const [challanData, setChallanData] = useState<ChallanEntry>({
    date: new Date().toISOString().split('T')[0],
    mode: 'vehicle',
    challanNo: '',
    quantityDispatched: 0,
    dispatchedTime: '',
    destinationName: '',
    destinationAddress: '',
    routeOfTravelling: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [summaryRes, challanRes] = await Promise.all([
        fetch('/api/daily-production', {
          headers: { 'Authorization': `Bearer ${authService.getToken()}` }
        }),
        fetch('/api/challans', {
          headers: { 'Authorization': `Bearer ${authService.getToken()}` }
        })
      ]);

      if (summaryRes.ok) setSummaries(await summaryRes.json());
      if (challanRes.ok) setChallans(await challanRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const totalDispatched = summaryData.dispatchRail + summaryData.dispatchTruck + 
                           summaryData.dispatchLocalSale + summaryData.dispatchOther;
    const closingBalance = summaryData.openingBalance + summaryData.production - totalDispatched;

    const dataToSubmit = {
      ...summaryData,
      totalQuantityDispatched: totalDispatched,
      closingBalance,
    };

    try {
      const response = await fetch('/api/daily-production', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
        body: JSON.stringify(dataToSubmit)
      });

      if (response.ok) {
        fetchData();
        resetSummaryForm();
      }
    } catch (error) {
      console.error('Error saving summary:', error);
    }
  };

  const handleChallanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = {
      ...challanData,
      productionSummaryId: selectedSummaryId || undefined,
    };

    try {
      const response = await fetch('/api/challans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
        body: JSON.stringify(dataToSubmit)
      });

      if (response.ok) {
        fetchData();
        resetChallanForm();
      }
    } catch (error) {
      console.error('Error saving challan:', error);
    }
  };

  const resetSummaryForm = () => {
    setSummaryData({
      date: new Date().toISOString().split('T')[0],
      mineralName: '',
      openingBalance: 0,
      production: 0,
      totalStocked: 0,
      dispatchRail: 0,
      dispatchTruck: 0,
      dispatchLocalSale: 0,
      dispatchOther: 0,
      totalChallanIssued: 0,
      totalQuantityDispatched: 0,
      closingBalance: 0,
    });
    setShowSummaryForm(false);
  };

  const resetChallanForm = () => {
    setChallanData({
      date: new Date().toISOString().split('T')[0],
      mode: 'vehicle',
      challanNo: '',
      quantityDispatched: 0,
      dispatchedTime: '',
      destinationName: '',
      destinationAddress: '',
      routeOfTravelling: '',
    });
    setShowChallanForm(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daily Production & Dispatch Record</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'summary'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Summary Data
        </button>
        <button
          onClick={() => setActiveTab('challan')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'challan'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Challan Entry
        </button>
      </div>

      {/* Summary Tab */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setShowSummaryForm(!showSummaryForm)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              {showSummaryForm ? 'Cancel' : 'Add Daily Summary'}
            </button>
          </div>

          {showSummaryForm && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Add Daily Production Summary</h3>
              <form onSubmit={handleSummarySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={summaryData.date}
                    onChange={(e) => setSummaryData({...summaryData, date: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mineral Name</label>
                  <input
                    type="text"
                    value={summaryData.mineralName}
                    onChange={(e) => setSummaryData({...summaryData, mineralName: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Opening Balance (MT)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={summaryData.openingBalance}
                    onChange={(e) => setSummaryData({...summaryData, openingBalance: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Production (MT)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={summaryData.production}
                    onChange={(e) => setSummaryData({...summaryData, production: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Total Stocked (MT)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={summaryData.totalStocked}
                    onChange={(e) => setSummaryData({...summaryData, totalStocked: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dispatch by Rail (MT)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={summaryData.dispatchRail}
                    onChange={(e) => setSummaryData({...summaryData, dispatchRail: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dispatch by Truck (MT)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={summaryData.dispatchTruck}
                    onChange={(e) => setSummaryData({...summaryData, dispatchTruck: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dispatch by Local Sale (MT)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={summaryData.dispatchLocalSale}
                    onChange={(e) => setSummaryData({...summaryData, dispatchLocalSale: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dispatch by Other Mode (MT)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={summaryData.dispatchOther}
                    onChange={(e) => setSummaryData({...summaryData, dispatchOther: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Total Challan Issued</label>
                  <input
                    type="number"
                    value={summaryData.totalChallanIssued}
                    onChange={(e) => setSummaryData({...summaryData, totalChallanIssued: parseInt(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Save Summary
                  </button>
                  <button
                    type="button"
                    onClick={resetSummaryForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Summary Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Mineral</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Opening Balance</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Production</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Total Stocked</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Rail</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Truck</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Local Sale</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Other</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Challan Count</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Total Dispatched</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Closing Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {summaries.map((summary) => (
                    <tr key={summary.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{summary.date}</td>
                      <td className="px-4 py-3">{summary.mineralName}</td>
                      <td className="px-4 py-3 text-right">{summary.openingBalance.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right">{summary.production.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right">{summary.totalStocked.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right">{summary.dispatchRail.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right">{summary.dispatchTruck.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right">{summary.dispatchLocalSale.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right">{summary.dispatchOther.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right">{summary.totalChallanIssued}</td>
                      <td className="px-4 py-3 text-right">{summary.totalQuantityDispatched.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-semibold">{summary.closingBalance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {summaries.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No production records found. Add your first record to get started.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Challan Tab */}
      {activeTab === 'challan' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setShowChallanForm(!showChallanForm)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              {showChallanForm ? 'Cancel' : 'Add Challan Entry'}
            </button>
          </div>

          {showChallanForm && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Add Challan Entry</h3>
              <form onSubmit={handleChallanSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={challanData.date}
                    onChange={(e) => setChallanData({...challanData, date: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mode of Dispatch</label>
                  <select
                    value={challanData.mode}
                    onChange={(e) => setChallanData({...challanData, mode: e.target.value as any})}
                    className="w-full p-2 border rounded-lg"
                    required
                  >
                    <option value="rail">Rail</option>
                    <option value="vehicle">Vehicle</option>
                    <option value="local_sale">Local Sale</option>
                    <option value="other">Other Mode</option>
                  </select>
                </div>
                {challanData.mode === 'rail' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">RR No.</label>
                    <input
                      type="text"
                      value={challanData.rrNo || ''}
                      onChange={(e) => setChallanData({...challanData, rrNo: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1">Challan No.</label>
                  <input
                    type="text"
                    value={challanData.challanNo}
                    onChange={(e) => setChallanData({...challanData, challanNo: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity Dispatched (MT)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={challanData.quantityDispatched}
                    onChange={(e) => setChallanData({...challanData, quantityDispatched: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dispatched Time</label>
                  <input
                    type="datetime-local"
                    value={challanData.dispatchedTime}
                    onChange={(e) => setChallanData({...challanData, dispatchedTime: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Destination Name</label>
                  <input
                    type="text"
                    value={challanData.destinationName}
                    onChange={(e) => setChallanData({...challanData, destinationName: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Destination Address</label>
                  <textarea
                    value={challanData.destinationAddress}
                    onChange={(e) => setChallanData({...challanData, destinationAddress: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    rows={2}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Destination Reached Time</label>
                  <input
                    type="datetime-local"
                    value={challanData.destinationReachedTime || ''}
                    onChange={(e) => setChallanData({...challanData, destinationReachedTime: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Route of Travelling</label>
                  <input
                    type="text"
                    value={challanData.routeOfTravelling}
                    onChange={(e) => setChallanData({...challanData, routeOfTravelling: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Link to Production Summary (Optional)</label>
                  <select
                    value={selectedSummaryId}
                    onChange={(e) => setSelectedSummaryId(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select a summary</option>
                    {summaries.map((summary) => (
                      <option key={summary.id} value={summary.id || ''}>
                        {summary.date} - {summary.mineralName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Save Challan
                  </button>
                  <button
                    type="button"
                    onClick={resetChallanForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Challan Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Mode</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">RR/Challan No.</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Quantity (MT)</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Dispatched Time</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Destination</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Address</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Reached Time</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Route</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {challans.map((challan) => (
                    <tr key={challan.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{challan.date}</td>
                      <td className="px-4 py-3 capitalize">{challan.mode.replace('_', ' ')}</td>
                      <td className="px-4 py-3">{challan.rrNo || challan.challanNo}</td>
                      <td className="px-4 py-3 text-right">{challan.quantityDispatched.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm">{challan.dispatchedTime}</td>
                      <td className="px-4 py-3">{challan.destinationName}</td>
                      <td className="px-4 py-3 text-sm">{challan.destinationAddress}</td>
                      <td className="px-4 py-3 text-sm">{challan.destinationReachedTime || '-'}</td>
                      <td className="px-4 py-3">{challan.routeOfTravelling}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {challans.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No challan entries found. Add your first challan to get started.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyProduction;
