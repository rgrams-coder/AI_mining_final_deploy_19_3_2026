import React, { useState, useEffect } from 'react';
import { authService } from '../authService';

interface ComplianceFile {
  id: string;
  category: string;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  expiryDate?: string;
  remarks?: string;
}

const CATEGORIES = ['Mine Plan', 'Environment Clearance', 'CTO/CTE', 'DGMS', 'Labour', 'Others'];
const API_BASE_URL = 'http://localhost:8000';

const StatutoryCompliance: React.FC = () => {
  const [files, setFiles] = useState<ComplianceFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: CATEGORIES[0],
    expiryDate: '',
    remarks: ''
  });

  useEffect(() => {
    fetchFiles();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/api/statutory-compliance`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch files');
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const token = getAuthToken();
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);
      formDataToSend.append('category', formData.category);
      if (formData.expiryDate) formDataToSend.append('expiryDate', formData.expiryDate);
      if (formData.remarks) formDataToSend.append('remarks', formData.remarks);

      const response = await fetch(`${API_BASE_URL}/api/statutory-compliance/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (!response.ok) throw new Error('Failed to upload file');
      
      setShowForm(false);
      setFormData({ category: CATEGORIES[0], expiryDate: '', remarks: '' });
      e.target.value = '';
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/api/statutory-compliance/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete file');
      setFiles(files.filter(f => f.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file');
    }
  };

  const filteredFiles = selectedCategory === 'All' 
    ? files 
    : files.filter(f => f.category === selectedCategory);

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Statutory Compliance</h2>
        <p className="text-gray-500 mt-2">Manage your compliance documents and certifications</p>
      </header>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Upload Documents</h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {showForm ? 'Cancel' : '+ Upload File'}
          </button>
        </div>

        {showForm && (
          <div className="border-t pt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (Optional)</label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Remarks (Optional)</label>
              <textarea
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                placeholder="Add any notes about this document"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select File</label>
              <input
                type="file"
                onChange={handleFileUpload}
                disabled={uploading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {['All', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No documents found in this category</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">File Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Upload Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Expiry Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map(file => (
                  <tr key={file.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline truncate block"
                      >
                        {file.fileName}
                      </a>
                    </td>
                    <td className="py-3 px-4">{file.category}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(file.uploadDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {file.expiryDate ? (
                        <span className={isExpired(file.expiryDate) ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                          {new Date(file.expiryDate).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {file.expiryDate && isExpired(file.expiryDate) ? (
                        <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                          Expired
                        </span>
                      ) : (
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Total Documents:</strong> {files.length} | 
            <strong className="ml-4">Expired:</strong> {files.filter(f => isExpired(f.expiryDate)).length}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatutoryCompliance;
