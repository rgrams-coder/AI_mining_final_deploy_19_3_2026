import { useState, useEffect } from 'react';
import { authService } from '../authService';

export default function RatingCalculator() {
  const [profile, setProfile] = useState<any>(null);
  const [selectedMine, setSelectedMine] = useState<any>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [saving, setSaving] = useState(false);
  
  const landUseTypes = [
    'Mining',
    'Mineral Storage',
    'Mineral Beneficiation Plant',
    'Tailing pond',
    'Roads',
    'Infrastructure(Workshop, Administrative building etc)',
    'OB/ Waste Dump',
    'Top Soil Preservation',
    'Any Sort of reclamation done',
    'Any natural drainage',
    'Others',
    'Total Area put to',
    'Excavated area reclaimed',
    'Waste dump area reclaimed'
  ];
  
  const [landUse, setLandUse] = useState<any>(
    landUseTypes.reduce((acc, type) => ({ ...acc, [type]: { approved: '', beginning: '', additional: '', cumulative: '' } }), {})
  );

  const [statutory, setStatutory] = useState({
    grantNature: '', grantOrderNo: '', grantPeriod: '',
    workOrderBy: '', workProceedingNo: '', workExecDate: '', workPeriodFrom: '', workPeriodTo: '',
    gstRegNo: '', gstOrderDate: '', gstValidFrom: '', gstValidTo: '',
    ampOrderNo: '', ampOrderDate: '', ampQuantity: '', ampValidFrom: '', ampValidTo: '',
    msOrderNo: '', msOrderDate: '', msQuantity: '', msValidFrom: '', msValidTo: '',
    ecOrderNo: '', ecOrderDate: '', ecQuantity: '', ecValidFrom: '', ecValidTo: '',
    cteOrderNo: '', cteOrderDate: '', cteQuantity: '', cteValidFrom: '', cteValidTo: '',
    spcbOrderNo: '', spcbOrderDate: '', spcbQuantity: '', spcbValidFrom: '', spcbValidTo: '',
    ctoOrderNo: '', ctoOrderDate: '', ctoQuantity: '', ctoValidFrom: '', ctoValidTo: '',
    blastLicenseNo: '', blastOrderDate: '', blastValidFrom: '', blastValidTo: '',
    blastAgreementWith: '', blastLicenseDetails: '', blastAgreementFrom: '', blastAgreementTo: '',
    managerName: '', managerQualification: '', managerAppointDate: '', managerTillDate: '',
    forestOrderNo: '', forestOrderDate: '', forestArea: '', forestPeriodFrom: '', forestPeriodTo: '',
    vishakhaCompliance: '',
    finAssurancePayable: '', finAssurancePaid: '', finBgNo: '', finBgDate: '', finBankName: '', finValidityDate: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        setProfile(data);
        if (data.mines && data.mines.length > 0) {
          setSelectedMine(data.mines[0]);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const saveRating = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8000/api/star-rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ year, profile, selectedMine, landUse, statutory })
      });
      alert('Rating saved successfully!');
    } catch (error) {
      alert('Failed to save rating');
    }
    setSaving(false);
  };

  if (!profile) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Star Rating Calculator</h2>
          <p className="text-gray-600">Lessee Profile and Star Rating for Minor Minerals</p>
        </div>
        <div className="flex gap-4 items-center">
          <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="px-4 py-2 border rounded-lg w-24" />
          <button onClick={saveRating} disabled={saving} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Rating'}
          </button>
        </div>
      </div>

      {/* Section 1: Lease Holder Details */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-bold mb-4">1. Lease Holder Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <InfoField label="Lessee Name" value={profile.name} />
          <InfoField label="Lessee ID" value={profile.lesseeId} />
          <InfoField label="Firm Name" value={profile.firmName} />
          <InfoField label="Managing Director/Partner" value={profile.managingDirector} />
          <InfoField label="Mobile Number" value={profile.mobileNo} />
          <InfoField label="Email ID" value={profile.email} />
          <InfoField label="Aadhar Number" value={profile.aadharNo} />
          <InfoField label="PAN Card Number" value={profile.panCardNo} />
          <div className="col-span-2">
            <InfoField label="Address of Lessee" value={profile.lesseeAddress} />
          </div>
          <div className="col-span-2">
            <InfoField label="Additional Information" value={profile.additionalInfo} />
          </div>
        </div>
      </div>

      {/* Section 2: Lease Area Details */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">2. Lease Area Details</h3>
          {profile.mines && profile.mines.length > 1 && (
            <select value={profile.mines.indexOf(selectedMine)} onChange={(e) => setSelectedMine(profile.mines[parseInt(e.target.value)])} className="px-4 py-2 border rounded-lg">
              {profile.mines.map((mine: any, idx: number) => (
                <option key={idx} value={idx}>{mine.mineName || `Mine ${idx + 1}`}</option>
              ))}
            </select>
          )}
        </div>
        {selectedMine ? (
          <div className="grid grid-cols-2 gap-4">
            <InfoField label="Name of Mine" value={selectedMine.mineName} />
            <InfoField label="Minerals Granted" value={selectedMine.mineralsGranted} />
            <InfoField label="Lease Area (Hectares)" value={selectedMine.leaseAreaHectares} />
            <InfoField label="Location of Lease" value={selectedMine.leaseLocation} />
            <InfoField label="Lease Period From" value={selectedMine.leasePeriodFrom} />
            <InfoField label="Lease Period To" value={selectedMine.leasePeriodTo} />
            <InfoField label="Mining Method" value={selectedMine.miningMethod} />
            <InfoField label="Quarry Category" value={selectedMine.quarryCategory} />
            <InfoField label="Captive/Non-Captive" value={selectedMine.captiveType} />
            <InfoField label="MDL Number" value={selectedMine.mdlNo} />
            <InfoField label="MDL Date" value={selectedMine.mdlDate} />
            <InfoField label="MDL Validity" value={selectedMine.mdlValidity} />
            <InfoField label="Production (Million Tonnes)" value={selectedMine.productionMT} />
            <div className="col-span-2">
              <InfoField label="Surface Features of National Importance" value={selectedMine.surfaceFeature} />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No mine details available. Please add mine information in your profile.</p>
        )}
      </div>

      {/* Section 3: Lease Area Utilization */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-bold mb-4">3. Lease Area Utilization (in hectares)</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left text-sm font-semibold">S.No</th>
                <th className="border p-2 text-left text-sm font-semibold">Type of land use</th>
                <th className="border p-2 text-left text-sm font-semibold">As per approved mining plan</th>
                <th className="border p-2 text-left text-sm font-semibold">Area Utilization at beginning of FY</th>
                <th className="border p-2 text-left text-sm font-semibold">Additional area operated during FY</th>
                <th className="border p-2 text-left text-sm font-semibold">Cumulative at the end of the last FY</th>
              </tr>
            </thead>
            <tbody>
              {landUseTypes.map((type, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border p-2 text-sm">{idx + 1}</td>
                  <td className="border p-2 text-sm font-medium">{type}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      step="0.01"
                      value={landUse[type]?.approved || ''}
                      onChange={(e) => setLandUse({ ...landUse, [type]: { ...landUse[type], approved: e.target.value } })}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      step="0.01"
                      value={landUse[type]?.beginning || ''}
                      onChange={(e) => setLandUse({ ...landUse, [type]: { ...landUse[type], beginning: e.target.value } })}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      step="0.01"
                      value={landUse[type]?.additional || ''}
                      onChange={(e) => setLandUse({ ...landUse, [type]: { ...landUse[type], additional: e.target.value } })}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      step="0.01"
                      value={landUse[type]?.cumulative || ''}
                      onChange={(e) => setLandUse({ ...landUse, [type]: { ...landUse[type], cumulative: e.target.value } })}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 4: Statutory Compliances */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-bold mb-4">4. Statutory Compliances</h3>
        <div className="space-y-6">
          <ComplianceSection title="Grant order of the lease">
            <InputField label="Nature of Grant" value={statutory.grantNature} onChange={(v) => setStatutory({...statutory, grantNature: v})} placeholder="Fresh/Renewal/Transfer" />
            <InputField label="Grant Order No" value={statutory.grantOrderNo} onChange={(v) => setStatutory({...statutory, grantOrderNo: v})} />
            <InputField label="Period of Grant" value={statutory.grantPeriod} onChange={(v) => setStatutory({...statutory, grantPeriod: v})} />
          </ComplianceSection>

          <ComplianceSection title="Work order of the lease">
            <InputField label="Work Order Issued By" value={statutory.workOrderBy} onChange={(v) => setStatutory({...statutory, workOrderBy: v})} />
            <InputField label="Proceeding No" value={statutory.workProceedingNo} onChange={(v) => setStatutory({...statutory, workProceedingNo: v})} />
            <InputField label="Date of Execution" value={statutory.workExecDate} onChange={(v) => setStatutory({...statutory, workExecDate: v})} type="date" />
            <InputField label="Lease Period From" value={statutory.workPeriodFrom} onChange={(v) => setStatutory({...statutory, workPeriodFrom: v})} type="date" />
            <InputField label="Lease Period To" value={statutory.workPeriodTo} onChange={(v) => setStatutory({...statutory, workPeriodTo: v})} type="date" />
          </ComplianceSection>

          <ComplianceSection title="GST Registration">
            <InputField label="Registration No" value={statutory.gstRegNo} onChange={(v) => setStatutory({...statutory, gstRegNo: v})} />
            <InputField label="Date of Order" value={statutory.gstOrderDate} onChange={(v) => setStatutory({...statutory, gstOrderDate: v})} type="date" />
            <InputField label="Validity From" value={statutory.gstValidFrom} onChange={(v) => setStatutory({...statutory, gstValidFrom: v})} type="date" />
            <InputField label="Validity Up to" value={statutory.gstValidTo} onChange={(v) => setStatutory({...statutory, gstValidTo: v})} type="date" />
          </ComplianceSection>

          <ComplianceSection title="Approved Mining Plan">
            <InputField label="AMP Order No" value={statutory.ampOrderNo} onChange={(v) => setStatutory({...statutory, ampOrderNo: v})} />
            <InputField label="Order Date" value={statutory.ampOrderDate} onChange={(v) => setStatutory({...statutory, ampOrderDate: v})} type="date" />
            <InputField label="Approved Quantity" value={statutory.ampQuantity} onChange={(v) => setStatutory({...statutory, ampQuantity: v})} />
            <InputField label="Validity From" value={statutory.ampValidFrom} onChange={(v) => setStatutory({...statutory, ampValidFrom: v})} type="date" />
            <InputField label="Validity Up to" value={statutory.ampValidTo} onChange={(v) => setStatutory({...statutory, ampValidTo: v})} type="date" />
          </ComplianceSection>

          <ComplianceSection title="Scheme of Mining/Quarrying">
            <InputField label="MS Order No" value={statutory.msOrderNo} onChange={(v) => setStatutory({...statutory, msOrderNo: v})} />
            <InputField label="Order Date" value={statutory.msOrderDate} onChange={(v) => setStatutory({...statutory, msOrderDate: v})} type="date" />
            <InputField label="Approved Quantity" value={statutory.msQuantity} onChange={(v) => setStatutory({...statutory, msQuantity: v})} />
            <InputField label="Validity From" value={statutory.msValidFrom} onChange={(v) => setStatutory({...statutory, msValidFrom: v})} type="date" />
            <InputField label="Validity Up to" value={statutory.msValidTo} onChange={(v) => setStatutory({...statutory, msValidTo: v})} type="date" />
          </ComplianceSection>

          <ComplianceSection title="Environmental Clearance">
            <InputField label="EC Order No" value={statutory.ecOrderNo} onChange={(v) => setStatutory({...statutory, ecOrderNo: v})} />
            <InputField label="Order Date" value={statutory.ecOrderDate} onChange={(v) => setStatutory({...statutory, ecOrderDate: v})} type="date" />
            <InputField label="Approved Quantity" value={statutory.ecQuantity} onChange={(v) => setStatutory({...statutory, ecQuantity: v})} />
            <InputField label="Validity From" value={statutory.ecValidFrom} onChange={(v) => setStatutory({...statutory, ecValidFrom: v})} type="date" />
            <InputField label="Validity Up to" value={statutory.ecValidTo} onChange={(v) => setStatutory({...statutory, ecValidTo: v})} type="date" />
          </ComplianceSection>

          <ComplianceSection title="Consent to Established">
            <InputField label="CTE Order No" value={statutory.cteOrderNo} onChange={(v) => setStatutory({...statutory, cteOrderNo: v})} />
            <InputField label="Order Date" value={statutory.cteOrderDate} onChange={(v) => setStatutory({...statutory, cteOrderDate: v})} type="date" />
            <InputField label="Approved Quantity" value={statutory.cteQuantity} onChange={(v) => setStatutory({...statutory, cteQuantity: v})} />
            <InputField label="Validity From" value={statutory.cteValidFrom} onChange={(v) => setStatutory({...statutory, cteValidFrom: v})} type="date" />
            <InputField label="Validity Up to" value={statutory.cteValidTo} onChange={(v) => setStatutory({...statutory, cteValidTo: v})} type="date" />
          </ComplianceSection>

          <ComplianceSection title="SPCB Approved">
            <InputField label="SPCB Order No" value={statutory.spcbOrderNo} onChange={(v) => setStatutory({...statutory, spcbOrderNo: v})} />
            <InputField label="Order Date" value={statutory.spcbOrderDate} onChange={(v) => setStatutory({...statutory, spcbOrderDate: v})} type="date" />
            <InputField label="Approved Quantity" value={statutory.spcbQuantity} onChange={(v) => setStatutory({...statutory, spcbQuantity: v})} />
            <InputField label="Validity From" value={statutory.spcbValidFrom} onChange={(v) => setStatutory({...statutory, spcbValidFrom: v})} type="date" />
            <InputField label="Validity Up to" value={statutory.spcbValidTo} onChange={(v) => setStatutory({...statutory, spcbValidTo: v})} type="date" />
          </ComplianceSection>

          <ComplianceSection title="Consent to Operate">
            <InputField label="CTO Order No" value={statutory.ctoOrderNo} onChange={(v) => setStatutory({...statutory, ctoOrderNo: v})} />
            <InputField label="Order Date" value={statutory.ctoOrderDate} onChange={(v) => setStatutory({...statutory, ctoOrderDate: v})} type="date" />
            <InputField label="Approved Quantity" value={statutory.ctoQuantity} onChange={(v) => setStatutory({...statutory, ctoQuantity: v})} />
            <InputField label="Validity From" value={statutory.ctoValidFrom} onChange={(v) => setStatutory({...statutory, ctoValidFrom: v})} type="date" />
            <InputField label="Validity Up to" value={statutory.ctoValidTo} onChange={(v) => setStatutory({...statutory, ctoValidTo: v})} type="date" />
          </ComplianceSection>

          <ComplianceSection title="Blasting License">
            <InputField label="License Order No" value={statutory.blastLicenseNo} onChange={(v) => setStatutory({...statutory, blastLicenseNo: v})} />
            <InputField label="Date of Order" value={statutory.blastOrderDate} onChange={(v) => setStatutory({...statutory, blastOrderDate: v})} type="date" />
            <InputField label="Validity From" value={statutory.blastValidFrom} onChange={(v) => setStatutory({...statutory, blastValidFrom: v})} type="date" />
            <InputField label="Validity Up to" value={statutory.blastValidTo} onChange={(v) => setStatutory({...statutory, blastValidTo: v})} type="date" />
          </ComplianceSection>

          <ComplianceSection title="Blasting Agreement">
            <InputField label="Agreement With" value={statutory.blastAgreementWith} onChange={(v) => setStatutory({...statutory, blastAgreementWith: v})} />
            <InputField label="License Details" value={statutory.blastLicenseDetails} onChange={(v) => setStatutory({...statutory, blastLicenseDetails: v})} />
            <InputField label="Agreement From" value={statutory.blastAgreementFrom} onChange={(v) => setStatutory({...statutory, blastAgreementFrom: v})} type="date" />
            <InputField label="Agreement Up to" value={statutory.blastAgreementTo} onChange={(v) => setStatutory({...statutory, blastAgreementTo: v})} type="date" />
          </ComplianceSection>

          <ComplianceSection title="Appointment of Mines Manager">
            <InputField label="Name of Manager" value={statutory.managerName} onChange={(v) => setStatutory({...statutory, managerName: v})} />
            <InputField label="Qualification" value={statutory.managerQualification} onChange={(v) => setStatutory({...statutory, managerQualification: v})} />
            <InputField label="Appointment Date" value={statutory.managerAppointDate} onChange={(v) => setStatutory({...statutory, managerAppointDate: v})} type="date" />
            <InputField label="Till Date" value={statutory.managerTillDate} onChange={(v) => setStatutory({...statutory, managerTillDate: v})} type="date" />
          </ComplianceSection>

          <ComplianceSection title="Permission under Forest Conservation Act 1980">
            <InputField label="Forest Dept Order No" value={statutory.forestOrderNo} onChange={(v) => setStatutory({...statutory, forestOrderNo: v})} />
            <InputField label="Order Date" value={statutory.forestOrderDate} onChange={(v) => setStatutory({...statutory, forestOrderDate: v})} type="date" />
            <InputField label="Area (in hectare)" value={statutory.forestArea} onChange={(v) => setStatutory({...statutory, forestArea: v})} type="number" />
            <InputField label="Period From" value={statutory.forestPeriodFrom} onChange={(v) => setStatutory({...statutory, forestPeriodFrom: v})} type="date" />
            <InputField label="Period To" value={statutory.forestPeriodTo} onChange={(v) => setStatutory({...statutory, forestPeriodTo: v})} type="date" />
          </ComplianceSection>

          <ComplianceSection title="Vishakha Committee Guideline">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Compliances for prevention of women harassment at workplace</label>
                <select value={statutory.vishakhaCompliance} onChange={(e) => setStatutory({...statutory, vishakhaCompliance: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg">
                  <option value="">Select...</option>
                  <option value="Implemented">Implemented</option>
                  <option value="Not Implemented">Not Implemented</option>
                  <option value="Not Applicable">Not Applicable</option>
                </select>
              </div>
            </div>
          </ComplianceSection>

          <ComplianceSection title="Financial Assurance for Mine Closure">
            <InputField label="Amount Payable" value={statutory.finAssurancePayable} onChange={(v) => setStatutory({...statutory, finAssurancePayable: v})} type="number" />
            <InputField label="Amount Paid" value={statutory.finAssurancePaid} onChange={(v) => setStatutory({...statutory, finAssurancePaid: v})} type="number" />
            <InputField label="BG No and Date" value={statutory.finBgNo} onChange={(v) => setStatutory({...statutory, finBgNo: v})} />
            <InputField label="BG Date" value={statutory.finBgDate} onChange={(v) => setStatutory({...statutory, finBgDate: v})} type="date" />
            <InputField label="Bank Name" value={statutory.finBankName} onChange={(v) => setStatutory({...statutory, finBankName: v})} />
            <InputField label="Validity Date" value={statutory.finValidityDate} onChange={(v) => setStatutory({...statutory, finValidityDate: v})} type="date" />
          </ComplianceSection>
        </div>
      </div>

      {/* Rating Modules Placeholder */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-bold mb-4">Rating Modules</h3>
        <p className="text-gray-600">Rating calculation modules will be displayed here based on the evaluation criteria.</p>
      </div>
    </div>
  );
}

const InfoField = ({ label, value }: { label: string; value: any }) => (
  <div>
    <label className="text-xs font-semibold text-gray-500 uppercase">{label}</label>
    <p className="text-gray-900 font-medium mt-1">{value || '-'}</p>
  </div>
);

const ComplianceSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-l-4 border-indigo-500 pl-4 py-2">
    <h4 className="font-semibold text-gray-800 mb-3">{title}</h4>
    <div className="grid grid-cols-2 gap-4">{children}</div>
  </div>
);

const InputField = ({ label, value, onChange, type = 'text', placeholder = '' }: any) => (
  <div>
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" />
  </div>
);
