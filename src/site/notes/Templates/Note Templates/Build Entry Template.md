---
{"dg-publish":true,"permalink":"/templates/note-templates/build-entry-template/","updated":"2026-09-11T01:06:30.572-04:00","dg-note-properties":{"dimension":"<% await tp.user.getDimension(tp) %>","region":"<% await tp.user.getRegion(tp) %>","x_coordinate":"<% (await tp.system.prompt('X Coordinate:')) || \"\" %>","y_coordinate":"<% (await tp.system.prompt('Y Coordinate:')) || \"\" %>","z_coordinate":"<% (await tp.system.prompt('Z Coordinate:')) || \"\" %>","start_date":"<% await tp.user.getStartDate(tp) %>","finish_date":"<% await tp.user.getFinishDate(tp) %>","building_type":"<% await tp.user.getType(tp) %>","builders":"<% await tp.user.getBuilders(tp) %>"}}
---

***

<h1 style="text-align: center;"><%* 
  let buildName = await tp.system.prompt("Insert Build Name:");
  if (buildName && buildName.trim() !== "") {
    await tp.file.rename(buildName.trim());
    tR += buildName.trim();
  } else {
    tR += tp.file.title;
  }
-%></h1>

---

> [!tip]+ Image
> <% await tp.user.getImage(tp) %>


---
|  |  |
|---|---|
| **Dimension** |  |
| **Location** |  |
| **Coordinates** | , ,  |
| **Start Date** |  |
| **Finish Date** |  |
| **Building Type** |  |
| **Builder(s)** |  |
---
## <div style="text-align: center;">Overview</div>

---
[[Templates/AI Prompt Templates/Build Entry Template Prompt\|DELETE LINE AFTER USE: BUILD ENTRY TEMPLATE AI PROMPT]]
[Paste Overview Description Herer]

---
## <div style="text-align: center;">Purpose</div>

---

[Paste Purpose Description Here]

---
## <div style="text-align: center;">Design</div>

---

[Paste Design Description Here]

---
## <div style="text-align: center;">Lore</div>

---

[Paste Lore Description Here]

---
## <div style="text-align: center;">Features</div>

---

[Paste Feature Description Here]

---
## <div style="text-align: center;">Notes</div>

---

[Paste Notes Description Here]

---



> Last Updated: 09-11-2026 01:06 AM

