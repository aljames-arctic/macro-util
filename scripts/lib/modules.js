function moduleIsActive(name, min, max) { 
    return macroUtil.dependsOn.isActivated({id: name, min: min, max:max}); 
}

function getPath(id) {
    switch (id) {
        case 'jb2a':
            const moduleOption = moduleIsActive("jb2a_patreon") ? "jb2a_patreon" : "JB2A_DnD5e";
            return `modules/${moduleOption}/Library`;
        default:
            return '';
    }
}

export const moduleApi = { getPath };