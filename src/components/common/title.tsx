import { type PropsWithChildren } from "react";

export const Title = ({ children }: PropsWithChildren) => (
  <h2 className="group relative w-fit my-8 font-bold text-2xl sm:text-3xl animate-leftslide">
    {children}
    <span className="absolute left-0 -bottom-2 w-[calc(100%+2rem)] h-1 rounded-full bg-sky-800 dark:bg-sky-200 group-hover:scale-x-125 origin-left transition-transform" />
  </h2>
);
