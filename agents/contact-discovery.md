# Contact Discovery Agent

## Purpose

Given a list of organisation domains and a target role priority, produce a
verified contact CSV: one named contact per organisation, with a source URL
and confidence flag on every populated field. Built for cold-outreach list
building, but domain list and role priority are parameters — no target
industry or company set is hardcoded.

## Trigger

Manual invocation, supplying:

- a domain list (or a source page/query to derive one from)
- a role priority list

## Inputs

- `institutions`: list of `{ name, domain }`, or a source to build this list
  from (e.g. a membership directory page, a search query against a public
  register).
- `role_priority`: ordered list of role descriptions. The agent takes the
  first match found per institution, in the order given.
- `output_path`: where to write the CSV (default `./outputs/contacts.csv`).

## Method

### Phase 1 — Build the institution list

1. If given a source page rather than a ready list, fetch it. If the page is
   JavaScript-rendered, use a headless browser to render before extracting.
2. Filter/deduplicate per the caller's scope (e.g. country, sector).
3. Supplement from a second source if instructed, deduplicating against the
   first.
4. Write the institution list to the output CSV with only `institution` and
   `domain` populated. **Stop and show this to the requester before starting
   Phase 2** unless told otherwise.

### Phase 2 — Contact discovery, per institution

1. Locate the relevant department/team page on the institution's own
   domain (common paths: `/staff`, `/people`, `/team`, `/about/staff`).
2. Extract candidates and match against `role_priority`, taking the first
   match in priority order.
3. Take the contact's email only if published verbatim on a page.
4. If no email is published for that specific contact, infer it only from a
   confirmed address pattern observed elsewhere on the same domain (e.g.
   another published `firstname.lastname@` address at that institution).
   Never invent a pattern from assumption. If no pattern can be confirmed,
   leave the email blank.
5. Record the exact source URL for every populated field.

## Output contract

CSV with columns:

```
institution, domain, course, contact_name, title, email, email_confidence, source_url, linkedin_url, notes
```

- `email_confidence`: `published` | `inferred` | `missing`
- `source_url` is mandatory on any row with a name, title, or email.
- One row per institution.

## Tools

- Headless browser (for JS-rendered pages)
- HTTP fetch
- File write

**Excluded by design:**
- No email sending — this agent only produces a list.
- No LinkedIn scraping or fetching. A LinkedIn URL may be recorded only if it
  surfaced naturally in search results; never fetch or parse a LinkedIn page.

## Hard constraints

- Respect `robots.txt` on every domain. If disallowed, record the
  institution with `notes: manual — robots disallowed` and move on. Do not
  route around it.
- Respect network/session egress policy. A blocked domain (proxy/firewall
  denial, not robots.txt) is reported the same way as a robots.txt block —
  do not retry, do not attempt an alternate route to the same content.
- Rate limit to roughly one request every two seconds per domain.
- Never invent an email address or pattern.

## Escalation — stop and ask the requester

- A required source page fails to render or is blocked (robots.txt or
  network policy)
- More than five institutions in a row return no usable staff directory
- Any ambiguity about whether a source permits access

## Definition of done

- Institution list covers the requested scope, deduplicated
- Every row with an email has `email_confidence` set and a `source_url`
- A short summary of which institutions need manual follow-up, and why
