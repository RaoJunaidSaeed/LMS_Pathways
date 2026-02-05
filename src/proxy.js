import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/', '/courses', '/sign-in', '/sign-up']);

const isOnboardingRoute = createRouteMatcher(['/onboarding']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // 1. Handle Unauthenticated Users trying to access private pages
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // 2. Handle Authenticated Users
  if (userId) {
    const { role } = sessionClaims?.metadata || {};
    const url = req.nextUrl;

    // If user has NO ROLE and is NOT on onboarding, force them to onboarding
    if (!role && !isOnboardingRoute(req)) {
      const onboardingUrl = new URL('/onboarding', req.url);
      return NextResponse.redirect(onboardingUrl);
    }

    // If user HAS ROLE and tries to go to onboarding, force them to dashboard
    if (role && isOnboardingRoute(req)) {
      const targetPath = role === 'student' ? '/student' : '/teacher';
      const dashboardUrl = new URL(targetPath, req.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // Prevent students from accessing teacher routes and vice versa
    if (role === 'student' && url.pathname.startsWith('/teacher')) {
      return NextResponse.redirect(new URL('/student', req.url));
    }
    if (role === 'teacher' && url.pathname.startsWith('/student')) {
      return NextResponse.redirect(new URL('/teacher', req.url));
    }
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
