import { getIdTokenResult, User } from 'firebase/auth';

export async function isUserPremium(currentUser: User): Promise<boolean> {
  const decodedToken = await getIdTokenResult(currentUser);
  //console.log(decodedToken);
  return decodedToken.claims.stripeRole ? true : false;
}
