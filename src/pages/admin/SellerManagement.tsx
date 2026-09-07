import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Store } from 'lucide-react';
import { getAdminStores, AdminStore } from '@/api/admin/store.api';

const SellerManagement = () => {
    const [stores, setStores] = useState<AdminStore[]>([]);

    useEffect(() => {
        getAdminStores().then((response) => setStores(response.data)).catch(() => setStores([]));
    }, []);

    return (
        <div className="space-y-5">
            <h1 className="text-xl font-bold font-display text-foreground">Stores</h1>
            <div className="bg-card border border-border rounded-xl divide-y divide-border">
                {stores.map((store) => (
                    <Link key={store.id} to={`/stores/${store.id}`} className="p-4 flex items-center gap-3 hover:bg-secondary/40">
                        {store.logo ? <img src={store.logo} alt="" className="w-10 h-10 rounded-lg object-cover" /> : <Store className="w-10 h-10 p-2 rounded-lg bg-secondary text-muted-foreground" />}
                        <div>
                            <p className="font-medium text-foreground">{store.name}</p>
                            <p className="text-sm text-muted-foreground">{store.location || 'No location'}</p>
                        </div>
                    </Link>
                ))}
                {!stores.length && <p className="p-5 text-sm text-muted-foreground">No stores found.</p>}
            </div>
        </div>
    );
}
export default SellerManagement;