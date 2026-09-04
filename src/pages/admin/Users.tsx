import { useEffect, useState } from 'react';
import { Search, UserX, UserCheck } from 'lucide-react';
import { Tabs, StatusBadge, Button } from '../../components/ui';
import TableCard, { type Column } from '@/components/TableCard';
import { getAllUser, updateUserStatus } from '@/api/admin/user.api';
import { User, type status } from '@/type/user';

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchRequest, setSearchRequest] = useState(0);

  const [counts, setCounts] = useState({
    all: 0,
    buyer: 0,
    seller: 0,
    admin: 0,
  });
  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'User',
      render: (user) => (
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{
              background:
                user.role === 'admin'
                  ? '#5ABCB9'
                  : user.role === 'seller'
                    ? '#0077B6'
                    : '#8da8b5',
            }}
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              user.name[0]
            )}
          </div>

          <span className="font-medium text-foreground">
            {user.name}
          </span>
        </div>
      ),
    },

    {
      key: 'email',
      header: 'Email',
      className: 'text-muted-foreground',
    },

    {
      key: 'role',
      header: 'Role',
      render: (user) => (
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            user.role === 'admin'
              ? 'bg-[#5ABCB9]/10 text-[#5ABCB9]'
              : user.role === 'seller'
                ? 'bg-[#0077B6]/10 text-[#0077B6]'
                : 'bg-secondary text-muted-foreground'
          }`}
        >
          {user.role}
        </span>
      ),
    },

    {
      key: 'status',
      header: 'Status',
      render: (user) => (
        <StatusBadge status={user.status} />
      ),
    },

    {
      key: 'joinedAt',
      header: 'Joined',
      className: 'text-muted-foreground',
    },

    {
      key: 'ordersCount',
      header: 'Orders',
      className: 'text-foreground',
      render: (user) => String(user.ordersCount ?? 0),
    },

    {
      key: 'actions',
      header: 'Actions',
      render: (user) => (
        <div className="flex gap-1">
          {user.status === 'active' ? (
            <Button
              size="xs"
              variant="outline"
              onClick={() => handleStatusChange(user)}
            >
              <UserX className="w-3 h-3" />
              Suspend
            </Button>
          ) : (
            <Button
              size="xs"
              variant="accent"
              onClick={() => handleStatusChange(user)}
            >
              <UserCheck className="w-3 h-3" />
              Activate
            </Button>
          )}
        </div>
      ),
    },
  ];

  const tabs = [
    {
      id: 'all',
      label: 'All users',
      count: counts.all,
    },
    {
      id: 'buyer',
      label: 'Buyers',
      count: counts.buyer,
    },
    {
      id: 'seller',
      label: 'Sellers',
      count: counts.seller,
    },
    {
      id: 'admin',
      label: 'Admins',
      count: counts.admin,
    },
  ];

  const handleStatusChange = async (user: User) => {
    const newStatus: status = user.status === 'active' ? 'suspended' : 'active';

    try {
      const updatedUser = await updateUserStatus(user.id, newStatus);
      setUsers((currentUsers) =>
        currentUsers.map((currentUser) =>
          currentUser.id === user.id
            ? { ...currentUser, status: updatedUser.status }
            : currentUser,
        ),
      );
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser({
          page,
          limit: 20,
          role: activeTab !== 'all' ? (activeTab as User['role']) : undefined,
          search: search || undefined,
        });
        setCounts(response.counts);
        setUsers(response.data);
        setTotalPages(response.meta.totalPages?? 1);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [page, activeTab, search, searchRequest]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
    setSearchRequest((request) => request + 1);
  };

  return (
    <div>
      <h1 className="text-xl font-bold font-display text-foreground mb-5">
        User Management
      </h1>

      <div className="overflow-x-auto mb-4">
        <Tabs
          tabs={tabs}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <form
            onSubmit={handleSearch}
            className="flex items-center max-w-xs w-[300px]"
          >
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search users..."
              className=" pl-9 pr-4 py-2 text-sm bg-secondary border border-border rounded-l-lg text-foreground focus:outline-none focus:border-[#0077B6]"
            />
            <button
              type="submit"
              className="h-9 w-9 flex items-center justify-center bg-foreground rounded-r-lg border border-foreground">
              <Search className="w-4 h-4 text-white" />
            </button>
          </form>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Page précédente"
            >
              −
            </button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Page suivante"
            >
              +
            </button>
          </div>
        </div>

        <TableCard
          title=""
          data={users}
          columns={columns}
          rowKey={(user) => user.id}
          rowHref={(user) => `/admin/users/${user.id}`}
          className="border-0 rounded-none"
        />
      </div>
    </div>
  );
}

