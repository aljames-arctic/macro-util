function featureSorter(app, [html]) {
    const actor = app.object.parent;
    if (!actor) return;
    if (app.object.type !== "feat" || app.object?.getFlag("dnd5e", "advancementOrigin")?.includes(".")) return;
    const current = app.object?.getFlag("dnd5e", "advancementOrigin");
    const origins = actor.items.reduce((acc, i) => {
        if (!i.system.advancement) return acc;
        return acc + `<option value="${i.id}" ${current === i.id ? 'selected' : ''}>${app.object.parent.items.get(i.id).name}</option>`
    },"");
    const origin = `
      <div class="form-group">
        <label>Feature Origin</label>
        <select name="flags.dnd5e.advancementOrigin">
          <option></option>
          ${origins}
        </select>
      </div>
    `
    const type = html.querySelector('.form-group:has(select[name="system.type.subtype"])') ??
                 html.querySelector('.form-group:has(select[name="system.type.value"])');
    type.insertAdjacentHTML("afterend", origin);
}

Hooks.on("renderItemSheet5e", featureSorter);