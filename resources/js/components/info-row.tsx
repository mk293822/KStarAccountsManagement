// InfoRow.tsx
import { cn } from '@/lib/utils';

type InfoRowProps = {
    label: string;
    value: React.ReactNode;
    className?: string;
};

export const InfoRow = ({ label, value, className }: InfoRowProps) => {
    return (
        <div className={cn('flex justify-between', className)}>
            <span>{label}</span>
            <span className="mx-2 flex-1 translate-y-[8px] border-t-2 border-dashed" />
            <span>{value}</span>
        </div>
    );
};
