import cp from "child_process"
import {Client} from "ssh2"
// @ts-ignore
import secrets from "../../.secrets.json"
import {ssh2} from "../globals"
import {updateStaffCode} from "../updateStaffCode"

const SSH_OPT = {...secrets, port: 22, host: "103.1.186.221"}
cp.execSync("sh bin/update_staff_code.sh")

const conn: Client = new Client()
ssh2.conn = conn

conn.on("ready", updateStaffCode)
conn.on("error", (err: Error): void => {
    throw err
})
conn.connect(SSH_OPT)
