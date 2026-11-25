import {defineField, defineType} from 'sanity'

export const submission = defineType({
  name: 'submission',
  title: 'Submissions',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({name: 'kind', title: 'Submission type', type: 'string'}),
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({name: 'message', title: 'Message', type: 'text'}),
    defineField({name: 'cosmetologist', title: 'Cosmetologist', type: 'boolean'}),
    defineField({name: 'naming', title: 'Business name', type: 'string'}),
    defineField({name: 'city', title: 'City', type: 'string'}),
    defineField({name: 'businessType', title: 'Business type', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Order items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'article', title: 'Article', type: 'number'}),
            defineField({name: 'name', title: 'Product', type: 'string'}),
            defineField({name: 'quantity', title: 'Quantity', type: 'number'}),
            defineField({name: 'price', title: 'Price', type: 'number'}),
            defineField({name: 'discount_price', title: 'Discount price', type: 'number'}),
          ],
        },
      ],
    }),
    defineField({name: 'promoCode', title: 'Promo code', type: 'string'}),
    defineField({name: 'promoDetails', title: 'Promo details', type: 'string'}),
    defineField({name: 'total', title: 'Total', type: 'number'}),
    defineField({
      name: 'notificationStatus',
      title: 'Notification status',
      type: 'string',
      description:
        'Accepted means Resend accepted the notification request; it does not guarantee delivery.',
      options: {list: ['pending', 'accepted', 'failed']},
    }),
    defineField({name: 'notificationId', title: 'Notification ID', type: 'string'}),
    defineField({name: 'notificationError', title: 'Notification error', type: 'text'}),
    defineField({name: 'notificationUpdatedAt', title: 'Notification updated', type: 'datetime'}),
    defineField({name: 'requestHash', type: 'string', hidden: true}),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      kind: 'kind',
      notificationStatus: 'notificationStatus',
      createdAt: '_createdAt',
      city: 'city',
      total: 'total',
    },
    prepare({name, email, kind, notificationStatus, createdAt, city, total}) {
      const typeLabel =
        kind === 'contact'
          ? 'Contact'
          : kind === 'partnership'
            ? 'Partnership'
            : kind === 'order'
              ? 'Order'
              : 'Submission'
      const time = createdAt ? new Date(createdAt).toLocaleString() : 'Time unknown'
      const details = [name, email, city, total !== undefined ? `Total ${total}` : undefined]
        .filter(Boolean)
        .join(' · ')

      return {
        title: `${typeLabel} · ${notificationStatus || 'status unknown'}`,
        subtitle: [time, details].filter(Boolean).join(' · '),
      }
    },
  },
})
