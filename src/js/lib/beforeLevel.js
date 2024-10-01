export default function beforeLevel(level,folder,levelName) {
    const folders = Object.keys(level).filter(k => !k.includes("."))
    if (folders.length == 0) {
        return false
    } else {
        for (const f of folders) {
            if (f == folder) {
                return { content: level, name: levelName }
            } else {
                if (beforeLevel(level[f],folder,f)) {
                    return beforeLevel(level[f],folder,f)
                }
            }
        }
    }
}
