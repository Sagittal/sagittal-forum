const {Client} = require("ssh2")
const secrets = require("../.secrets.json")

const sshOpt = {...secrets, port: 26, host: "dkeenan.com"}
const remoteFile = "public_html/sagittal/forum/assets/javascript/staffCode.js"
const localFile = "./dist/staffCode.js"

const conn = new Client()
conn.on("ready", () => {
    conn.sftp((err, sftp) => {
        if (err) throw err

        sftp.fastPut(
            localFile,
            remoteFile,
            (err) => {
                if (err) throw err
                conn.end()

                // TODO: it might be cool if you get this to announce which version of staff code it got updated to
                console.warn("\n\nThe Sagittal Forum has had its staffCode.js updated!\n\n")
            },
        )
    })
})
conn.on("error", (err) => {
    throw err
})
conn.connect(sshOpt)
