import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Sparkles } from "lucide-react";
import { z } from "zod";

const sentenceSchema = z.object({
  sentence: z.string()
    .trim()
    .min(1, { message: "Sentence cannot be empty" })
    .max(500, { message: "Sentence must be less than 500 characters" }),
});

interface SentenceInputProps {
  word: string;
  initialValue?: string;
  onSave: (sentence: string) => void;
}

export const SentenceInput = ({ word, initialValue = "", onSave }: SentenceInputProps) => {
  const [sentence, setSentence] = useState(initialValue);
  const [error, setError] = useState("");

  const handleSave = () => {
    setError("");
    
    const result = sentenceSchema.safeParse({ sentence });
    
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    onSave(result.data.sentence);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Sparkles className="w-4 h-4 text-accent" />
        <span>Write your own sentence using "{word}"</span>
      </div>
      
      <Textarea
        value={sentence}
        onChange={(e) => {
          setSentence(e.target.value);
          setError("");
        }}
        placeholder={`Example: "I learned the word ${word} today and..."`}
        className="min-h-[120px] resize-none border-input focus:border-primary"
        maxLength={500}
      />
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {sentence.length}/500 characters
        </span>
        
        <Button 
          onClick={handleSave}
          className="bg-gradient-primary hover:opacity-90 transition-opacity"
          disabled={!sentence.trim()}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Sentence
        </Button>
      </div>
    </div>
  );
};
