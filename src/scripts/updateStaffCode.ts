import {program} from "@sagittal/general"
import {Client} from "ssh2"
// @ts-ignore
import secrets from "../../.secrets.json"
import {ssh2} from "../globals"
import {updateStaffCode} from "../updateStaffCode"

program
    .option(`--force`, "force update, even if remote doesn't agree with existing dist")
    .parse()

const forceUpdate = !!program.force

const SSH_OPT = {...secrets, port: 26, host: "dkeenan.com"}

const conn: Client = new Client()
ssh2.conn = conn

conn.on("ready", (): void => updateStaffCode(forceUpdate))
conn.on("error", (err: Error): void => {
    throw err
})
conn.connect(SSH_OPT)
