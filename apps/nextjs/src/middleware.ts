import { NextResponse, type NextRequest } from "next/server";
import { withClerkMiddleware } from "@clerk/nextjs/server";

export default withClerkMiddleware((_req: NextRequest) => {
  return NextResponse.next();
});

// stop middleware from running on static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
  ],
};
