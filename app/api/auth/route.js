import { AuthorizationCode } from 'simple-oauth2';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
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

  const authorizationUri = client.authorizeURL({
    redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/callback`,
    scope: 'repo,user',
    state: 'random-state-string', // In production, generate a random string and verify it
  });

  return NextResponse.redirect(authorizationUri);
}
