import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SentenceInput } from "@/components/SentenceInput";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { getWordById, saveSentence, getSentenceForWord, markWordAsLearned } from "@/lib/wordStorage";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const WordDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const word = getWordById(Number(id));
  const [userSentence, setUserSentence] = useState(getSentenceForWord(Number(id)));

  useEffect(() => {
    setUserSentence(getSentenceForWord(Number(id)));
  }, [id]);

  if (!word) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Word not found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const handleSaveSentence = (sentence: string) => {
    saveSentence(word.id, word.word, sentence);
    setUserSentence(getSentenceForWord(word.id));
    toast.success("Sentence saved successfully!", {
      description: "Keep up the great work!",
    });
  };

  const handleToggleLearned = () => {
    const newLearnedState = !userSentence?.learned;
    markWordAsLearned(word.id, newLearnedState);
    setUserSentence(getSentenceForWord(word.id));
    toast.success(newLearnedState ? "Marked as learned!" : "Unmarked as learned");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Word Card */}
        <div className="bg-card rounded-2xl p-8 shadow-elevated border border-border space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h1 className="text-4xl font-bold text-primary capitalize">
                {word.word}
              </h1>
              
              {userSentence && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleLearned}
                  className={userSentence.learned ? "text-success" : "text-muted-foreground"}
                >
                  {userSentence.learned ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Learned
                    </>
                  ) : (
                    <>
                      <Circle className="w-5 h-5 mr-2" />
                      Mark as Learned
                    </>
                  )}
                </Button>
              )}
            </div>

            <p className="text-lg text-foreground leading-relaxed">
              {word.meaning}
            </p>

            <div className="pt-4 border-t border-border">
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                Example:
              </p>
              <p className="text-base italic text-foreground">
                "{word.example}"
              </p>
            </div>
          </div>
        </div>

        {/* Sentence Input */}
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <SentenceInput
            word={word.word}
            initialValue={userSentence?.sentence || ""}
            onSave={handleSaveSentence}
          />
        </div>

        {/* Previous Sentence */}
        {userSentence && (
          <div className="bg-muted/50 rounded-xl p-6 border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-2">
              Your Sentence:
            </p>
            <p className="text-foreground italic">
              "{userSentence.sentence}"
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Saved on {new Date(userSentence.date).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordDetail;
