export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-col flex items-center justify-center">
      <main>{children}</main>
    </div>
  );
}
