# Sanity Clean Content Studio

## Submissions

Submissions are server-created in the existing `production` dataset as `submission` documents with IDs in the `submissions.<uuid>` namespace. Sanity treats document IDs containing a dot as private IDs: they are excluded from the published perspective used for public content delivery. Authenticated Studio users with read access to this dataset can inspect them in the **Submissions** pane. Dataset permissions still control which authenticated users can read the records.

The pane only lists `_type == "submission" && _id in path("submissions.*")`. The Studio hides submission creation templates and actions, and the schema is read-only. Notification status `accepted` means Resend accepted the request; it does not confirm that the message was delivered.

Congratulations, you have now installed the Sanity Content Studio, an open source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
