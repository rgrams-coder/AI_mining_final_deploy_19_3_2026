
import React, { useState, useEffect } from 'react';

interface Mineral {
  _id: string;
  name: string;
  quality: string;
  royaltyRate: number;
}

interface MineralData {
  month: string;
  mineralName: string;
  quality: string;
  storedStart: number;
  minedProduction: number;
  domesticUse: number;
  dispatchTrain1: number;
  dispatchTrain2: number;
  dispatchTrain3: number;
  royaltyRate: number;
  challanIssued: number;
}

interface MonthlyReturnRecord {
  month: string;
  mineralName: string;
  minedProduction: number;
  mineralLeft: number;
  royaltyAmount: number;
}

const MonthlyReturns: React.FC = () => {
  const [minerals, setMinerals] = useState<Mineral[]>([]);
  const [mineralNames, setMineralNames] = useState<string[]>([]);
  const [qualities, setQualities] = useState<string[]>([]);
  const [returns, setReturns] = useState<MonthlyReturnRecord[]>([]);
  const [formData, setFormData] = useState<MineralData>({
    month: '',
    mineralName: '',
    quality: '',
    storedStart: 0,
    minedProduction: 0,
    domesticUse: 0,
    dispatchTrain1: 0,
    dispatchTrain2: 0,
    dispatchTrain3: 0,
    royaltyRate: 0,
    challanIssued: 0,
  });

  useEffect(() => {
    fetch('https://bbgm50gbv5.execute-api.ap-south-1.amazonaws.com/Prod/api/minerals')
      .then(res => res.json())
      .then(data => {
        setMinerals(data);
        const uniqueNames = [...new Set(data.map((m: Mineral) => m.name))];
        setMineralNames(uniqueNames);
      })
      .catch(err => console.error('Failed to fetch minerals:', err));
    
    const token = localStorage.getItem('token');
    fetch('https://bbgm50gbv5.execute-api.ap-south-1.amazonaws.com/Prod/api/monthly-returns', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setReturns(data))
      .catch(err => console.error('Failed to fetch returns:', err));
  }, []);

  const total = formData.storedStart + formData.minedProduction;
  const totalDispatched = formData.domesticUse + formData.dispatchTrain1 + formData.dispatchTrain2 + formData.dispatchTrain3;
  const royaltyAmount = totalDispatched * formData.royaltyRate;
  const mineralLeft = total - totalDispatched;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'mineralName') {
      const filtered = minerals.filter(m => m.name === value);
      const uniqueQualities = [...new Set(filtered.map(m => m.quality))];
      setQualities(uniqueQualities);
      setFormData(prev => ({ ...prev, mineralName: value, quality: '', royaltyRate: 0 }));
    } else if (name === 'quality') {
      const selected = minerals.find(m => m.name === formData.mineralName && m.quality === value);
      setFormData(prev => ({ ...prev, quality: value, royaltyRate: selected?.royaltyRate || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: name === 'month' ? value : parseFloat(value) || 0 }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://bbgm50gbv5.execute-api.ap-south-1.amazonaws.com/Prod/api/monthly-returns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          total: total,
          totalDispatched: totalDispatched,
          royaltyAmount: royaltyAmount,
          mineralLeft: mineralLeft
        })
      });
      if (response.ok) {
        alert('Monthly return submitted successfully!');
        setFormData({
          month: '', mineralName: '', quality: '', storedStart: 0, minedProduction: 0, domesticUse: 0,
          dispatchTrain1: 0, dispatchTrain2: 0, dispatchTrain3: 0, royaltyRate: 0, challanIssued: 0
        });
        const token = localStorage.getItem('token');
        fetch('https://bbgm50gbv5.execute-api.ap-south-1.amazonaws.com/Prod/api/monthly-returns', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(data => setReturns(data));
      } else {
        alert('Failed to submit monthly return');
      }
    } catch (err) {
      console.error('Error submitting:', err);
      alert('Error submitting monthly return');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-2xl font-bold">Monthly Mineral Returns</h2>
      </header>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold">Monthly Returns History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Month</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Mineral</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Mined Production</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Mineral Left</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Amount of Royalty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {returns.map((record, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{new Date(record.month).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{record.mineralName}</td>
                  <td className="px-6 py-4 text-right text-blue-600 font-bold">{record.minedProduction.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-orange-600 font-bold">{record.mineralLeft.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-emerald-600 font-bold">₹{record.royaltyAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <header>
              <h3 className="text-lg font-bold">Enter monthly mineral production and dispatch details</h3>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Month</label>
            <input type="month" name="month" value={formData.month} onChange={handleChange} required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Mineral</label>
            <select name="mineralName" value={formData.mineralName} onChange={handleChange} required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="">Select Mineral</option>
              {mineralNames.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Quality</label>
            <select name="quality" value={formData.quality} onChange={handleChange} required disabled={!formData.mineralName}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100">
              <option value="">Select Quality</option>
              {qualities.map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Opening Balance of Mineral Stock at the Beginning of the Month (1)</label>
            <input type="number" name="storedStart" value={formData.storedStart} onChange={handleChange} step="0.01"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Mined/Production of mineral during the month (2) </label>
            <input type="number" name="minedProduction" value={formData.minedProduction} onChange={handleChange} step="0.01"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Total (3) = (1)+(2)</label>
            <input type="number" value={total.toFixed(2)} readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 font-bold text-indigo-600" />
          </div>

          <div className="col-span-full border-t pt-6 mt-4">
            <h3 className="text-lg font-bold mb-4">Dispatch Details</h3>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Dispatch of mineral of local sale (4)</label>
            <input type="number" name="domesticUse" value={formData.domesticUse} onChange={handleChange} step="0.01"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Dispatch by Rail (5)</label>
            <input type="number" name="dispatchTrain1" value={formData.dispatchTrain1} onChange={handleChange} step="0.01"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Dispatch by Truck (6)</label>
            <input type="number" name="dispatchTrain2" value={formData.dispatchTrain2} onChange={handleChange} step="0.01"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Dispatch through others conveniance (7)</label>
            <input type="number" name="dispatchTrain3" value={formData.dispatchTrain3} onChange={handleChange} step="0.01"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Total Dispatched (8)</label>
            <input type="number" value={totalDispatched.toFixed(2)} readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 font-bold text-indigo-600" />
          </div>

          <div className="col-span-full border-t pt-6 mt-4">
            <h3 className="text-lg font-bold mb-4">Royalty Details</h3>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Rate of Royalty (9)</label>
            <input type="number" value={formData.royaltyRate} readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 font-bold text-indigo-600" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Amount of Royalty (10)</label>
            <input type="number" value={royaltyAmount.toFixed(2)} readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 font-bold text-emerald-600" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Total Challan Issued (11)</label>
            <input type="number" name="challanIssued" value={formData.challanIssued} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Cloosing Balance of Mineral Stock at the End of the Month  (12) = (3)-(8)</label>
            <input type="number" value={mineralLeft.toFixed(2)} readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 font-bold text-orange-600" />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button type="submit"
            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
            Submit Monthly Return
          </button>
          <button type="button" onClick={() => setFormData({
            month: '', mineralName: '', quality: '', storedStart: 0, minedProduction: 0, domesticUse: 0,
            dispatchTrain1: 0, dispatchTrain2: 0, dispatchTrain3: 0, royaltyRate: 0, challanIssued: 0
          })}
            className="px-6 py-3 border border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition-colors">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default MonthlyReturns;
