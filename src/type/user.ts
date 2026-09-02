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
    id: String;
    label: String;
    fullAddress: String;
    city: String;
    phone: String;
    isDefault: Boolean;
}

export interface User {
    id: String;
    firstName: String;
    lastName: String;
    name: String;
    email: String;
    phone: String;
    role: UserRole;
    status: status;
    addresses: Address[];
}