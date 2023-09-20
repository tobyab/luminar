export function H1({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <h1 className={`text-xl font-medium ${className}`}>{children}</h1>;
}

export function P({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={`text-md ${className}`}>{children}</p>;
}

export function S({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={`text-sm text-gray-400 ${className}`}>{children}</p>;
}
