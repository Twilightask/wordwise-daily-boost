import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WordCard } from "@/components/WordCard";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getUserSentences, getWordById } from "@/lib/wordStorage";

const Review = () => {
  const navigate = useNavigate();
  const sentences = getUserSentences();
  
  // Sort by date, newest first
  const sortedSentences = [...sentences].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                My Progress
              </h1>
              <p className="text-muted-foreground">
                {sentences.length} {sentences.length === 1 ? "word" : "words"} practiced
              </p>
            </div>
          </div>
        </div>

        {/* Words List */}
        {sortedSentences.length === 0 ? (
          <div className="bg-card rounded-2xl p-12 shadow-card border border-border text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No words practiced yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Start learning by practicing today's word!
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="bg-gradient-primary"
            >
              Get Started
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedSentences.map((sentence) => {
              const word = getWordById(sentence.wordId);
              if (!word) return null;

              return (
                <div key={sentence.wordId} className="space-y-3">
                  <WordCard
                    word={word.word}
                    meaning={word.meaning}
                    example={word.example}
                    learned={sentence.learned}
                    onClick={() => navigate(`/word/${word.id}`)}
                  />
                  
                  <div className="bg-muted/50 rounded-lg p-4 ml-4 border-l-4 border-primary">
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      Your sentence:
                    </p>
                    <p className="text-foreground italic">
                      "{sentence.sentence}"
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(sentence.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
