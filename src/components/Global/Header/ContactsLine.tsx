import {footerData} from '#/Global/Footer'

import Link from 'next/link'

export default function ContactsLine() {
  return (
    <div className="flex justify-center gap-16 py-1.5 tracking-[0.015em] text-white text-sm sm:text-xs bg-custom-grey">
      <Link className="hover:underline" href={footerData.contacts.address.url} target="_blank">
        {footerData.contacts.address.text}
      </Link>
      <Link className="hover:underline" href={footerData.contacts.phone.url} target="_blank">
        {footerData.contacts.phone.text}
      </Link>
    </div>
  )
}
