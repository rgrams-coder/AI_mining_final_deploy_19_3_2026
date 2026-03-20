const API_BASE_URL = 'https://bbgm50gbv5.execute-api.ap-south-1.amazonaws.com/Prod';

export const apiService = {
  async submitContact(formData: { name: string; email: string; message: string }) {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }

    return response.json();
  },
};
