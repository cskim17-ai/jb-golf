import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  User as FirebaseUser,
  getAdditionalUserInfo
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../firebase';

export interface UserProfile {
  uid: string;
  socialId: string;
  provider: string;
  email: string;
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  role: 'user' | 'admin';
  createdAt: any;
  lastLogin: any;
  isDeleted: boolean;
}

/**
 * users 컬렉션에 사용자 프로필을 동기화하거나 생성합니다.
 */
export const syncUserProfile = async (user: FirebaseUser, provider: string): Promise<UserProfile> => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // 신규 가입
    const newUser: UserProfile = {
      uid: user.uid,
      socialId: user.providerData[0]?.uid || '',
      provider: provider,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      phoneNumber: user.phoneNumber || '',
      role: 'user', // 기본값
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      isDeleted: false,
    };
    await setDoc(userRef, newUser);
    return { ...newUser, createdAt: new Date(), lastLogin: new Date() };
  } else {
    // 기존 회원 정보 업데이트 (로그인 시간만)
    await updateDoc(userRef, {
      lastLogin: serverTimestamp(),
    });
    return userSnap.data() as UserProfile;
  }
};

/**
 * 구글 로그인
 */
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const profile = await syncUserProfile(result.user, 'google');
    if (profile.isDeleted) {
      await signOut(auth);
      throw new Error('탈퇴한 계정입니다.');
    }
    return profile;
  } catch (error) {
    console.error('Google Login Error:', error);
    throw error;
  }
};

/**
 * 카카오/네이버 로그인은 Firebase Auth에서 기본 제공하지 않으므로, 
 * OIDC나 Custom Token 방식의 백엔드 연동이 필요합니다.
 * 여기서는 구조적 설계만 포함합니다.
 */
export const loginWithExternalProvider = async (providerName: string, accessToken: string) => {
  // 1. 백엔드(server.ts) API를 통해 카카오/나버 토큰 검증 및 Firebase Custom Token 발급
  // 2. signInWithCustomToken(auth, customToken) 실행
  // 3. syncUserProfile 실행
  console.log(`Login attempt with ${providerName}`);
};

/**
 * 로그아웃
 */
export const logout = async () => {
  await signOut(auth);
};

/**
 * 회원 탈퇴 (Soft Delete)
 */
export const withdrawAccount = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  try {
    await updateDoc(userRef, {
      isDeleted: true,
      email: 'deleted_user@masked.com',
      displayName: '탈퇴한 사용자',
      photoURL: '',
      lastLogin: serverTimestamp(), // 탈퇴 기록용
    });
    await signOut(auth);
  } catch (error) {
    console.error('Account Withdrawal Error:', error);
    throw error;
  }
};
