import Link from 'next/link'

export default function ContactsLine() {
  return (
    <div className="flex justify-center gap-16 py-2 text-base text-white xl:text-sm sm:text-xs bg-custom-grey">
      <Link className="hover:underline" href="https://yandex.ru/maps/-/CDeKmOne" target="_blank">
        Алматы, Самал-2, 69
      </Link>
      <Link className="hover:underline" href="tel:+77070331117" target="_blank">
        +7 (707) 033-11-17
      </Link>
    </div>
  )
}
