// loginhash model interface

export interface LoginHashDTO {
    ip?: string;
    hash?: string;
    mismatch_message?: string;
    user_id: number;
}