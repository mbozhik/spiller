export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="flex-auto mx-auto w-[60%] xl:w-[75%] sm:w-[90%]">{children}</main>
}
