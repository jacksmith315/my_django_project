import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/auth';

interface Item {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export const AdminPanel: React.FC = () => {
  const { data: items, isLoading, error } = useQuery<Item[]>({
    queryKey: ['items'],
    queryFn: async () => {
      const response = await api.get('/items/');
      return response.data;
    },
  });

  if (isLoading) return <div>Loading items...</div>;
  if (error) return <div>Error loading items</div>;

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="items-list">
        <h2>Items</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};