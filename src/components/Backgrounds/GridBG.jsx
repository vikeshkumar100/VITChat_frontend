import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "../magicui/animated-grid-pattern";

export function AnimatedGridPatternDemo() {
  return (
    <div className="h-screen w-full items-center justify-center overflow-hidden rounded-lg bg-background">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.2}
        duration={2}
        repeatDelay={0.5}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-[100%] skew-y-12",
        )}
      />
    </div>
  );
}
