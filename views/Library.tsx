import React, { useState, useEffect } from 'react';
import { Ebook } from '../types';
import { libraryService } from '../libraryService';
import { authService } from '../authService';

const Library: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEbook, setEditingEbook] = useState<Ebook | null>(null);
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);
  const [notes, setNotes] = useState('');
  const user = authService.getUser();
  const isAdmin = user?.role === 'Admin';

  const [formData, setFormData] = useState({
    title: '',
    category: 'Bare Acts',
    description: '',
    author: '',
    fileUrl: '',
    coverUrl: '',
    requiresSubscription: false,
    requiredPlan: 'Free'
  });
  const [uploading, setUploading] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  useEffect(() => {
    loadEbooks();
  }, [filter]);

  const loadEbooks = async () => {
    try {
      setLoading(true);
      const data = filter === 'Your Library' 
        ? await libraryService.getMyLibrary()
        : await libraryService.getEbooks(filter === 'All' ? undefined : filter);
      setEbooks(data);
    } catch (error: any) {
      console.error('Failed to load ebooks:', error);
      alert('Failed to load ebooks. Make sure backend is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUploading(true);
      let fileUrl = formData.fileUrl;
      let coverUrl = formData.coverUrl;

      if (pdfFile) {
        fileUrl = await libraryService.uploadFile(pdfFile);
      }
      if (coverFile) {
        coverUrl = await libraryService.uploadFile(coverFile);
      }

      const ebookData = { ...formData, fileUrl, coverUrl };

      if (editingEbook) {
        await libraryService.updateEbook(editingEbook.id, ebookData);
      } else {
        await libraryService.createEbook(ebookData);
      }
      setShowAddModal(false);
      setEditingEbook(null);
      resetForm();
      loadEbooks();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this ebook?')) return;
    try {
      await libraryService.deleteEbook(id);
      loadEbooks();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const openEditModal = (ebook: Ebook) => {
    setEditingEbook(ebook);
    setFormData({
      title: ebook.title,
      category: ebook.category,
      description: ebook.description,
      author: ebook.author,
      fileUrl: ebook.fileUrl,
      coverUrl: ebook.coverUrl || '',
      requiresSubscription: ebook.requiresSubscription,
      requiredPlan: ebook.requiredPlan
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Bare Acts',
      description: '',
      author: '',
      fileUrl: '',
      coverUrl: '',
      requiresSubscription: false,
      requiredPlan: 'Free'
    });
    setPdfFile(null);
    setCoverFile(null);
  };

  const handleEbookClick = (ebook: Ebook) => {
    if (ebook.hasAccess) {
      setSelectedEbook(ebook);
      const savedNotes = localStorage.getItem(`notes_${ebook.id}`);
      setNotes(savedNotes || '');
    }
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    if (selectedEbook) {
      localStorage.setItem(`notes_${selectedEbook.id}`, value);
    }
  };

  const closeReader = () => {
    setSelectedEbook(null);
    setNotes('');
  };

  if (selectedEbook) {
    return (
      <div className="h-screen flex flex-col">
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{selectedEbook.title}</h2>
            <p className="text-sm text-gray-600">{selectedEbook.author}</p>
          </div>
          <button
            onClick={closeReader}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium"
          >
            ← Back to Library
          </button>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 bg-gray-100 p-4">
            <iframe
              src={selectedEbook.fileUrl}
              className="w-full h-full rounded-lg shadow-lg"
              title={selectedEbook.title}
            />
          </div>
          <div className="w-96 bg-white border-l flex flex-col">
            <div className="px-4 py-3 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-700">Notes</h3>
            </div>
            <textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Take notes while reading..."
              className="flex-1 p-4 resize-none focus:outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Digital Library</h2>
          <p className="text-gray-500">Access legal documents and resources.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Bare Acts', 'Notifications', 'Government Orders', 'Judgements', 'Your Library'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === cat ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {(isAdmin || filter === 'Your Library') && (
        <button
          onClick={() => { setShowAddModal(true); setEditingEbook(null); resetForm(); }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          + Add Ebook
        </button>
      )}

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : ebooks.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No ebooks found</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Access</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ebooks.map(ebook => (
                <tr key={ebook.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {ebook.coverUrl && (
                        <img src={ebook.coverUrl} alt={ebook.title} className="w-12 h-16 object-cover rounded" />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{ebook.title}</div>
                        <div className="text-sm text-gray-500">{ebook.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{ebook.author}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                      {ebook.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {ebook.requiresSubscription && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                        {ebook.requiredPlan}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      {ebook.hasAccess ? (
                        <button
                          onClick={() => handleEbookClick(ebook)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Read
                        </button>
                      ) : (
                        <span className="bg-gray-400 text-white px-3 py-1 rounded text-sm cursor-not-allowed">
                          Locked
                        </span>
                      )}
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => openEditModal(ebook)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(ebook.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editingEbook ? 'Edit Ebook' : 'Add New Ebook'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                >
                  <option>Bare Acts</option>
                  <option>Notifications</option>
                  <option>Government Orders</option>
                  <option>Judgements</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={e => setFormData({...formData, author: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">PDF File</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={e => setPdfFile(e.target.files?.[0] || null)}
                  className="w-full border rounded px-3 py-2"
                />
                {pdfFile && <p className="text-sm text-green-600 mt-1">Selected: {pdfFile.name}</p>}
                <p className="text-xs text-gray-500 mt-1">Or enter URL below</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">File URL</label>
                <input
                  type="url"
                  value={formData.fileUrl}
                  onChange={e => setFormData({...formData, fileUrl: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required={!pdfFile}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cover Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setCoverFile(e.target.files?.[0] || null)}
                  className="w-full border rounded px-3 py-2"
                />
                {coverFile && <p className="text-sm text-green-600 mt-1">Selected: {coverFile.name}</p>}
                <p className="text-xs text-gray-500 mt-1">Or enter URL below</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cover Image URL (Optional)</label>
                <input
                  type="url"
                  value={formData.coverUrl}
                  onChange={e => setFormData({...formData, coverUrl: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.requiresSubscription}
                    onChange={e => setFormData({...formData, requiresSubscription: e.target.checked})}
                  />
                  <span className="text-sm font-medium">Requires Subscription</span>
                </label>
                {formData.requiresSubscription && (
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Required Plan</label>
                    <select
                      value={formData.requiredPlan}
                      onChange={e => setFormData({...formData, requiredPlan: e.target.value})}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="Free">Free</option>
                      <option value="Basic">Basic</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditingEbook(null); resetForm(); }}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  {uploading ? 'Uploading...' : editingEbook ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
