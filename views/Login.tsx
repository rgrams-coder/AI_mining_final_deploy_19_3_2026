import React, { useState } from 'react';
import { authService } from '../authService';

interface LoginProps {
  onLoginSuccess: () => void;
}

const ROLES = [
  { value: 'Lessee', label: 'Lessee', amount: 5000 },
  { value: 'Mineral Dealers', label: 'Mineral Dealers', amount: 5000 },
  { value: 'Others', label: 'Others (Govt/PSU)', amount: 5000 },
  { value: 'Firms/Company', label: 'Firms/Company', amount: 10000 },
  { value: 'Experts', label: 'Experts', amount: 5000},
  { value: 'Students', label: 'Students', amount: 1000 },
  { value: 'Researchers', label: 'Researchers', amount: 1000 }
];

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(ROLES[0].value);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getRegistrationAmount = () => {
    return ROLES.find(r => r.value === role)?.amount || 0;
  };

  const handlePayment = async () => {
    const amount = getRegistrationAmount();
    
    try {
      const response = await fetch('https://bbgm50gbv5.execute-api.ap-south-1.amazonaws.com/Prod/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, email, name, role })
      });
      
      const order = await response.json();
      
      const options = {
        key: order.razorpay_key,
        amount: order.amount,
        currency: 'INR',
        name: 'Mines and Minerals Laws Ecosystem',
        description: `Registration Fee - ${role}`,
        order_id: order.order_id,
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch('https://bbgm50gbv5.execute-api.ap-south-1.amazonaws.com/Prod/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                email,
                name,
                password,
                role,
                amount: getRegistrationAmount()
              })
            });
            
            const result = await verifyResponse.json();
            if (result.success) {
              await authService.login(email, password);
              onLoginSuccess();
            } else {
              setError('Payment verification failed');
            }
          } catch (err: any) {
            setError(err.message || 'Payment verification failed');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name,
          email
        },
        theme: {
          color: '#4F46E5'
        }
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
      razorpay.on('payment.failed', function (response: any) {
        setError('Payment failed: ' + response.error.description);
        setLoading(false);
      });
    } catch (err: any) {
      setError(err.message || 'Payment initialization failed');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await authService.login(email, password);
        onLoginSuccess();
      } else {
        await handlePayment();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 mb-2">Mines and Minerals Laws Ecosystem</h1>
          <p className="text-gray-500">Welcome back to your mining assistant</p>
        </div>

        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${
              isLogin ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${
              !isLogin ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  required
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label} - ₹{r.amount}</option>
                  ))}
                </select>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Registration Fee:</strong> ₹{getRegistrationAmount()}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  One-time payment for platform access
                </p>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
