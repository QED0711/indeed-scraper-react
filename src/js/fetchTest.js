
const sendFetch = async (url) => {
    const res = await fetch(url, {credentials: 'include'});
    console.log(res)
}

export default sendFetch;