import Link from 'next/link'

export default function ContactsLine() {
  return (
    <div className="flex justify-center gap-16 py-1.5 tracking-[0.015em] text-white text-sm sm:text-xs bg-custom-grey">
      <Link className="hover:underline" href="https://yandex.ru/maps/-/CDfxuF7R" target="_blank">
        Алматы, Самал-2, 69
      </Link>
      <Link className="hover:underline" href="tel:+77070331117" target="_blank">
        +7 (707) 033-11-17
      </Link>
    </div>
  )
}
