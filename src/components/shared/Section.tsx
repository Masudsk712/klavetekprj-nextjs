import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Section({ children }: Props) {
  return (
    <section className="py-20 lg:py-32">
      {children}
    </section>
  );
}