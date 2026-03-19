import React from 'react';

interface RefundPolicyProps {
  onClose: () => void;
}

const RefundPolicy: React.FC<RefundPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Refund Policy</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div className="space-y-4 text-gray-700">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h3 className="text-xl font-semibold mt-4">Non-Refundable Services</h3>
          <p>All registration fees and library subscription fees are non-refundable once paid, as we provide immediate access to digital services and resources.</p>
          <h3 className="text-xl font-semibold mt-4">Service Access</h3>
          <p>Upon successful payment, you will receive immediate access to the services corresponding to your subscription tier.</p>
          <h3 className="text-xl font-semibold mt-4">Account Verification</h3>
          <p>Please ensure you select the correct user category before completing your registration, as fees are non-refundable.</p>
          <h3 className="text-xl font-semibold mt-4">Contact for Issues</h3>
          <p>If you experience technical issues preventing access to paid services, please contact our support team at rajshekhar.it@gmail.com or call +917091627631.</p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
