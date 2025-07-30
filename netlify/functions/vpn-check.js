export async function handler(event) {
  const ip = event.queryStringParameters.ip || '8.8.8.8'; // fallback IP

  const url = `https://proxycheck.io/v2/${ip}?key=434489-84608j-v97020-20y548&vpn=1&asn=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
