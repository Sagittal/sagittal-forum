const FILE = "staffCode.js"
const REMOTE_FILE = `public_html/sagittal/forum/assets/javascript/${FILE}`
const TMP_FILE = `/tmp/${FILE}`
const LOCAL_FILE = `./dist/${FILE}`

const TMP_VERSION_FILE = "./tmp/staffCodeVersion.txt"

export {
    REMOTE_FILE,
    TMP_FILE,
    LOCAL_FILE,
    TMP_VERSION_FILE,
}
