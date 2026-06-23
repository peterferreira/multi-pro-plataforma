import { AuthorizationCode } from 'simple-oauth2';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  if (!code) {
    return new Response('Code not found', { status: 400 });
  }

  const client = new AuthorizationCode({
    client: {
      id: process.env.OAUTH_GITHUB_CLIENT_ID,
      secret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
    },
    auth: {
      tokenHost: 'https://github.com',
      tokenPath: '/login/oauth/access_token',
      authorizePath: '/login/oauth/authorize',
    },
  });

  try {
    const accessToken = await client.getToken({
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/callback`,
    });

    const token = accessToken.token.access_token;

    // This script communicates back to the popup opener (Decap CMS)
    const script = `
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage %o", e)
            window.opener.postMessage(
              'authorization:github:success:{"token":"${token}","provider":"github"}',
              e.origin
            )
          }
          window.addEventListener("message", receiveMessage, false)
          window.opener.postMessage("authorizing:github", "*")
        })()
      </script>
    `;

    return new Response(script, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Access Token Error', error.message);
    return new Response(`Authentication failed: ${error.message}`, { status: 500 });
  }
}
