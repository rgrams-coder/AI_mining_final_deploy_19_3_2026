import { useState } from 'react';

export default function StarRatingCalculator() {
  const [leaseDetails, setLeaseDetails] = useState({
    mineName: '',
    lesseeName: '',
    lesseeAddress: '',
    lesseeContact: '',
    mineCode: '',
    ibmRegNo: '',
    minerals: '',
    totalLeaseArea: '',
    forestLand: '',
    privateLand: '',
    revenueLand: '',
    othersLand: '',
    leasePeriod: '',
    reserves: '',
    resources: '',
    miningMethod: '',
    category: '',
    captiveType: '',
    sduMembers: '',
    production: '',
    surfaceFeatures: ''
  });

  const landUseTypes = ['Mining', 'Mineral storage', 'Mineral Beneficiation plant', 'Township', 'Tailing Pond', 'Railways', 'Roads', 'Infrastructure (Workshop, administrative building etc.)', 'OB/waste dump', 'Top soil preservation', 'Others', 'Total area put to use', 'Excavated area reclaimed', 'Waste dump area reclaimed'];
  
  const [landUse, setLandUse] = useState(
    landUseTypes.reduce((acc, type) => ({ ...acc, [type]: { approved: '', beginning: '', during: '', cumulative: '' } }), {})
  );

  const royaltyItems = ['Royalty/Dead rent paid', 'Contribution to DMF', 'Contribution to NMET', 'Amount Paid towards despatch sharing in Auction cases', 'Total of other cess or taxes paid to Government, in addition to above'];
  
  const [royalty, setRoyalty] = useState(
    royaltyItems.reduce((acc, item) => ({ ...acc, [item]: '' }), {})
  );

  const [statutory, setStatutory] = useState({
    ecOrderNo: '', ecQuantity: '', ecValidity: '',
    cteLetterNo: '', cteDate: '', cteValidity: '',
    ctoLetterNo: '', ctoDate: '', ctoValidity: '', ctoQuantity: '',
    fcLetterNo: '', fcDate: '', fcValidity: '', fcArea: '',
    landArea: '', landAmount: '',
    vishakha: ''
  });

  const [moduleI, setModuleI] = useState({
    sduDetails: '', sduConstituted: '',
    royaltyPercent: '', totalExpenditure: '', percentUtilization: '',
    csrCommitted: '', csrUtilized: '',
    explorationProposed: '', explorationAchieved: '',
    g1Area: '', g2Area: '', g3Area: '', nonMineralArea: '',
    g1Converted: '', g2Remaining: '', g3Remaining: '',
    useMIS: '',
    mineralProposed: '', mineralActual: '',
    wasteProposed: '', wasteActual: '',
    benchHeightProposed: '', benchHeightActual: '',
    benchWidthProposed: '', benchWidthActual: '',
    excavationLateralProposed: '', excavationLateralActual: '',
    excavationVerticalProposed: '', excavationVerticalActual: '',
    ugMineralProposed: '', ugMineralActual: '',
    shaftProposed: '', shaftActual: '',
    aditProposed: '', aditActual: '',
    inclineProposed: '', inclineActual: '',
    horizontalProposed: '', horizontalActual: '',
    verticalProposed: '', verticalActual: '',
    driveProposed: '', driveActual: '',
    raisesProposed: '', raisesActual: '',
    stopeProposed: '', stopeActual: '',
    wasteDisposal: '',
    wasteDumping: '',
    mineralStacking: '',
    beneficiation: '',
    mineralRejectAvailable: '', mineralRejectUsed: '',
    topsoilProposed: '', topsoilActual: '',
    checkDamsProposed: '', checkDamsAchieved: '',
    garlandDrainsProposed: '', garlandDrainsAchieved: '',
    retainingWallsProposed: '', retainingWallsAchieved: '',
    tailingsDisposal: '',
    tailingsUtilization: '',
    waterSprinkling: '', wetDrilling: '', waterMist: '', coveringDumps: '',
    usedOilDisposal: '',
    gwMonitoring: '',
    gwQuality: '',
    mineWaterUse: '',
    recycledWaterPercent: '',
    zeroLeakage: '', dripIrrigation: '',
    airQualityCore: '', airQualityBuffer: '',
    surfaceWaterCore: '', surfaceWaterBuffer: '',
    groundWaterCore: '', groundWaterBuffer: '',
    noiseLevelCore: '', noiseLevelBuffer: '',
    vibrationCore: '', vibrationBuffer: '',
    greenEnergyPercent: '',
    energyAudit: '',
    sensors: '', fuelConservation: '', technicalIntervention: '',
    ibmViolationsTotal: '', ibmViolationsComplied: '',
    otherViolationsTotal: '', otherViolationsComplied: ''
  });

  const [moduleII, setModuleII] = useState({
    backfillingProposed: '', backfillingActual: '',
    waterReservoirArea: '',
    rainwaterHarvesting: '',
    rwDetails: '',
    plantationBackfilled: '',
    plantationDump: '',
    plantationVirgin: '',
    agroForestry: '',
    fasterRestoration: '',
    fasterRestorationDetails: '',
    problematicSoils: '',
    problematicSoilsDetails: '',
    ecoTourismArea: '',
    dumpStabilization: ''
  });

  const [moduleIII, setModuleIII] = useState({
    papTotal: '', papArrangements: '', papEmployment: '', papSkilled: '',
    siaUndertaken: '', grievanceRedressal: '', committeeDisplayed: '',
    stakeholderParticipation: '',
    waterExpProposed: '', waterExpActual: '',
    healthExpProposed: '', healthExpActual: '',
    skillExpProposed: '', skillExpActual: '',
    localManpowerPercent: '', skilledLocalPercent: '',
    lweDistrict: '', tribalArea: '',
    villageAdoption: '', odfMining: '', minesCleanliness: '', garbageDisposal: ''
  });

  const [moduleIV, setModuleIV] = useState({
    sdfWebsite: '', airQualityDisplay: '', internalAudit: '',
    iso9001: '', iso14001: '', iso18001: '', sa8000: '',
    energyAudit: '', griReporting: '', swachhataReport: ''
  });

  const [year, setYear] = useState(new Date().getFullYear());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const calculateModuleIScore = () => {
    let score = 0;
    let maxPoints = 0;
    
    // SDU Constitution
    if (moduleI.sduConstituted === 'Yes') score += 3;
    maxPoints += 3;
    
    // Add more calculations based on the criteria
    // This is a simplified version - full implementation would calculate all points
    
    return { score, maxPoints };
  };

  const calculateModuleIIScore = () => {
    let score = 0;
    let maxPoints = 0;
    return { score, maxPoints };
  };

  const calculateModuleIIIScore = () => {
    let score = 0;
    let maxPoints = 0;
    return { score, maxPoints };
  };

  const calculateModuleIVScore = () => {
    let score = 0;
    let maxPoints = 0;
    return { score, maxPoints };
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const saveRating = async () => {
    setSaving(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/star-rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ year, leaseDetails, landUse, royalty, statutory, moduleI, moduleII, moduleIII, moduleIV })
      });
      if (response.ok) {
        setMessage('✅ Rating saved successfully!');
      } else {
        setMessage('❌ Failed to save rating');
      }
    } catch (error) {
      setMessage('❌ Error saving rating');
    }
    setSaving(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <h2 className="text-2xl font-bold">Lessee Profile and Star Rating for Major MInerals</h2>
            <p className="text-gray-500">Evaluation template for Star Rating of Mining Lease of Major Minerals as per notification no 531 dated 23.04.2020 issued by Deparment of mines and geology , Government of Jharkhand</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label>Year:</label>
            <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value))} style={{ padding: '8px', border: '2px solid #ddd', borderRadius: '6px', width: '100px' }} />
            <button onClick={saveRating} disabled={saving} style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', opacity: saving ? 0.6 : 1 }}>
              {saving ? 'Saving...' : '💾 Save'}
            </button>
            {message && <span style={{ fontWeight: 'bold' }}>{message}</span>}
          </div>
        </div>
      </div>
      {/* Part 1: Lease Area Details */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>I. Lease Area Details</h3>
        <input type="text" placeholder="1. Name of the Mine" value={leaseDetails.mineName} onChange={(e) => setLeaseDetails({ ...leaseDetails, mineName: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="text" placeholder="2. Name of the Lessee" value={leaseDetails.lesseeName} onChange={(e) => setLeaseDetails({ ...leaseDetails, lesseeName: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="text" placeholder="Address" value={leaseDetails.lesseeAddress} onChange={(e) => setLeaseDetails({ ...leaseDetails, lesseeAddress: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="text" placeholder="Phone & Email" value={leaseDetails.lesseeContact} onChange={(e) => setLeaseDetails({ ...leaseDetails, lesseeContact: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="text" placeholder="3. Mine code (for ML)" value={leaseDetails.mineCode} onChange={(e) => setLeaseDetails({ ...leaseDetails, mineCode: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="number" placeholder="4. IBM Registration Number" value={leaseDetails.ibmRegNo} onChange={(e) => setLeaseDetails({ ...leaseDetails, ibmRegNo: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="text" placeholder="5. Mineral(s)" value={leaseDetails.minerals} onChange={(e) => setLeaseDetails({ ...leaseDetails, minerals: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="number" step="0.0001" placeholder="6. Total Lease Area (ha)" value={leaseDetails.totalLeaseArea} onChange={(e) => setLeaseDetails({ ...leaseDetails, totalLeaseArea: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="number" step="0.0001" placeholder="(i) Forest Land (ha)" value={leaseDetails.forestLand} onChange={(e) => setLeaseDetails({ ...leaseDetails, forestLand: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="number" step="0.0001" placeholder="(ii) Private Land (ha)" value={leaseDetails.privateLand} onChange={(e) => setLeaseDetails({ ...leaseDetails, privateLand: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="number" step="0.0001" placeholder="(iii) Revenue land (ha)" value={leaseDetails.revenueLand} onChange={(e) => setLeaseDetails({ ...leaseDetails, revenueLand: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="text" placeholder="(iv) Others, if any (Specify)" value={leaseDetails.othersLand} onChange={(e) => setLeaseDetails({ ...leaseDetails, othersLand: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="date" placeholder="7. Lease period (valid up to)" value={leaseDetails.leasePeriod} onChange={(e) => setLeaseDetails({ ...leaseDetails, leasePeriod: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="number" placeholder="8. Reserves (In million tonnes)" value={leaseDetails.reserves} onChange={(e) => setLeaseDetails({ ...leaseDetails, reserves: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="number" placeholder="9. Resources (In million tonnes)" value={leaseDetails.resources} onChange={(e) => setLeaseDetails({ ...leaseDetails, resources: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="text" placeholder="10. Method of Mining" value={leaseDetails.miningMethod} onChange={(e) => setLeaseDetails({ ...leaseDetails, miningMethod: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="text" placeholder="11. Category - A / B" value={leaseDetails.category} onChange={(e) => setLeaseDetails({ ...leaseDetails, category: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="text" placeholder="12. Captive/Non Captive" value={leaseDetails.captiveType} onChange={(e) => setLeaseDetails({ ...leaseDetails, captiveType: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="text" placeholder="13. SDU Members" value={leaseDetails.sduMembers} onChange={(e) => setLeaseDetails({ ...leaseDetails, sduMembers: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="number" placeholder="14. Production during reporting year (Tonnes)" value={leaseDetails.production} onChange={(e) => setLeaseDetails({ ...leaseDetails, production: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="text" placeholder="15. Prominent surface features" value={leaseDetails.surfaceFeatures} onChange={(e) => setLeaseDetails({ ...leaseDetails, surfaceFeatures: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '20px' }} />
        
        <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>II. Lease Area Utilisation</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>S.No.</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Type of land use (in ha)</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Area at end of approved plan</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Area at beginning of RY</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Area during RY</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cumulative area at end of RY</th>
              </tr>
            </thead>
            <tbody>
              {landUseTypes.map((type, idx) => (
                <tr key={idx}>
                  <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>{idx + 1}</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px' }}>{type}</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                    <input type="number" step="0.01" value={landUse[type]?.approved || ''} onChange={(e) => setLandUse({ ...landUse, [type]: { ...landUse[type], approved: e.target.value } })} style={{ width: '100%', padding: '4px', border: 'none' }} />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                    <input type="number" step="0.01" value={landUse[type]?.beginning || ''} onChange={(e) => setLandUse({ ...landUse, [type]: { ...landUse[type], beginning: e.target.value } })} style={{ width: '100%', padding: '4px', border: 'none' }} />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                    <input type="number" step="0.01" value={landUse[type]?.during || ''} onChange={(e) => setLandUse({ ...landUse, [type]: { ...landUse[type], during: e.target.value } })} style={{ width: '100%', padding: '4px', border: 'none' }} />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                    <input type="number" step="0.01" value={landUse[type]?.cumulative || ''} onChange={(e) => setLandUse({ ...landUse, [type]: { ...landUse[type], cumulative: e.target.value } })} style={{ width: '100%', padding: '4px', border: 'none' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>III. Royalty & Other Contributions</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>S.No.</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Details</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount paid in RY (Lakh Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {royaltyItems.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>{idx + 1}</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px' }}>{item}</td>
                  <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                    <input type="number" step="0.01" value={royalty[item] || ''} onChange={(e) => setRoyalty({ ...royalty, [item]: e.target.value })} style={{ width: '100%', padding: '4px', border: 'none' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>IV. Statutory Compliances</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>1. Environment Clearance</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="text" placeholder="Order No." value={statutory.ecOrderNo} onChange={(e) => setStatutory({ ...statutory, ecOrderNo: e.target.value })} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="text" placeholder="Quantity approved" value={statutory.ecQuantity} onChange={(e) => setStatutory({ ...statutory, ecQuantity: e.target.value })} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="date" placeholder="Validity" value={statutory.ecValidity} onChange={(e) => setStatutory({ ...statutory, ecValidity: e.target.value })} style={{ width: '100%', padding: '4px' }} />
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>2. SPCB Approvals</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Consent to Establish:</strong>
                    <input type="text" placeholder="Letter No." value={statutory.cteLetterNo} onChange={(e) => setStatutory({ ...statutory, cteLetterNo: e.target.value })} style={{ width: '100%', padding: '4px', marginTop: '4px', marginBottom: '4px' }} />
                    <input type="date" placeholder="Date" value={statutory.cteDate} onChange={(e) => setStatutory({ ...statutory, cteDate: e.target.value })} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                    <input type="date" placeholder="Validity" value={statutory.cteValidity} onChange={(e) => setStatutory({ ...statutory, cteValidity: e.target.value })} style={{ width: '100%', padding: '4px' }} />
                  </div>
                  <div>
                    <strong>Consent to Operate:</strong>
                    <input type="text" placeholder="Letter No." value={statutory.ctoLetterNo} onChange={(e) => setStatutory({ ...statutory, ctoLetterNo: e.target.value })} style={{ width: '100%', padding: '4px', marginTop: '4px', marginBottom: '4px' }} />
                    <input type="date" placeholder="Date" value={statutory.ctoDate} onChange={(e) => setStatutory({ ...statutory, ctoDate: e.target.value })} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                    <input type="date" placeholder="Validity" value={statutory.ctoValidity} onChange={(e) => setStatutory({ ...statutory, ctoValidity: e.target.value })} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                    <input type="text" placeholder="Approved quantity" value={statutory.ctoQuantity} onChange={(e) => setStatutory({ ...statutory, ctoQuantity: e.target.value })} style={{ width: '100%', padding: '4px' }} />
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>3. Forest Clearance</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="text" placeholder="Letter No." value={statutory.fcLetterNo} onChange={(e) => setStatutory({ ...statutory, fcLetterNo: e.target.value })} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="date" placeholder="Date" value={statutory.fcDate} onChange={(e) => setStatutory({ ...statutory, fcDate: e.target.value })} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="date" placeholder="Validity" value={statutory.fcValidity} onChange={(e) => setStatutory({ ...statutory, fcValidity: e.target.value })} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="number" step="0.01" placeholder="Area in hectares" value={statutory.fcArea} onChange={(e) => setStatutory({ ...statutory, fcArea: e.target.value })} style={{ width: '100%', padding: '4px' }} />
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>4. Land Acquisition</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" step="0.01" placeholder="Total Area acquired/purchased" value={statutory.landArea} onChange={(e) => setStatutory({ ...statutory, landArea: e.target.value })} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="number" step="0.01" placeholder="Total Amount paid" value={statutory.landAmount} onChange={(e) => setStatutory({ ...statutory, landAmount: e.target.value })} style={{ width: '100%', padding: '4px' }} />
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>5. Vishakha Committee Guidelines</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <select value={statutory.vishakha} onChange={(e) => setStatutory({ ...statutory, vishakha: e.target.value })} style={{ width: '100%', padding: '4px' }}>
                    <option value="">Select</option>
                    <option value="Implemented">Implemented</option>
                    <option value="Not Implemented">Not Implemented</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Part 2: Module I - Managing Impacts */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', maxHeight: '600px', overflowY: 'auto' }}>
        <h3>Part 2 - Module I: Managing Impacts at Mine Level</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f0f0f0' }}>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '6px' }}>Particulars</th>
                <th style={{ border: '1px solid #ddd', padding: '6px' }}>Details</th>
                <th style={{ border: '1px solid #ddd', padding: '6px' }}>Max Points</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#e8e8e8' }}>SDU Constitution</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>SDU Team Details</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="text" value={moduleI.sduDetails} onChange={(e) => setModuleI({...moduleI, sduDetails: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                  <select value={moduleI.sduConstituted} onChange={(e) => setModuleI({...moduleI, sduConstituted: e.target.value})} style={{ width: '100%', padding: '4px', marginTop: '4px' }}>
                    <option value="">Select</option>
                    <option value="Yes">Constituted (3)</option>
                    <option value="No">Not Constituted (0)</option>
                  </select>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>3</td>
              </tr>
              
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#e8e8e8' }}>SDF Expenditure</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>10% of Royalty / Total Expenditure / % Utilization</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" placeholder="10% of Royalty" value={moduleI.royaltyPercent} onChange={(e) => setModuleI({...moduleI, royaltyPercent: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="number" placeholder="Total Expenditure" value={moduleI.totalExpenditure} onChange={(e) => setModuleI({...moduleI, totalExpenditure: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="number" placeholder="% Utilization" value={moduleI.percentUtilization} onChange={(e) => setModuleI({...moduleI, percentUtilization: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>5</td>
              </tr>
              
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#e8e8e8' }}>CSR Spending</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>Committed / Utilized</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" placeholder="Committed" value={moduleI.csrCommitted} onChange={(e) => setModuleI({...moduleI, csrCommitted: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="number" placeholder="Utilized" value={moduleI.csrUtilized} onChange={(e) => setModuleI({...moduleI, csrUtilized: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>5</td>
              </tr>
              
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#e8e8e8' }}>Exploration Activity</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>Proposed / Achieved</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" placeholder="Proposed" value={moduleI.explorationProposed} onChange={(e) => setModuleI({...moduleI, explorationProposed: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="number" placeholder="Achieved" value={moduleI.explorationAchieved} onChange={(e) => setModuleI({...moduleI, explorationAchieved: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>10</td>
              </tr>
              
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#e8e8e8' }}>Mining Operation: Opencast</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>Production (Proposed/Actual)</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" placeholder="Proposed" value={moduleI.mineralProposed} onChange={(e) => setModuleI({...moduleI, mineralProposed: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="number" placeholder="Actual" value={moduleI.mineralActual} onChange={(e) => setModuleI({...moduleI, mineralActual: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>5</td>
              </tr>
              
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#e8e8e8' }}>Environment Compliances</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>Top soil (Proposed/Actual)</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" placeholder="Proposed" value={moduleI.topsoilProposed} onChange={(e) => setModuleI({...moduleI, topsoilProposed: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="number" placeholder="Actual" value={moduleI.topsoilActual} onChange={(e) => setModuleI({...moduleI, topsoilActual: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>5</td>
              </tr>
              
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#e8e8e8' }}>Dust Suppression</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>Water sprinkling / Wet drilling / Water mist / Covering dumps</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <select value={moduleI.waterSprinkling} onChange={(e) => setModuleI({...moduleI, waterSprinkling: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }}>
                    <option value="">Water Sprinkling</option>
                    <option value="Yes">Yes (1)</option>
                    <option value="No">No (0)</option>
                  </select>
                  <select value={moduleI.wetDrilling} onChange={(e) => setModuleI({...moduleI, wetDrilling: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }}>
                    <option value="">Wet Drilling</option>
                    <option value="Yes">Yes (1)</option>
                    <option value="No">No (0)</option>
                  </select>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>4</td>
              </tr>
              
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#e8e8e8' }}>Green Energy</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>% from Renewable Sources</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" placeholder="% Green Energy" value={moduleI.greenEnergyPercent} onChange={(e) => setModuleI({...moduleI, greenEnergyPercent: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>4</td>
              </tr>
              
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#e8e8e8' }}>Compliance Status</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>IBM Violations (Total/Complied)</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" placeholder="Total Violations" value={moduleI.ibmViolationsTotal} onChange={(e) => setModuleI({...moduleI, ibmViolationsTotal: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="number" placeholder="Violations Complied" value={moduleI.ibmViolationsComplied} onChange={(e) => setModuleI({...moduleI, ibmViolationsComplied: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>4</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>Note: This is a simplified version. Full implementation includes all criteria from Module I.</p>
        
        <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Module II: Final/Progressive Mine Closure & Landscape Restoration</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f0f0f0' }}>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '6px' }}>Particulars</th>
                <th style={{ border: '1px solid #ddd', padding: '6px' }}>Details</th>
                <th style={{ border: '1px solid #ddd', padding: '6px' }}>Max Points</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#d8e8f0' }}>1) Backfilling</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>Backfilling Area (Ha) - Proposal/Actual</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" step="0.01" placeholder="Proposed" value={moduleII.backfillingProposed} onChange={(e) => setModuleII({...moduleII, backfillingProposed: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                  <input type="number" step="0.01" placeholder="Actual" value={moduleII.backfillingActual} onChange={(e) => setModuleII({...moduleII, backfillingActual: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>3</td>
              </tr>
              
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#d8e8f0' }}>2) Water Reservoir & Pisciculture</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>Area under water reservoir</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" step="0.01" placeholder="Area (Ha)" value={moduleII.waterReservoirArea} onChange={(e) => setModuleII({...moduleII, waterReservoirArea: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>5</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>2(a) Rainwater Harvesting & GW Recharging</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <select value={moduleII.rainwaterHarvesting} onChange={(e) => setModuleII({...moduleII, rainwaterHarvesting: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }}>
                    <option value="">Select</option>
                    <option value="RW_GW">RW Harvesting with GW Recharging (3)</option>
                    <option value="RW_Only">RW Harvesting without GW Recharging (2)</option>
                    <option value="None">No structures (0)</option>
                  </select>
                  <input type="text" placeholder="Details" value={moduleII.rwDetails} onChange={(e) => setModuleII({...moduleII, rwDetails: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>3</td>
              </tr>
              
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#d8e8f0' }}>3) Landscape Restoration & Rehabilitation</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>Plantation over backfilled area (%)</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" step="0.01" placeholder="% Achieved" value={moduleII.plantationBackfilled} onChange={(e) => setModuleII({...moduleII, plantationBackfilled: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>3</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>Plantation over dump area (%)</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" step="0.01" placeholder="% Achieved" value={moduleII.plantationDump} onChange={(e) => setModuleII({...moduleII, plantationDump: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>5</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>Plantation over virgin area (Green belt) (%)</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" step="0.01" placeholder="% Achieved" value={moduleII.plantationVirgin} onChange={(e) => setModuleII({...moduleII, plantationVirgin: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>3</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>Agro forestry Area</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <select value={moduleII.agroForestry} onChange={(e) => setModuleII({...moduleII, agroForestry: e.target.value})} style={{ width: '100%', padding: '4px' }}>
                    <option value="">Select</option>
                    <option value="Yes">Done (2)</option>
                    <option value="No">Not Done (0)</option>
                  </select>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>2</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>3(a) Efforts for faster restoration</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <select value={moduleII.fasterRestoration} onChange={(e) => setModuleII({...moduleII, fasterRestoration: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }}>
                    <option value="">Select</option>
                    <option value="Yes">Yes (2)</option>
                    <option value="No">No (0)</option>
                  </select>
                  <input type="text" placeholder="Details (Soil-moisture conservation, fencing, drip irrigation, etc.)" value={moduleII.fasterRestorationDetails} onChange={(e) => setModuleII({...moduleII, fasterRestorationDetails: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>2</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>3(b) Treatment of problematic soils</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <select value={moduleII.problematicSoils} onChange={(e) => setModuleII({...moduleII, problematicSoils: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }}>
                    <option value="">Select</option>
                    <option value="Yes">Yes (2)</option>
                    <option value="No">No (0)</option>
                    <option value="NA">N.A.</option>
                  </select>
                  <input type="text" placeholder="Details (Treatment with soil amendments, manuring, bio fertilizers, etc.)" value={moduleII.problematicSoilsDetails} onChange={(e) => setModuleII({...moduleII, problematicSoilsDetails: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>2</td>
              </tr>
              
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#d8e8f0' }}>4) Eco Tourism/Recreational Facility</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>Area reshaped by pitching & recontouring (%)</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" step="0.01" placeholder="% Achieved" value={moduleII.ecoTourismArea} onChange={(e) => setModuleII({...moduleII, ecoTourismArea: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>2</td>
              </tr>
              
              <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#d8e8f0' }}>5) Dump Area Stabilisation</td></tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>Area covered by Geo textiles or similar techniques (Ha) (%)</td>
                <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                  <input type="number" step="0.01" placeholder="% Achieved" value={moduleII.dumpStabilization} onChange={(e) => setModuleII({...moduleII, dumpStabilization: e.target.value})} style={{ width: '100%', padding: '4px' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>5</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Module III: Social Impacts & Community Welfare</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <tbody>
            <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#e8f0e8' }}>R&R & Welfare</td></tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '4px' }}>PAP Total / % Arrangements / % Employment</td>
              <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                <input type="number" placeholder="Total PAP" value={moduleIII.papTotal} onChange={(e) => setModuleIII({...moduleIII, papTotal: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                <input type="number" placeholder="% Arrangements" value={moduleIII.papArrangements} onChange={(e) => setModuleIII({...moduleIII, papArrangements: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                <input type="number" placeholder="% Employment" value={moduleIII.papEmployment} onChange={(e) => setModuleIII({...moduleIII, papEmployment: e.target.value})} style={{ width: '100%', padding: '4px' }} />
              </td>
              <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>13</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '4px' }}>Water/Health Exp. (Proposed/Actual)</td>
              <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                <input type="number" placeholder="Water Proposed" value={moduleIII.waterExpProposed} onChange={(e) => setModuleIII({...moduleIII, waterExpProposed: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                <input type="number" placeholder="Water Actual" value={moduleIII.waterExpActual} onChange={(e) => setModuleIII({...moduleIII, waterExpActual: e.target.value})} style={{ width: '100%', padding: '4px' }} />
              </td>
              <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>9</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '4px' }}>Local Manpower % / Village Adoption / Cleanliness</td>
              <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                <input type="number" placeholder="Local Manpower %" value={moduleIII.localManpowerPercent} onChange={(e) => setModuleIII({...moduleIII, localManpowerPercent: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }} />
                <select value={moduleIII.villageAdoption} onChange={(e) => setModuleIII({...moduleIII, villageAdoption: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }}>
                  <option value="">Village Adoption</option>
                  <option value="Full">Full (10)</option>
                  <option value="No">No (0)</option>
                </select>
                <select value={moduleIII.minesCleanliness} onChange={(e) => setModuleIII({...moduleIII, minesCleanliness: e.target.value})} style={{ width: '100%', padding: '4px' }}>
                  <option value="">Cleanliness</option>
                  <option value="Excellent">Excellent (3)</option>
                  <option value="Poor">Poor (0)</option>
                </select>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>16</td>
            </tr>
          </tbody>
        </table>
        
        <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Module IV: Assurance and Reporting</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <tbody>
            <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#f0e8f0' }}>Lease Level Reporting</td></tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '4px' }}>SDF on Website / Air Quality Display / Internal Audit</td>
              <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                <select value={moduleIV.sdfWebsite} onChange={(e) => setModuleIV({...moduleIV, sdfWebsite: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }}>
                  <option value="">SDF on Website</option>
                  <option value="Yes">Yes (3)</option>
                  <option value="No">No (0)</option>
                </select>
                <select value={moduleIV.airQualityDisplay} onChange={(e) => setModuleIV({...moduleIV, airQualityDisplay: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }}>
                  <option value="">Air Quality Display</option>
                  <option value="Yes">Yes (2)</option>
                  <option value="No">No (0)</option>
                </select>
                <select value={moduleIV.internalAudit} onChange={(e) => setModuleIV({...moduleIV, internalAudit: e.target.value})} style={{ width: '100%', padding: '4px' }}>
                  <option value="">Internal Audit</option>
                  <option value="Yes">Yes (3)</option>
                  <option value="No">No (0)</option>
                </select>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>8</td>
            </tr>
            <tr><td colSpan={3} style={{ border: '1px solid #ddd', padding: '6px', fontWeight: 'bold', backgroundColor: '#f0e8f0' }}>International Standards</td></tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '4px' }}>ISO 9001 / ISO 14001 / ISO 18001 / SA 8000</td>
              <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                <select value={moduleIV.iso9001} onChange={(e) => setModuleIV({...moduleIV, iso9001: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }}>
                  <option value="">ISO 9001 (QMS)</option>
                  <option value="Yes">Yes (3)</option>
                  <option value="No">No (0)</option>
                </select>
                <select value={moduleIV.iso14001} onChange={(e) => setModuleIV({...moduleIV, iso14001: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }}>
                  <option value="">ISO 14001 (EMS)</option>
                  <option value="Yes">Yes (3)</option>
                  <option value="No">No (0)</option>
                </select>
                <select value={moduleIV.iso18001} onChange={(e) => setModuleIV({...moduleIV, iso18001: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }}>
                  <option value="">ISO 18001 (OHSAS)</option>
                  <option value="Yes">Yes (3)</option>
                  <option value="No">No (0)</option>
                </select>
                <select value={moduleIV.sa8000} onChange={(e) => setModuleIV({...moduleIV, sa8000: e.target.value})} style={{ width: '100%', padding: '4px' }}>
                  <option value="">SA 8000</option>
                  <option value="Yes">Yes (3)</option>
                  <option value="No">No (0)</option>
                </select>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>12</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '4px' }}>Energy Audit / GRI Reporting / Swachhata Report</td>
              <td style={{ border: '1px solid #ddd', padding: '4px' }}>
                <select value={moduleIV.energyAudit} onChange={(e) => setModuleIV({...moduleIV, energyAudit: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }}>
                  <option value="">Energy Audit by BES</option>
                  <option value="Yes">Yes (3)</option>
                  <option value="No">No (0)</option>
                </select>
                <select value={moduleIV.griReporting} onChange={(e) => setModuleIV({...moduleIV, griReporting: e.target.value})} style={{ width: '100%', padding: '4px', marginBottom: '4px' }}>
                  <option value="">GRI/Sustainability Reporting</option>
                  <option value="Yes">Yes (3)</option>
                  <option value="No">No (0)</option>
                </select>
                <select value={moduleIV.swachhataReport} onChange={(e) => setModuleIV({...moduleIV, swachhataReport: e.target.value})} style={{ width: '100%', padding: '4px' }}>
                  <option value="">Swachhata Report</option>
                  <option value="Yes">Yes (2)</option>
                  <option value="No">No (0)</option>
                </select>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '4px', textAlign: 'center' }}>8</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Part 3: Calculated Score */}
      <div style={{ padding: '20px', border: '2px solid #4CAF50', borderRadius: '8px', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
        <h3>Part 3 - Score Summary</h3>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          <div>
            <h4>Module I</h4>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {calculateModuleIScore().score} / {calculateModuleIScore().maxPoints}
            </div>
          </div>
          <div>
            <h4>Module II</h4>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {calculateModuleIIScore().score} / {calculateModuleIIScore().maxPoints}
            </div>
          </div>
          <div>
            <h4>Module III</h4>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {calculateModuleIIIScore().score} / {calculateModuleIIIScore().maxPoints}
            </div>
          </div>
          <div>
            <h4>Module IV</h4>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {calculateModuleIVScore().score} / {calculateModuleIVScore().maxPoints}
            </div>
          </div>
        </div>
        {leaseDetails.mineName && (
          <p style={{ marginTop: '15px', fontSize: '18px' }}>
            {leaseDetails.mineName} - {leaseDetails.minerals}
          </p>
        )}
      </div>
    </div>
  );
}
