
import React, { useState } from 'react';
import { Note } from '../types';
import { getNoteSummary } from '../geminiService';

const initialNotes: Note[] = [
  { id: '1', title: 'Chapter 5 Ideas', content: 'Focus on the character evolution in the cyberpunk setting. Need more neon descriptions.', date: 'Oct 24, 2023', tags: ['writing'] },
  { id: '2', title: 'Marketing Hook', content: 'Use the paradox of choice to explain why users need a curator. Target productivity enthusiasts.', date: 'Oct 22, 2023', tags: ['marketing', 'strategy'] },
];

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = async () => {
    if (!selectedNote) return;
    setIsSummarizing(true);
    const res = await getNoteSummary(selectedNote.content);
    setSummary(res || '');
    setIsSummarizing(false);
  };

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      date: new Date().toLocaleDateString(),
      tags: [],
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setSummary('');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-12rem)] gap-6">
      {/* List */}
      <div className="w-full lg:w-1/3 bg-white rounded-2xl border border-gray-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-lg">My Notes</h2>
          <button onClick={addNote} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notes.map(note => (
            <button
              key={note.id}
              onClick={() => { setSelectedNote(note); setSummary(''); }}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedNote?.id === note.id ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-gray-100 hover:border-gray-300'
              }`}
            >
              <p className="font-bold text-sm truncate">{note.title || 'Untitled Note'}</p>
              <p className="text-xs text-gray-500 mt-1 truncate">{note.content || 'No content yet...'}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-gray-400 font-medium">{note.date}</span>
                {note.tags.map(t => (
                  <span key={t} className="px-1.5 py-0.5 bg-gray-200 rounded text-[9px] text-gray-600 uppercase">#{t}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-200 flex flex-col overflow-hidden relative">
        {selectedNote ? (
          <>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
               <input 
                value={selectedNote.title}
                onChange={(e) => {
                  const updated = notes.map(n => n.id === selectedNote.id ? {...n, title: e.target.value} : n);
                  setNotes(updated);
                  setSelectedNote({...selectedNote, title: e.target.value});
                }}
                className="bg-transparent font-bold text-lg focus:outline-none w-1/2"
                placeholder="Title"
               />
               <button 
                onClick={handleSummarize}
                disabled={isSummarizing || !selectedNote.content}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-all"
               >
                 <svg className={`w-4 h-4 ${isSummarizing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                 AI Summary
               </button>
            </div>
            <textarea
              className="flex-1 p-6 focus:outline-none resize-none text-gray-700 leading-relaxed"
              placeholder="Start writing..."
              value={selectedNote.content}
              onChange={(e) => {
                const updated = notes.map(n => n.id === selectedNote.id ? {...n, content: e.target.value} : n);
                setNotes(updated);
                setSelectedNote({...selectedNote, content: e.target.value});
              }}
            />
            {summary && (
              <div className="p-4 bg-indigo-50 border-t border-indigo-100 animate-in slide-in-from-bottom duration-300">
                <p className="text-xs font-bold text-indigo-600 uppercase mb-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  AI Insight
                </p>
                <p className="text-sm text-indigo-900 italic">"{summary}"</p>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            <p>Select a note or create a new one to start writing.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
