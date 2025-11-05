function featureSorter(app) {
    const item = app.document;
    const actor = item.parent;
    if (!actor) return;
    if (item.type !== "feat" || item.getFlag("dnd5e", "advancementOrigin")?.includes(".")) return;
    const current = item.getFlag("dnd5e", "advancementOrigin");
    const origins = actor.items.reduce((acc, i) => {
        if (!i.system.advancement?.length) return acc;
        return acc + `<option value="${i.id}" ${current === i.id ? 'selected' : ''}>${i.name}</option>`
    },"");
    const origin = `
      <div class="form-group">
        <label>Feature Origin</label>
        <div class="form-fields">
          <select name="flags.dnd5e.advancementOrigin">
            <option></option>
            ${origins}
          </select>
        </div>
      </div>
    `

    const windowContent = app.element.querySelector('.window-content');
    if (windowContent) {
        const select = windowContent.querySelector('select[name="system.type.value"]');
        if (select) {
            const formGroup = select.closest('.form-group');
            if (formGroup) {
                formGroup.insertAdjacentHTML("afterend", origin);
            }
        }
    }
}

Hooks.on("renderItemSheet5e", featureSorter);