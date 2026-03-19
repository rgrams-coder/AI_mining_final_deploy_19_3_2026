import React from 'react';

interface TermsOfServiceProps {
  onClose: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Terms of Service</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div className="space-y-4 text-gray-700">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h3 className="text-xl font-semibold mt-4">Acceptance of Terms</h3>
          <p>By accessing and using this platform, you accept and agree to be bound by the terms and provision of this agreement.</p>
          <h3 className="text-xl font-semibold mt-4">Use License</h3>
          <p>Permission is granted to access and use the materials on this platform for personal, non-commercial use only.</p>
          <h3 className="text-xl font-semibold mt-4">User Responsibilities</h3>
          <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account.</p>
          <h3 className="text-xl font-semibold mt-4">Limitation of Liability</h3>
          <p>We shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
