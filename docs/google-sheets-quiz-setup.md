# Google Sheets — Quiz Submission Setup

Every time someone finishes the `/quiz`, the app POSTs the full submission to
`/api/quiz/submit`, which forwards it to a Google Apps Script web-app webhook.
The script appends a row to a Google Sheet.

If `QUIZ_WEBHOOK_URL` isn't set, the API route logs the payload server-side and
returns success — the site still works end-to-end without Sheets connected.

---

## 1. Create the Google Sheet

1. Create a new Google Sheet — name it whatever you want (e.g. `0to1 Quiz Submissions`).
2. In **row 1**, paste these exact column headers across columns A–Z:

```
Timestamp | First Name | Last Name | Email | Business Type | Team Size | Primary Role | Communication | Info Storage | Business Tools | Work Devices | Work Environment | AI Usage | AI Use Cases | AI Comfort | Friction Points | AI Goal | AI Maturity Score | Systems Score | Quiz Type | Type Label | Insight 1 | Insight 2 | Action 1 | Action 2 | Open Text Responses
```

(Use tab-separated paste, or type each header into a single column.)

## 2. Add the Apps Script

1. From the Sheet, go to **Extensions → Apps Script**.
2. Delete the boilerplate `myFunction` and paste:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  // Helper to get selected values as comma-separated string
  const sel = (qId) => (data.answers[qId]?.selected || []).join(", ");

  // Collect all open text responses
  const openTexts = Object.entries(data.answers)
    .filter(([_, v]) => v.openText)
    .map(([k, v]) => `${k}: ${v.openText}`)
    .join(" | ");

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.firstName || "",
    data.lastName || "",
    data.email || "",
    sel("business_type"),
    sel("team_size"),
    sel("primary_role"),
    sel("communication"),
    sel("info_storage"),
    sel("business_tools"),
    sel("work_devices"),
    sel("work_environment"),
    sel("ai_usage"),
    sel("ai_use_cases"),
    sel("ai_comfort"),
    sel("friction"),
    sel("ai_goal"),
    data.scores?.aiMaturity || "",
    data.scores?.systemsMaturity || "",
    data.type || "",
    data.typeLabel || "",
    data.insights?.[0] || "",
    data.insights?.[1] || "",
    data.actions?.[0] || "",
    data.actions?.[1] || "",
    openTexts,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Save the project (give it any name, e.g. `0to1 Quiz Ingest`).

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Type: **Web app**.
3. Configure:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**. Authorize the script when prompted.
5. Copy the **Web app URL** — it looks like
   `https://script.google.com/macros/s/AKfycbx.../exec`.

> **Heads up:** Every time you edit the script, use **Deploy → Manage deployments
> → ✏️ edit → New version → Deploy** to push changes to the live URL. Creating a
> "new deployment" each time gives you a new URL and is almost never what you want.

## 4. Wire it up in the app

Add the URL to `.env.local` (create the file if needed) at the project root:

```
QUIZ_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

Restart the dev server (or redeploy) so the new env var is picked up.

## 5. Test it

1. Open the site and go to `/quiz`.
2. Enter a test name + email on the intro screen.
3. Complete the quiz.
4. Open the Google Sheet — a new row should appear within a second or two.
5. Email capture on the results page also posts a second row with the captured email.

## Notes

- The API route `src/app/api/quiz/submit/route.ts` silently swallows webhook errors
  so a broken Sheet never breaks the user's experience. Check server logs if you
  expected a row but don't see one.
- Duplicate rows by design: one on completion, one if the user enters an email on
  the results page. De-dupe in Sheets if needed (sort by email + keep the row with
  the non-empty email value).
- Apps Script web apps have daily quotas — more than enough for normal traffic.
