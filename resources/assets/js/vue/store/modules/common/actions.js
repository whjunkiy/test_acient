import axios from "axios";
import {URL_PREFIX} from "../../../../common/params";

export const actions = {
    async commonSubmit(_, text) {
        const URL = `${URL_PREFIX}/api/common-test`
        try {
            const res = await axios.post(URL, {text})
        } catch (e) {
            console.log(e.message)
            throw new Error(e.response.data?.message || e.message)
        }
    },
}
