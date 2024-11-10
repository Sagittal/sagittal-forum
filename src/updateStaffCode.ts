import * as fs from "fs"
import { Maybe, saveLog, stringify } from "@sagittal/general"
import { SFTPWrapper } from "ssh2"
import { LOCAL_FILE, REMOTE_FILE, TMP_VERSION_FILE } from "./constants"
import { ssh2 } from "./globals"

const updateStaffCode = (): void => {
    ssh2.conn.sftp((err: Maybe<Error>, sftp: SFTPWrapper): void => {
        if (err) throw err

        sftp.fastPut(LOCAL_FILE, REMOTE_FILE, (err: Maybe<Error> | null): void => {
            if (err) throw err
            ssh2.conn.end()

            saveLog(
                `\n\nThe Sagittal Forum has had its staffCode.js updated to version ${stringify(fs.readFileSync(TMP_VERSION_FILE))}.\n\n`,
            )
        })
    })
}

export { updateStaffCode }
