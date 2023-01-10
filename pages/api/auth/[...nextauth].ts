import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "74420948839-edmcuo0f5mshsq6i3j8a9217r6ufdnc4.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});
