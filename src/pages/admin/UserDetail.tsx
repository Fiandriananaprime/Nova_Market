import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  UserX,
  UserCheck,
  Loader2,
} from 'lucide-react';

import { Button, StatusBadge } from '../../components/ui';
import {
  getUserById,
  updateUserStatus,
} from '@/api/admin/user.api';
import { User, Address } from '@/type/user';

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const data = await getUserById(id);

        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleStatusChange = async () => {
    if (!user) return;

    const newStatus =
      user.status === 'active'
        ? 'suspended'
        : 'active';

    try {
      setUpdatingStatus(true);

      const updatedUser = await updateUserStatus(
        user.id,
        newStatus
      );

      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user status:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-[#0077B6]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-lg font-semibold text-foreground">
          User not found
        </h2>

        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate('/admin/users')}
        >
          Back to users
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* Back */}
      <Link
        to="/admin/users"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to users
      </Link>

      {/* Profile header */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

          <div className="flex items-center gap-4">

            {/* Avatar */}
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${
                  user.role === 'admin'
                    ? 'bg-[#5ABCB9]'
                    : user.role === 'seller'
                      ? 'bg-[#0077B6]'
                      : 'bg-[#8da8b5]'
                }`}
              >
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </div>
            )}

            <div>
              <h1 className="text-xl font-bold font-display text-foreground">
                {user.name}
              </h1>

              <p className="text-sm text-muted-foreground">
                {user.email}
              </p>

              <div className="flex items-center gap-2 mt-2">
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

                <StatusBadge status={user.status} />
              </div>
            </div>
          </div>

          {/* Main action */}
          <Button
            variant={
              user.status === 'active'
                ? 'outline'
                : 'accent'
            }
            onClick={handleStatusChange}
            disabled={updatingStatus}
          >
            {updatingStatus ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : user.status === 'active' ? (
              <>
                <UserX className="w-4 h-4" />
                Suspend user
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                Activate user
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Account information */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">

          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-semibold font-display text-foreground">
              Account information
            </h2>
          </div>

          <div className="p-5 space-y-4">

            <InfoRow
              label="First name"
              value={user.firstName}
            />

            <InfoRow
              label="Last name"
              value={user.lastName}
            />

            <InfoRow
              label="Email"
              value={user.email}
              icon={<Mail className="w-4 h-4" />}
            />

            <InfoRow
              label="Phone"
              value={user.phone || 'Not provided'}
              icon={<Phone className="w-4 h-4" />}
            />

            <InfoRow
              label="Role"
              value={user.role}
            />

            <InfoRow
              label="Status"
              value={
                <StatusBadge status={user.status} />
              }
            />
          </div>
        </div>

        {/* Activity */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">

          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-semibold font-display text-foreground">
              Activity
            </h2>
          </div>

          <div className="p-5 space-y-5">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0077B6]/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#0077B6]" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Orders
                </p>

                <p className="font-semibold text-foreground">
                  {user.ordersCount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Member since
                </p>

                <p className="font-semibold text-foreground">
                  {formatDate(user.joinedAt)}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">

        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold font-display text-foreground">
            Addresses
          </h2>
        </div>

        {user.addresses?.length > 0 ? (
          <div className="divide-y divide-border">
            {user.addresses.map((address) => (
              <div
                key={address.id}
                className="p-5 flex items-start justify-between gap-4"
              >
                <div className="flex gap-3">

                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">
                        {address.label}
                      </p>

                      {address.isDefault && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#0077B6]/10 text-[#0077B6]">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mt-1">
                      {address.fullAddress}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {address.city}
                    </p>

                    {address.phone && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {address.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-5 text-sm text-muted-foreground">
            No address registered.
          </div>
        )}
      </div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}

function InfoRow({
  label,
  value,
  icon,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </div>

      <div className="text-sm font-medium text-foreground text-right">
        {value}
      </div>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}
