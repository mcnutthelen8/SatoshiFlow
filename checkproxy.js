import fetch from 'node-fetch'; // only needed if using Node 18 or lower

export async function handler(event) {
  const ip = event.queryStringParameters.ip || event.headers['x-forwarded-for'] || '8.8.8.8';

  const url = `https://proxycheck.io/v2/${ip}?key=434489-84608j-v97020-20y548&vpn=1&asn=1`;

  try {
    const proxyRes = await fetch(url);
    const data = await proxyRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // allow CORS if needed
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API request failed', details: error.message }),
    };
  }
}
