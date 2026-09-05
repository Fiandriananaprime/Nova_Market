export interface Seller {
    id: string;
    name: string;
    logo?: string;
    cover?: string;
    verified: boolean;
    rating: number;
    productsCount: number;
    location?: string | null;
    joinedYear?: string | null;
    followersCount: number;
    description?: string | null;
    isFollowedByCurrentUser?: boolean;
}
export type UserRole = "admin" | "seller" | "buyer";

export type status = "active" | "suspended";

export interface Address{
    id: string;
    label: string;
    fullAddress: string;
    city: string;
    phone: string;
    isDefault: boolean;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    status: status;
    avatarUrl?: string;
    joinedAt: string;
    ordersCount: number;
    addresses: Address[];
}