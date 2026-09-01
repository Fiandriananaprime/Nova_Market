import { useState } from 'react';
import { Search, UserX, UserCheck } from 'lucide-react';
import { Tabs, StatusBadge, Button } from '../../components/ui';

const users = [
  { id: '1', name: 'Rakoto Andry', email: 'andry@email.com', role: 'buyer', status: 'active', joined: '2025-03-15', orders: 12 },
  { id: '2', name: 'Marie Ravelo', email: 'marie@email.com', role: 'buyer', status: 'active', joined: '2025-05-22', orders: 8 },
  { id: '3', name: 'TechStore MG', email: 'contact@techstore.mg', role: 'seller', status: 'active', joined: '2023-01-10', orders: 1240 },
  { id: '4', name: 'Jean Rabe', email: 'jean@email.com', role: 'buyer', status: 'suspended', joined: '2025-08-01', orders: 2 },
  { id: '5', name: 'Lewis Store', email: 'info@lewisstore.mg', role: 'seller', status: 'active', joined: '2022-06-15', orders: 860 },
  { id: '6', name: 'Admin User', email: 'admin@masomarket.mg', role: 'admin', status: 'active', joined: '2021-01-01', orders: 0 },
];

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  const tabs = [
    { id: 'all', label: 'All users', count: users.length },
    { id: 'buyer', label: 'Buyers', count: users.filter(u => u.role === 'buyer').length },
    { id: 'seller', label: 'Sellers', count: users.filter(u => u.role === 'seller').length },
    { id: 'admin', label: 'Admins', count: users.filter(u => u.role === 'admin').length },
  ];

  const filtered = users.filter(u => {
    if (activeTab !== 'all' && u.role !== activeTab) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatus = (user: typeof users[0]) => statuses[user.id] || user.status;

  return (
    <div>
      <h1 className="text-xl font-bold font-display text-[var(--foreground)] mb-5">User Management</h1>

      <div className="overflow-x-auto mb-4">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[var(--border)]">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[#0077B6]"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                {['User', 'Email', 'Role', 'Status', 'Joined', 'Orders', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-[var(--secondary)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: user.role === 'admin' ? '#5ABCB9' : user.role === 'seller' ? '#0077B6' : '#8da8b5' }}>
                        {user.name[0]}
                      </div>
                      <span className="font-medium text-[var(--foreground)]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${user.role === 'admin' ? 'bg-[#5ABCB9]/10 text-[#5ABCB9]' : user.role === 'seller' ? 'bg-[#0077B6]/10 text-[#0077B6]' : 'bg-[var(--secondary)] text-[var(--muted-foreground)]'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={getStatus(user)} /></td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{user.joined}</td>
                  <td className="px-4 py-3 text-[var(--foreground)]">{user.orders}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {getStatus(user) === 'active' ? (
                        <Button size="xs" variant="outline" onClick={() => setStatuses(s => ({ ...s, [user.id]: 'suspended' }))}>
                          <UserX className="w-3 h-3" />
                          Suspend
                        </Button>
                      ) : (
                        <Button size="xs" variant="accent" onClick={() => setStatuses(s => ({ ...s, [user.id]: 'active' }))}>
                          <UserCheck className="w-3 h-3" />
                          Activate
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
