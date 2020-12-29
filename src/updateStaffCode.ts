import {Maybe, saveLog} from "@sagittal/general"
import cp from "child_process"
import * as fs from "fs"
import {SFTPWrapper} from "ssh2"
import {compareFiles} from "./compare"
import {LOCAL_FILE, REMOTE_FILE, TMP_FILE, TMP_VERSION_FILE} from "./constants"
import {ssh2} from "./globals"

const updateStaffCode = (forceUpdate: boolean): void => {
    ssh2.conn.sftp((err: Maybe<Error>, sftp: SFTPWrapper): void => {
        if (err) throw err

        sftp.fastGet(
            REMOTE_FILE,
            TMP_FILE,
            (err: Maybe<Error>): void => {
                if (err) throw err

                compareFiles(forceUpdate)

                cp.execSync("sh bin/update_staff_code.sh")

                sftp.fastPut(
                    LOCAL_FILE,
                    REMOTE_FILE,
                    (err: Maybe<Error>): void => {
                        if (err) throw err
                        ssh2.conn.end()

                        saveLog(`\n\nThe Sagittal Forum has had its staffCode.js updated to version ${fs.readFileSync(TMP_VERSION_FILE)}.\n\n`)
                    },
                )
            },
        )
    })
}

export {
    updateStaffCode,
}
