import React, { useState, useEffect } from 'react';
import { authService } from '../authService';

interface Mineral {
  name: string;
  quality: string;
  royaltyRate: number;
  salesPrice: number;
  unit: string;
}

const MineralsManagement: React.FC = () => {
  const [minerals, setMinerals] = useState<Mineral[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Mineral>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMinerals();
  }, []);

  const fetchMinerals = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/minerals');
      if (res.ok) setMinerals(await res.json());
    } catch (error) {
      console.error('Error fetching minerals:', error);
    }
    setLoading(false);
  };

  const updateMineral = async (mineralName: string) => {
    try {
      const token = authService.getToken();
      const res = await fetch(`http://localhost:8000/api/admin/minerals/${mineralName}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(editForm)
      });
      
      if (res.ok) {
        fetchMinerals();
        setEditingIndex(null);
      }
    } catch (error) {
      console.error('Error updating mineral:', error);
    }
  };

  const startEdit = (mineral: Mineral, index: number) => {
    setEditingIndex(index);
    setEditForm({ quality: mineral.quality, royaltyRate: mineral.royaltyRate, salesPrice: mineral.salesPrice, unit: mineral.unit });
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-4xl space-y-8">
      <h2 className="text-3xl font-bold">Minerals & Royalty Rates</h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold">Manage Royalty Rates</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mineral</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Quality</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rate (₹)</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {minerals.map((mineral, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{mineral.name}</td>
                  <td className="px-6 py-4">
                    {editingIndex === idx ? (
                      <input
                        type="text"
                        value={editForm.quality}
                        onChange={(e) => setEditForm({...editForm, quality: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{mineral.quality}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingIndex === idx ? (
                      <input
                        type="number"
                        value={editForm.royaltyRate}
                        onChange={(e) => setEditForm({...editForm, royaltyRate: Number(e.target.value)})}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">₹{mineral.royaltyRate}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingIndex === idx ? (
                      <input
                        type="text"
                        value={editForm.unit}
                        onChange={(e) => setEditForm({...editForm, unit: e.target.value})}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{mineral.unit}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingIndex === idx ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateMineral(mineral.name)}
                          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(mineral, idx)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MineralsManagement;
