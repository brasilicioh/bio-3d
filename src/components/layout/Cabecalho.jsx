export default function Cabecalho({ children }) {
  return (
    <header className="flex items-center justify-between border-b border-white/10 py-5">
      {children}
    </header>
  );
}
