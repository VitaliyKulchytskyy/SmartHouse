export default function errorMessageWrapper(err) {
    if (err.name === "AxiosError" && err.code == "ERR_NETWORK")
        return err.message
    return err.response.data.message
}