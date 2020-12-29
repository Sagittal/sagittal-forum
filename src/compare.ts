import {saveLog} from "@sagittal/general"
import fs from "fs"

const compareFiles = (forceUpdate: boolean): void => {
    const tmpCopiedFromRemote = fs.readFileSync("/tmp/staffCode.js")
    const previouslyCompiled = fs.readFileSync("dist/staffCode.js")

    if (tmpCopiedFromRemote !== previouslyCompiled) {
        if (forceUpdate) {
            saveLog("The Sagittal Forum's staffCode.js file has diverged from the most recent previously compiled version. But the --force flag has been provided, so we're overwriting it, whatever it is!")
        } else {
            throw new Error("The Sagittal Forum's staffCode.js file has diverged from the most recent previously compiled version. Please review /tmp/staffCode.js, a just-nabbed local backup of the Forum's current version, before proceeding.")
        }
    } else {
        saveLog("\n\nThe Sagittal Forum's staffCode.js file matches the most recent previously compiled version. We are go for launch.\n\n")
    }
}

export {
    compareFiles,
}
