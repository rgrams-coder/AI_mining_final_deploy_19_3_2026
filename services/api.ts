const API_BASE_URL = 'http://localhost:8000';

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
