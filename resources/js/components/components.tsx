// InfoRow.tsx
import { cn } from '@/lib/utils';

type InfoRowProps = {
    label: string;
    value: React.ReactNode;
    className?: string;
};

export const InfoRow = ({ label, value, className }: InfoRowProps) => {
    return (
        <div className={cn('flex justify-between text-sm', className)}>
            <span>{label}</span>
            <span className="mx-2 flex-1 translate-y-[12px] border-t-2 border-dashed" />
            <span>{value}</span>
        </div>
    );
};

// components/SectionHeader.tsx
export const SectionHeader = ({ title }: { title: string }) => (
    <h3 className="mb-3 border-b border-zinc-800 pb-1 text-base font-semibold text-zinc-500">{title}</h3>
);

export const Info = ({ label, value }: { label: string; value: string | number }) => (
    <div>
        <div className="text-xs text-zinc-400">{label}</div>
        <div className="text-sm font-medium text-white">{value}</div>
    </div>
);

export const Flag = ({ label, value }: { label: string; value: boolean }) => (
    <div
        className={`max-h-6 rounded-full px-3 py-1 text-xs font-semibold text-white shadow ${value ? 'bg-green-600' : 'bg-red-600/70 text-gray-300'}`}
    >
        {label}: {value ? 'Yes' : 'No'}
    </div>
);

export const SectionCard = ({ children, color = 'zinc' }: { children: React.ReactNode; color?: 'red' | 'green' | 'zinc' }) => {
    const borderColor = {
        red: 'border-red-400 bg-red-950',
        green: 'border-green-400 bg-green-950',
        zinc: 'border-zinc-700 bg-zinc-900',
    }[color];

    return <div className={`space-y-2 rounded border p-4 ${borderColor}`}>{children}</div>;
};
