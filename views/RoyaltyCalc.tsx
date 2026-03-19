   
import React, { useState, useEffect } from 'react';

const RoyaltyCalc: React.FC = () => {
  const [minerals, setMinerals] = useState<Array<{name: string, quality: string, royaltyRate: number, unit: string}>>([]);
  const [selectedMineral, setSelectedMineral] = useState<string>('');
  const [selectedQuality, setSelectedQuality] = useState<string>('');
  const [royaltyRate, setRoyaltyRate] = useState<number>(0);
  const [unit, setUnit] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1000);
  const [area, setArea] = useState<number>(10);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/minerals')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched minerals:', data);
        setMinerals(data);
        if (data.length > 0) {
          setSelectedMineral(data[0].name);
          setSelectedQuality(data[0].quality);
          setRoyaltyRate(data[0].royaltyRate);
          setUnit(data[0].unit);
        }
      })
      .catch(err => console.error('Error fetching minerals:', err));
  }, []);

  const handleMineralChange = (index: number) => {
    const mineral = minerals[index];
    if (mineral) {
      setSelectedMineral(mineral.name);
      setSelectedQuality(mineral.quality);
      setRoyaltyRate(mineral.royaltyRate);
      setUnit(mineral.unit);
    }
  };

  const calculateRoyalty = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/calculate-royalty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ royaltyRate, quantity, area })
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error calculating royalty:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (royaltyRate > 0) calculateRoyalty();
  }, [royaltyRate, quantity, area]);

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Royalty Calculator</h2>
        <p className="text-gray-500">Rent,Royalty,Fees & other sum due to the Government Calculator</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Mineral & Quality</label>
            <select
              value={minerals.findIndex(m => m.name === selectedMineral && m.quality === selectedQuality)}
              onChange={(e) => handleMineralChange(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              {minerals.map((m, idx) => (
                <option key={idx} value={idx}>{m.name} - {m.quality}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Royalty Rate (₹/{unit})</label>
            <input
              type="number"
              value={royaltyRate}
              readOnly
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 cursor-not-allowed"
            />
          </div>
          <InputGroup label={`Quantity (${unit})`} value={quantity} onChange={setQuantity} min={0} />
          <InputGroup label="Area (hectares)" value={area} onChange={setArea} min={0} step={0.01} />
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : results ? (
            <>
              <ResultCard label="Royalty" value={results.royalty} prefix="₹" />
              <ResultCard label="Dead Rent (Quarterly)" value={results.deadRent} prefix="₹" />
              <ResultCard label="DMFT (30%)" value={results.dmft} prefix="₹" />
              <ResultCard label="Interest (Monthly)" value={results.interest} prefix="₹" />
              <ResultCard label="NMET (2%)" value={results.nmet} prefix="₹" />
              <ResultCard label="IT Cess (2%)" value={results.itCess} prefix="₹" />
              <ResultCard label="Management Fee" value={results.managementFee} prefix="₹" />
              <ResultCard label="Environment Cess (2%)" value={results.environmentCess} prefix="₹" />
              <div className="pt-4 border-t-2 border-gray-300">
                <ResultCard label="Total Demand" value={results.totalDemand} prefix="₹" large color="text-emerald-600" />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
      {...props}
    />
  </div>
);

const ResultCard = ({ label, value, prefix, color = 'text-gray-900', large = false }: any) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
    <span className="text-sm font-medium text-gray-500">{label}</span>
    <span className={`${color} ${large ? 'text-2xl font-black' : 'text-lg font-bold'}`}>
      {prefix}{value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  </div>
);

export default RoyaltyCalc;
