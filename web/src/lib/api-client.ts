

class ApiClient {
  private baseUrl: string;
  private lastReplicaId: string | null = null;
  private lastUpstreamServer: string | null = null;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private extractReplicaInfo(response: Response) {
    this.lastReplicaId = response.headers.get('X-Replica-ID');
    this.lastUpstreamServer = response.headers.get('X-Upstream-Server');
  }

  getLastReplicaId(): string | null {
    return this.lastReplicaId;
  }

  getLastUpstreamServer(): string | null {
    return this.lastUpstreamServer;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    this.extractReplicaInfo(response);
    if (!response.ok) {
      throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
    }
    return response.json();
  }
  
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    this.extractReplicaInfo(response);
    if (!response.ok) {
      throw new Error(`Error posting to ${endpoint}: ${response.statusText}`);
    }
    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.extractReplicaInfo(response);
    if (!response.ok) {
      throw new Error(`Error deleting ${endpoint}: ${response.statusText}`);
    }
    return response.json();
  }
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_URL);