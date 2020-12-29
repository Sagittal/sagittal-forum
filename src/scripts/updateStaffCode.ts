// TODO: this should be moved into being a proper script
//  Then use the newly added force-deploy script flag to avoid failing when not matching the remote forum staffCode.js
//  Also I think it throws an error if you don't update the forum after every single time you recompile it

import {program} from "@sagittal/general"

program
    .option(`--force`, "force update, even if remote doesn't agree with existing dist")
