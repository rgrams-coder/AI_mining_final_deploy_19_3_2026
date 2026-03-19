
import React, { useState, useEffect } from 'react';
import { authService } from '../authService';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
    location: '',
    website: '',
    lesseeId: '',
    firmName: '',
    managingDirector: '',
    lesseeAddress: '',
    aadharNo: '',
    panCardNo: '',
    mobileNo: '',
    additionalInfo: '',
    created_at: '',
    mines: [] as any[]
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        console.log('Fetched profile data:', data);
        setProfile({
          name: data.name || '',
          email: data.email || '',
          role: data.role || '',
          bio: data.bio || '',
          location: data.location || '',
          website: data.website || '',
          lesseeId: data.lesseeId || '',
          firmName: data.firmName || '',
          managingDirector: data.managingDirector || '',
          lesseeAddress: data.lesseeAddress || '',
          aadharNo: data.aadharNo || '',
          panCardNo: data.panCardNo || '',
          mobileNo: data.mobileNo || '',
          additionalInfo: data.additionalInfo || '',
          created_at: data.created_at || '',
          mines: data.mines || []
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      console.log('Saving profile:', profile);
      await authService.updateProfile({
        name: profile.name,
        email: profile.email,
        role: profile.role,
        bio: profile.bio,
        location: profile.location,
        website: profile.website,
        lesseeId: profile.lesseeId,
        firmName: profile.firmName,
        managingDirector: profile.managingDirector,
        lesseeAddress: profile.lesseeAddress,
        aadharNo: profile.aadharNo,
        panCardNo: profile.panCardNo,
        mobileNo: profile.mobileNo,
        additionalInfo: profile.additionalInfo,
        mines: profile.mines
      });
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile');
    }
  };

  const addMine = () => {
    setProfile({
      ...profile,
      mines: [...profile.mines, {
        mineName: '',
        mineralsGranted: '',
        leaseAreaHectares: '',
        leaseLocation: '',
        leasePeriodFrom: '',
        leasePeriodTo: '',
        miningMethod: '',
        quarryCategory: '',
        captiveType: '',
        mdlNo: '',
        mdlDate: '',
        mdlValidity: '',
        productionMT: '',
        surfaceFeature: ''
      }]
    });
  };

  const removeMine = (index: number) => {
    setProfile({
      ...profile,
      mines: profile.mines.filter((_, i) => i !== index)
    });
  };

  const updateMine = (index: number, field: string, value: string) => {
    const updatedMines = [...profile.mines];
    updatedMines[index][field] = value;
    setProfile({ ...profile, mines: updatedMines });
  };

  return (
    <div className="max-w-4xl space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Profile</h2>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${
            isEditing ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800"></div>
        <div className="px-8 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 mb-8">
            <div className="relative group">
              <img 
                src="https://picsum.photos/seed/user/300/300" 
                className="w-40 h-40 rounded-3xl border-8 border-white object-cover shadow-lg" 
                alt="Profile" 
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center cursor-pointer">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
              )}
            </div>
            <div className="pb-2">
              <h3 className="text-3xl font-black text-gray-900">{profile.name || 'User'}</h3>
              <p className="text-gray-500 font-medium">{profile.role || ''}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Field label="Lessee Name" value={profile.name} isEditing={isEditing} onChange={(v) => setProfile({...profile, name: v})} />
            <Field label="Email Address" value={profile.email} isEditing={false} />
            <Field label="Lessee ID" value={profile.lesseeId} isEditing={isEditing} onChange={(v) => setProfile({...profile, lesseeId: v})} />
            <Field label="Mobile Number" value={profile.mobileNo} isEditing={isEditing} onChange={(v) => setProfile({...profile, mobileNo: v})} />
            <Field label="Firm Name" value={profile.firmName} isEditing={isEditing} onChange={(v) => setProfile({...profile, firmName: v})} />
            <Field label="Managing Director/Partner" value={profile.managingDirector} isEditing={isEditing} onChange={(v) => setProfile({...profile, managingDirector: v})} />
            <Field label="Aadhar Number" value={profile.aadharNo} isEditing={isEditing} onChange={(v) => setProfile({...profile, aadharNo: v})} />
            <Field label="PAN Card Number" value={profile.panCardNo} isEditing={isEditing} onChange={(v) => setProfile({...profile, panCardNo: v})} />
            
            <div className="md:col-span-2">
              <Field label="Address of Lessee" value={profile.lesseeAddress} isEditing={isEditing} textArea onChange={(v) => setProfile({...profile, lesseeAddress: v})} />
            </div>
            <div className="md:col-span-2">
              <Field label="Additional Information (Government Requirements)" value={profile.additionalInfo} isEditing={isEditing} textArea onChange={(v) => setProfile({...profile, additionalInfo: v})} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Mine Details</h3>
          {isEditing && (
            <button onClick={addMine} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700">
              + Add Mine
            </button>
          )}
        </div>
        {profile.mines.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No mines added yet</p>
        ) : (
          <div className="space-y-6">
            {profile.mines.map((mine, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-gray-700">Mine #{index + 1}</h4>
                  {isEditing && (
                    <button onClick={() => removeMine(index)} className="text-red-500 hover:text-red-700 text-sm font-bold">
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MineField label="Name of Mine" value={mine.mineName} isEditing={isEditing} onChange={(v) => updateMine(index, 'mineName', v)} />
                  <MineField label="Minerals Granted" value={mine.mineralsGranted} isEditing={isEditing} onChange={(v) => updateMine(index, 'mineralsGranted', v)} />
                  <MineField label="Lease Area (Hectares)" value={mine.leaseAreaHectares} isEditing={isEditing} onChange={(v) => updateMine(index, 'leaseAreaHectares', v)} type="number" />
                  <MineField label="Location of Lease" value={mine.leaseLocation} isEditing={isEditing} onChange={(v) => updateMine(index, 'leaseLocation', v)} />
                  <MineField label="Lease Period From" value={mine.leasePeriodFrom} isEditing={isEditing} onChange={(v) => updateMine(index, 'leasePeriodFrom', v)} type="date" />
                  <MineField label="Lease Period To" value={mine.leasePeriodTo} isEditing={isEditing} onChange={(v) => updateMine(index, 'leasePeriodTo', v)} type="date" />
                  <MineField label="Mining Method" value={mine.miningMethod} isEditing={isEditing} onChange={(v) => updateMine(index, 'miningMethod', v)} select options={['Open Cast', 'Underground']} />
                  <MineField label="Quarry Category" value={mine.quarryCategory} isEditing={isEditing} onChange={(v) => updateMine(index, 'quarryCategory', v)} select options={['Mechanized', 'Semi-mechanized', 'Manual']} />
                  <MineField label="Captive/Non-Captive" value={mine.captiveType} isEditing={isEditing} onChange={(v) => updateMine(index, 'captiveType', v)} select options={['Captive', 'Non-Captive']} />
                  <MineField label="MDL No" value={mine.mdlNo} isEditing={isEditing} onChange={(v) => updateMine(index, 'mdlNo', v)} />
                  <MineField label="MDL Date" value={mine.mdlDate} isEditing={isEditing} onChange={(v) => updateMine(index, 'mdlDate', v)} type="date" />
                  <MineField label="MDL Validity" value={mine.mdlValidity} isEditing={isEditing} onChange={(v) => updateMine(index, 'mdlValidity', v)} type="date" />
                  <MineField label="Production (Million Tonnes)" value={mine.productionMT} isEditing={isEditing} onChange={(v) => updateMine(index, 'productionMT', v)} type="number" />
                  <div className="md:col-span-2">
                    <MineField label="Surface Feature of National Importance" value={mine.surfaceFeature} isEditing={isEditing} onChange={(v) => updateMine(index, 'surfaceFeature', v)} textArea />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileStat label="Member Since" value={new Date(profile.created_at).getFullYear()} />
        <ProfileStat label="Badge" value={profile.role} />
        <ProfileStat label="Total Mines" value={profile.mines.length} />
      </div>
    </div>
  );
};

const Field = ({ label, value, isEditing, textArea, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</label>
    {isEditing ? (
      textArea ? (
        <textarea className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <input className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={value} onChange={(e) => onChange(e.target.value)} />
      )
    ) : (
      <p className="text-gray-800 font-medium">{value || '-'}</p>
    )}
  </div>
);

const ProfileStat = ({ label, value }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-lg font-black text-indigo-600">{value}</p>
  </div>
);

const MineField = ({ label, value, isEditing, onChange, type, select, options, textArea }: any) => (
  <div className="space-y-1">
    <label className="text-xs font-semibold text-gray-500">{label}</label>
    {isEditing ? (
      select ? (
        <select className="w-full p-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select...</option>
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : textArea ? (
        <textarea className="w-full p-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" value={value} onChange={(e) => onChange(e.target.value)} rows={2} />
      ) : (
        <input type={type || 'text'} className="w-full p-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" value={value} onChange={(e) => onChange(e.target.value)} />
      )
    ) : (
      <p className="text-gray-800 font-medium text-sm">{value || '-'}</p>
    )}
  </div>
);

export default Profile;
