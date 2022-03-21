export interface IAuthState {
    isAuthLoading?: boolean,
    errorMessage: string | null,
    auth?: IAuthResponseData | null,
    googleAuth?: IGoogleResponseData,
    isUserLoggedIn?: boolean;
    confirmationCode?: string;
    verificationSuccess?: boolean;
}

export interface IAuthResponseData{
    result: IAuthResult;
    token?: string;
}
export interface IGoogleResponseData{
    result: IGoogleAuthResponse;
    token?: string;
}

export interface IAuthResult {
    _id?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface ILoginResponseData{
    result: ILoginResult;
    token?: string;
}

export interface ILoginResult{
    email?: string;
    password?: string;
}

export interface IGoogleAuthResponse{
    googleId?: string;
    email?: string;
    familyName?: string;
    givenName?: string;
    imageUrl?: string;
    name?: string;
}

export interface IEditProfileResponse{
  result: IEditProfile,
  token?: string;
}

export interface IEditProfile{
    _id?: string;
    username?: string;
}

export interface IGetUserResponseData{
   result: {username?: string};
}