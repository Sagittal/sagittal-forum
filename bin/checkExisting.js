const fs = require("fs")
const {Client} = require("ssh2")
const secrets = require("../.secrets.json")

const sshOpt = {...secrets, port: 26, host: "dkeenan.com"}
const remoteFile = "public_html/sagittal/forum/assets/javascript/staffCode.js"
const tmpFile = "/tmp/staffCode.js"

const compareFiles = () => {
    const tmpCopiedFromRemote = fs.readFileSync("/tmp/staffCode.js")
    const previouslyCompiled = fs.readFileSync("dist/staffCode.js")

    if (tmpCopiedFromRemote !== previouslyCompiled) {
        // TODO: need a -f (force) or something...
        throw new Error("The Sagittal Forum's staffCode.js file has diverged from the most recent previously compiled version. Please review /tmp/staffCode.js, a just-nabbed local backup of the Forum's current version, before proceeding.")
    } else {
        console.warn("\n\nThe Sagittal Forum's staffCode.js file matches the most recent previously compiled version. We are go for launch.\n\n")
    }
}

const conn = new Client()
conn.on("ready", () => {
    conn.sftp((err, sftp) => {
        if (err) throw err

        sftp.fastGet(
            remoteFile,
            tmpFile,
            (err) => {
                if (err) throw err
                conn.end()

                compareFiles()
            },
        )
    })
})
conn.on("error", (err) => {
    throw err
})
conn.connect(sshOpt)
