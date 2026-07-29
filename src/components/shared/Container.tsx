import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
      {children}
    </div>
  );
}
