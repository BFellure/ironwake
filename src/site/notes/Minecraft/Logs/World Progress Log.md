---
{"dg-publish":true,"permalink":"/minecraft/logs/world-progress-log/","updated":"2026-09-23T21:48:07.706-04:00","dg-note-properties":{}}
---

<center>A project hub dedicated to tracking Minecraft builds and region planning.</center>

---
```button
name New Progress Log
type command
action Templater: Create Building Progress
class center-button
```{ #button-ty4y}


---
<font color="#4bacc6"><h2 align="center">Log History</h2></font>
```dataviewjs
// 1. Map category names back to their original emojis
const emojiMap = {
    "Resource Gathering": "📦",
    "Planning": "🗺️",
    "Building": "🏗️",
    "Exploring": "🧭",
    "Miscellaneous": "✨"
};

// 2. Helper function to format date/time nicely
function formatHumanDate(dateVal, timeVal) {
    if (!dateVal) return "";
    let dateStr = String(dateVal);
    let dateOnly = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
    let [y, m, d] = dateOnly.split("-").map(Number);
    
    let dateObj = new Date(y, m - 1, d);
    let humanDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    if (!timeVal) return humanDate;
    let timeStr = String(timeVal);
    let [h, min] = timeStr.split(":").map(Number);
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    let humanTime = h + ":" + String(min).padStart(2, '0') + " " + ampm;
    return humanDate + " at " + humanTime;
}

// 3. Fetch all pages inside the Logs folder that contain log frontmatter
let logs = dv.pages('"Logs"').where(p => p.date && p.category);

// 4. Sort newest-first based on the front matter date and time
logs = logs.sort(p => `${p.date} ${p.time || '00:00'}`, 'desc');

// 5. Render clean Obsidian callout cards with date on the same line as the title
for (let log of logs) {
    let emoji = emojiMap[log.category] || "📄";
    
    // Build the display text for the link: [Emoji] [Project or General] [Category] Log
    let projPart = (log.project && log.project !== "None (General)") ? log.project + " " : "General ";
    let linkText = emoji + " " + projPart + log.category + " Log";
    
    let fileName = log.file.name;
    let formattedDate = formatHumanDate(log.date, log.time);

    // Output callout with title and date on the exact same header line
    dv.paragraph("> [!example] **[[" + fileName + "|" + linkText + "]]** — 📅 " + formattedDate);
    dv.paragraph("");
}
```

> 



