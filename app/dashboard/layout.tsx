
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center mx-auto w-full h-full">
      {children}
    </section>
  );
}

