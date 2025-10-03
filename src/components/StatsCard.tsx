import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  iconColor?: string;
}

export const StatsCard = ({ icon: Icon, label, value, iconColor = "text-primary" }: StatsCardProps) => {
  return (
    <Card className="p-4 bg-gradient-card shadow-card border-border">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-primary/10 ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </Card>
  );
};
