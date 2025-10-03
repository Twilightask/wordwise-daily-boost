import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface WordCardProps {
  word: string;
  meaning: string;
  example?: string;
  learned?: boolean;
  onClick?: () => void;
}

export const WordCard = ({ word, meaning, example, learned, onClick }: WordCardProps) => {
  return (
    <Card 
      className="p-6 bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer border-border relative overflow-hidden group"
      onClick={onClick}
    >
      {learned && (
        <Badge className="absolute top-4 right-4 bg-success">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Learned
        </Badge>
      )}
      
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-primary capitalize group-hover:text-primary-glow transition-colors">
          {word}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {meaning}
        </p>
        
        {example && (
          <div className="pt-3 border-t border-border">
            <p className="text-sm italic text-foreground/80">
              "{example}"
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
