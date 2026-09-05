export function Toast({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error' | 'info'; onClose: () => void }) {
  const colors = { success: 'bg-emerald-600', error: 'bg-red-600', info: 'bg-[#0077B6]' };
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl text-white shadow-lg ${colors[type]} animate-in slide-in-from-bottom-2`}>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="text-white/70 hover:text-white text-xs">✕</button>
    </div>
  );
}
