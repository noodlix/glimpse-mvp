export async function covergen(coverprompt) {

    const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
    }


    const res = await fetch('https://api.openai.com/v1/images/generations', {
        headers: requestHeaders,
        method: 'POST',
        body: JSON.stringify(coverprompt),
    })
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    const body = await res.json()
    console.log(body)
    return body.data[0].url
}