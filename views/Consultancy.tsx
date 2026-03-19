
import React from 'react';

const experts = [
  { id: 1, name: 'Sarah Chen', role: 'Publishing Strategy', rate: '$150/hr', avatar: 'https://picsum.photos/seed/expert1/200/200' },
  { id: 2, name: 'Marcus Thorne', role: 'Growth Marketing', rate: '$200/hr', avatar: 'https://picsum.photos/seed/expert2/200/200' },
  { id: 3, name: 'Elena Rossi', role: 'Intellectual Property', rate: '$300/hr', avatar: 'https://picsum.photos/seed/expert3/200/200' },
];

const Consultancy: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Expert Consultancy</h2>
          <p className="text-gray-500">Get personalized advice from industry veterans.</p>
        </div>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 transition-colors">
          Join as Expert
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experts.map(expert => (
          <div key={expert.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-all">
            <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="px-6 pb-6 flex-1 flex flex-col items-center">
              <img 
                src={expert.avatar} 
                className="w-24 h-24 rounded-full border-4 border-white -mt-12 mb-4 object-cover" 
                alt={expert.name} 
              />
              <h3 className="text-xl font-bold">{expert.name}</h3>
              <p className="text-sm text-gray-500 font-medium">{expert.role}</p>
              <div className="mt-4 flex gap-1">
                {[1,2,3,4,5].map(i => <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="mt-4 text-sm text-center text-gray-600 line-clamp-2">Helping creators maximize their reach through data-driven content architectures and brand building.</p>
              <div className="mt-6 pt-6 border-t border-gray-100 w-full flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-tight">Starting at</span>
                  <p className="text-lg font-black text-indigo-600">{expert.rate}</p>
                </div>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-colors">
                  Book Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-bold text-indigo-900">Need immediate help?</h3>
          <p className="text-indigo-800/80">Our AI Consultant is trained on 100k+ success stories of digital creators. Get instant strategic guidance right now.</p>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold shadow-sm hover:shadow-md transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
            Talk to AI Advisor
          </button>
        </div>
        <div className="hidden lg:block relative w-48 h-48">
          <div className="absolute inset-0 bg-indigo-600 rounded-full animate-ping opacity-10"></div>
          <div className="relative z-10 w-full h-full bg-indigo-200 rounded-full flex items-center justify-center">
             <svg className="w-24 h-24 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultancy;
