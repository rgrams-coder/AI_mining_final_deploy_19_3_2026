const API_URL = 'http://localhost:8000/api';

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Login failed' }));
        throw new Error(error.detail || 'Login failed');
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (error: any) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Cannot connect to server. Make sure backend is running on port 8000');
      }
      throw error;
    }
  },

  async register(name: string, email: string, password: string, role: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Registration failed' }));
        throw new Error(error.detail || 'Registration failed');
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (error: any) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Cannot connect to server. Make sure backend is running on port 8000');
      }
      throw error;
    }
  },

  async logout(): Promise<void> {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(`${API_URL}/logout`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
        });
      } catch {
        // Ignore errors on logout
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async verifySession(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const response = await fetch(`${API_URL}/verify`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  async getProfile(): Promise<any> {
    const token = this.getToken();
    if (!token) throw new Error('Not authenticated');
    
    const response = await fetch(`${API_URL}/profile`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  async updateProfile(profile: any): Promise<any> {
    const token = this.getToken();
    if (!token) throw new Error('Not authenticated');
    
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profile),
    });
    
    if (!response.ok) throw new Error('Failed to update profile');
    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }
};
