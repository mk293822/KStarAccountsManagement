import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const StatCard = ({ title, value, price, priceLabel }: { title: string; value: number; price?: number, priceLabel?: string }) => {
    return (
        <Card className="y-4 flex flex-col justify-between gap-2 border border-muted shadow-md">
            <CardHeader className="flex flex-col">
                <CardDescription className="text-sm text-muted-foreground">{title}</CardDescription>
                <CardTitle className="text-2xl font-bold text-foreground">{value.toLocaleString()}</CardTitle>
            </CardHeader>
            {price !== undefined && (
                <CardContent className="pt-2">
                    <div className="rounded-md bg-muted/50 p-2">
                        <span className="text-sm text-muted-foreground">{priceLabel}: </span>
                        <span className="font-medium text-foreground">$ {price.toLocaleString()}</span>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};

export default StatCard;
