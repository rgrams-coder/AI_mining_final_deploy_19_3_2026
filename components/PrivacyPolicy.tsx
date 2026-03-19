import React from 'react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Privacy Policy</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div className="space-y-4 text-gray-700">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h3 className="text-xl font-semibold mt-4">Information We Collect</h3>
          <p>We collect information you provide directly to us, including name, email address, and other contact information when you register or use our services.</p>
          <h3 className="text-xl font-semibold mt-4">How We Use Your Information</h3>
          <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
          <h3 className="text-xl font-semibold mt-4">Data Security</h3>
          <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
          <h3 className="text-xl font-semibold mt-4">Contact Us</h3>
          <p>If you have questions about this Privacy Policy, please contact us at rajshekhar.it@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
