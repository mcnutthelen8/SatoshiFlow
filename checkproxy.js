export async function handler(event, context) {
  const ip = event.queryStringParameters.ip || '';
  const response = await fetch(`https://proxycheck.io/v2/${ip}?vpn=1&asn=1`);
  const data = await response.text();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: data
  };
}
