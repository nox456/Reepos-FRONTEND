export default function foldersTree(folder, level,allFolders) {
    if (folder.insideFolders.length > 0) {
        level[folder.name] = {}
        if (folder.files.length > 0) {
            folder.files.forEach(file => {
                level[folder.name][file.name] = file
            })
        }
        for (const insideFolder of folder.insideFolders) {
            level = {...foldersTree(allFolders.find(f => f.name == insideFolder),level[folder.name],allFolders),...level}
        }
    } else {
        level[folder.name] = {}
        if (folder.files.length > 0) {
            folder.files.forEach(file => {
                level[folder.name][file.name] = file
            })
        }
        return level
    }
}
