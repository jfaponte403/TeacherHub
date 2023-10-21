export interface updatePasswordData {
    studentId: string;
    newPassword: string;
    verificationCode: string;
}

export interface getVerificationCodeData {
    studentId: string;
}

export interface loginData {
    email: string;
    password: string;
}

export interface registerData {
    id: string;
    nickname: string;
    email: string;
    password: string;
}

export interface verifyUserEmailData {
    studentId: string;
    verificationCode: string;
}