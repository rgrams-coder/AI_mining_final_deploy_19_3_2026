import { authService } from './authService';

const API_URL = 'http://localhost:8000/api';

export interface Ebook {
  id: string;
  title: string;
  category: string;
  description: string;
  author: string;
  fileUrl: string;
  coverUrl?: string;
  requiresSubscription: boolean;
  requiredPlan: string;
  hasAccess?: boolean;
}

export const libraryService = {
  async uploadFile(file: File): Promise<string> {
    const token = authService.getToken();
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload file');
    const data = await response.json();
    return data.url;
  },

  async getEbooks(category?: string): Promise<Ebook[]> {
    const token = authService.getToken();
    const url = category ? `${API_URL}/ebooks?category=${category}` : `${API_URL}/ebooks`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch ebooks');
    return response.json();
  },

  async getEbook(id: string): Promise<Ebook> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/ebooks/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch ebook');
    return response.json();
  },

  async createEbook(ebook: Omit<Ebook, 'id'>): Promise<Ebook> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/admin/ebooks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(ebook),
    });
    if (!response.ok) throw new Error('Failed to create ebook');
    return response.json();
  },

  async updateEbook(id: string, updates: Partial<Ebook>): Promise<Ebook> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/admin/ebooks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update ebook');
    return response.json();
  },

  async deleteEbook(id: string): Promise<void> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/admin/ebooks/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to delete ebook');
  },

  async getMyLibrary(): Promise<Ebook[]> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/my-library`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch library');
    return response.json();
  },

  async updateSubscription(plan: string): Promise<void> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/profile/subscription?plan=${plan}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to update subscription');
  }
};
