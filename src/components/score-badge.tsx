import { cn } from "@/lib/utils"
import { getScoreLabel, getScoreColor, getScoreBgColor } from "@/lib/scoring"

interface ScoreBadgeProps {
  score: number
  size?: "sm" | "md" | "lg"
}

export function ScoreBadge({ score, size = "md" }: ScoreBadgeProps) {
  const sizeClasses = {
    sm: "h-12 w-12 text-lg",
    md: "h-16 w-16 text-xl",
    lg: "h-24 w-24 text-3xl",
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold",
          sizeClasses[size],
          getScoreBgColor(score),
          getScoreColor(score)
        )}
      >
        {score}
      </div>
      <span className={cn("text-xs font-medium", getScoreColor(score))}>
        {getScoreLabel(score)}
      </span>
    </div>
  )
}
